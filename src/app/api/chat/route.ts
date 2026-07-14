import { NextRequest, NextResponse } from "next/server";

// TODO(security): Rate limiting is not implemented here.
// Consider adding a rate-limiter (e.g., upstash/ratelimit) to prevent
// abuse of the n8n webhook endpoint.

/**
 * POST /api/chat
 *
 * Secure BFF (Backend-for-Frontend) proxy that forwards chat messages
 * to the n8n RAG webhook. The N8N_WEBHOOK_URL is kept server-side only
 * and is never exposed to the client.
 */
export async function POST(req: NextRequest) {
  // --- Input Validation ---
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("message" in body) ||
    typeof (body as Record<string, unknown>).message !== "string"
  ) {
    return NextResponse.json(
      { error: "Missing or invalid 'message' field." },
      { status: 400 }
    );
  }

  const message = ((body as Record<string, unknown>).message as string).trim();

  if (message.length === 0) {
    return NextResponse.json(
      { error: "Message cannot be empty." },
      { status: 400 }
    );
  }

  // Enforce a reasonable maximum message length to prevent abuse.
  if (message.length > 2000) {
    return NextResponse.json(
      { error: "Message is too long. Maximum 2000 characters." },
      { status: 400 }
    );
  }

  // --- Retrieve the n8n Webhook URL (server-side only) ---
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    // Log internally but return a generic error to the client.
    console.error("[api/chat] N8N_WEBHOOK_URL environment variable is not set.");
    return NextResponse.json(
      { error: "Chat service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  // --- Forward to n8n ---
  try {
    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!n8nResponse.ok) {
      console.error(
        `[api/chat] n8n responded with status: ${n8nResponse.status}`
      );
      return NextResponse.json(
        { error: "The chat backend returned an error. Please try again." },
        { status: 502 }
      );
    }

    const data = await n8nResponse.json();

    // Return the n8n response to the client with security headers.
    return NextResponse.json(data, {
      status: 200,
      headers: {
        // Prevent this API response from being cached.
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    // Network error — n8n is unreachable.
    console.error("[api/chat] Failed to reach n8n webhook:", err);
    return NextResponse.json(
      {
        error:
          "Could not connect to the chat service. Please check your connection and try again.",
      },
      { status: 503 }
    );
  }
}

// Only allow POST; return 405 for anything else.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
