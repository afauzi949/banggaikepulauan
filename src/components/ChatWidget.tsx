"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "bot";

interface Message {
  id: string;
  role: Role;
  text: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Generate a simple unique ID for message keys.
 * Using crypto.randomUUID() which is available in modern browsers and Node.js.
 */
function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow">
        <BotIcon className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white/90 border border-teal-100 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-1.5" aria-label="Sedang mengetik">
          <span className="block w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0ms]" />
          <span className="block w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:150ms]" />
          <span className="block w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 mb-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow">
          <BotIcon className="w-4 h-4 text-white" />
        </div>
      )}
      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-br-sm"
            : "bg-white/90 border border-teal-100 text-slate-700 rounded-bl-sm"
        }`}
      >
        {/* Text rendered as plain text via React JSX (XSS-safe) */}
        {message.text}
      </div>
    </motion.div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h2a7 7 0 0 1 7 7v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1a7 7 0 0 1 7-7h2V5.72A2 2 0 0 1 10 4a2 2 0 0 1 2-2zm-3 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3 5a4 4 0 0 1-3-1.35A4 4 0 0 0 12 21a4 4 0 0 0 3-1.35A4 4 0 0 1 12 16z" />
    </svg>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "bot",
      text: "Halo! Saya Asisten Wisata Bangkep 👋 Ada yang ingin kamu ketahui tentang wisata di Banggai Kepulauan?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Session ID — generated once on mount, persists for the lifetime of the page.
  // Using a ref so it is stable across re-renders and not exposed to the client DOM.
  const sessionIdRef = useRef<string>(uid());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    // Enforce client-side message length (mirrors server-side validation)
    if (text.length > 2000) return;

    const userMessage: Message = { id: uid(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionIdRef.current }),
      });

      const data: unknown = await res.json();

      // Extract the reply text from the response JSON.
      // n8n typically returns { output: "..." } or { reply: "..." } or { text: "..." }
      let replyText = "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
      if (
        typeof data === "object" &&
        data !== null
      ) {
        const d = data as Record<string, unknown>;
        if (typeof d.output === "string" && d.output.trim()) {
          replyText = d.output.trim();
        } else if (typeof d.reply === "string" && d.reply.trim()) {
          replyText = d.reply.trim();
        } else if (typeof d.text === "string" && d.text.trim()) {
          replyText = d.text.trim();
        } else if (typeof d.message === "string" && d.message.trim()) {
          replyText = d.message.trim();
        } else if (typeof d.error === "string") {
          // Show a user-friendly error, not the raw server error
          replyText = "Terjadi kesalahan. Silakan coba lagi.";
          // Log the actual error for debugging (no sensitive data)
          console.error("[ChatWidget] API error:", d.error);
        }
      }

      const botMessage: Message = { id: uid(), role: "bot", text: replyText };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Network error
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "bot",
          text: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  // Allow sending with Enter (Shift+Enter = new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── FAB ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            id="chat-widget-fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            onClick={() => setIsOpen(true)}
            aria-label="Buka asisten wisata"
            className="fixed bottom-20 right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-700 text-white shadow-xl shadow-teal-500/40 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
          >
            <ChatIcon className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-teal-400 opacity-25 pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            id="chat-widget-window"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed bottom-20 right-6 z-[60] w-[calc(100vw-3rem)] max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-teal-900/30 border border-teal-200/30"
            style={{ height: "clamp(420px, 60vh, 580px)" }}
            role="dialog"
            aria-label="Asisten Wisata Bangkep"
            aria-modal="false"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                <BotIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">
                  Asisten Wisata Bangkep
                </p>
                <p className="text-teal-100 text-xs flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </p>
              </div>
              <button
                id="chat-widget-close"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup chat"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <CloseIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Decorative ocean wave divider */}
            <div className="flex-shrink-0 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 -mb-px">
              <svg viewBox="0 0 400 12" className="w-full" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M0,6 C100,12 200,0 300,6 C350,9 380,3 400,6 L400,12 L0,12 Z"
                  fill="rgb(240 253 250)"
                />
              </svg>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 bg-teal-50/60 backdrop-blur-sm scroll-smooth"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 80%, rgba(20,184,166,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.07) 0%, transparent 60%)",
              }}
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 flex items-end gap-2 px-3 py-3 bg-white border-t border-teal-100">
              <textarea
                ref={inputRef}
                id="chat-widget-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={isLoading ? "Mengetik..." : "Tanya tentang wisata Bangkep…"}
                rows={1}
                maxLength={2000}
                aria-label="Ketik pesan"
                className="flex-1 resize-none rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed max-h-24 overflow-y-auto leading-relaxed"
                style={{ scrollbarWidth: "thin" }}
              />
              <button
                id="chat-widget-send"
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                aria-label="Kirim pesan"
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center shadow transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
