import { NextRequest, NextResponse } from "next/server";

// TODO(security): Rate limiting is not implemented here.
// Consider adding a rate-limiter (e.g., upstash/ratelimit) to prevent
// abuse of the n8n webhook endpoint.

// Streamed answers can outlast the default serverless timeout.
export const maxDuration = 60;

interface N8nStreamEvent {
  type?: string;
  content?: unknown;
  output?: unknown;
}

/**
 * Converts the n8n streaming response (one JSON event per line, e.g.
 * `{"type":"item","content":"Halo"}`) into a plain text stream.
 *
 * Falls back to the `output` field when n8n replies with a single
 * non-streaming JSON object, so the endpoint also works with streaming off.
 */
function toTextStream(source: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = source.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  let emitted = false;

  const handleLine = (line: string, controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (!line.trim()) return;
    let event: N8nStreamEvent;
    try {
      event = JSON.parse(line) as N8nStreamEvent;
    } catch {
      return;
    }
    let text: string | undefined;
    if (event.type === "item" && typeof event.content === "string") {
      text = event.content;
    } else if (!event.type && typeof event.output === "string") {
      text = event.output;
    }
    if (text) {
      emitted = true;
      controller.enqueue(encoder.encode(text));
    }
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        // Keep reading until some text is enqueued: n8n starts with events that
        // carry no text, and a pull() that enqueues nothing is not called again.
        while (controller.desiredSize !== null && controller.desiredSize > 0) {
          const { done, value } = await reader.read();
          if (done) {
            buffer += decoder.decode();
            handleLine(buffer, controller);
            if (!emitted) {
              console.error("[api/chat] n8n stream ended without any content.");
            }
            controller.close();
            return;
          }
          buffer += decoder.decode(value, { stream: true });
          let newline: number;
          while ((newline = buffer.indexOf("\n")) >= 0) {
            handleLine(buffer.slice(0, newline), controller);
            buffer = buffer.slice(newline + 1);
          }
        }
      } catch (err) {
        controller.error(err);
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
}

/**
 * POST /api/chat
 *
 * Secure BFF (Backend-for-Frontend) proxy that forwards chat messages
 * to the n8n RAG webhook and streams the answer back as plain text.
 * The N8N_WEBHOOK_URL is kept server-side only and is never exposed
 * to the client.
 */
export async function POST(req: NextRequest) {
  // --- Input Validation ---
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON in request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("message" in body) ||
    typeof (body as Record<string, unknown>).message !== "string"
  ) {
    return NextResponse.json({ error: "Missing or invalid 'message' field." }, { status: 400 });
  }

  const d = body as Record<string, unknown>;
  const message = (d.message as string).trim();

  // sessionId is optional but, if provided, must be a non-empty string
  // of reasonable length to prevent abuse.
  let sessionId: string | undefined;
  if ("sessionId" in d) {
    if (typeof d.sessionId !== "string" || d.sessionId.trim().length === 0) {
      return NextResponse.json({ error: "Invalid 'sessionId' field." }, { status: 400 });
    }
    // Clamp to 128 chars to prevent oversized payloads being forwarded
    sessionId = d.sessionId.trim().slice(0, 128);
  }

  if (message.length === 0) {
    return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  // Enforce a reasonable maximum message length to prevent abuse.
  if (message.length > 2000) {
    return NextResponse.json(
      { error: "Message is too long. Maximum 2000 characters." },
      { status: 400 },
    );
  }

  // --- Retrieve the n8n Webhook URL (server-side only) ---
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    // Log internally but return a generic error to the client.
    console.error("[api/chat] N8N_WEBHOOK_URL environment variable is not set.");
    return NextResponse.json(
      { error: "Chat service is not configured. Please try again later." },
      { status: 503 },
    );
  }

  // --- Forward to n8n ---
  try {
    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, ...(sessionId ? { sessionId } : {}) }),
      // Stop the upstream request when the client disconnects.
      signal: req.signal,
    });

    if (!n8nResponse.ok || !n8nResponse.body) {
      console.error(`[api/chat] n8n responded with status: ${n8nResponse.status}`);
      return NextResponse.json(
        { error: "The chat backend returned an error. Please try again." },
        { status: 502 },
      );
    }

    // Relay the answer to the client as it is generated (plain text stream).
    return new Response(toTextStream(n8nResponse.body), {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        // Prevent caching and proxy buffering so chunks arrive immediately.
        "Cache-Control": "no-store, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    // Network error — n8n is unreachable.
    console.error("[api/chat] Failed to reach n8n webhook:", err);
    return NextResponse.json(
      {
        error: "Could not connect to the chat service. Please check your connection and try again.",
      },
      { status: 503 },
    );
  }
}

// Only allow POST; return 405 for anything else.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
