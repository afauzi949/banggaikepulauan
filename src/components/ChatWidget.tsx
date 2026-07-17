"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "bot";

interface Message {
  id: string;
  role: Role;
  text: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <Image 
        src="/brand/logo-bangkep.svg" 
        alt="Bot" 
        width={32}
        height={32}
        className="flex-shrink-0 w-8 h-8 rounded-full object-cover border border-gray-200 bg-white" 
      />
      <div className="bg-white border border-gray-200 border-l-4 border-l-blue-900 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5" aria-label="Sedang mengetik">
          <span className="block w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
          <span className="block w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
          <span className="block w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
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
      className={`flex items-end gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isUser ? (
        <Image 
          src="/brand/logo-bangkep.svg" 
          alt="Bot" 
          width={32}
          height={32}
          className="flex-shrink-0 w-8 h-8 rounded-full object-cover border border-gray-200 bg-white" 
        />
      ) : (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-gray-300">
          <UserIcon className="w-5 h-5 text-slate-500" />
        </div>
      )}
      {/* Bubble */}
      <div
        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "max-w-[75%] bg-white border border-gray-200 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] text-slate-800 rounded-br-sm"
            : "max-w-[90%] overflow-hidden bg-white border border-gray-200 border-l-4 border-l-blue-900 shadow-sm text-slate-800 rounded-bl-sm"
        }`}
      >
        {isUser ? (
          message.text
        ) : (
          <ReactMarkdown
            components={{
              /* eslint-disable @typescript-eslint/no-unused-vars */
              p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
              ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 mb-2 last:mb-0" />,
              ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 mb-2 last:mb-0" />,
              li: ({ node, ...props }) => <li {...props} className="mb-1" />,
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" />
              ),
              strong: ({ node, ...props }) => <strong {...props} className="font-semibold" />,
              h1: ({ node, ...props }) => <h1 {...props} className="text-lg font-bold mb-2 mt-3 first:mt-0" />,
              h2: ({ node, ...props }) => <h2 {...props} className="text-base font-bold mb-2 mt-3 first:mt-0" />,
              h3: ({ node, ...props }) => <h3 {...props} className="text-sm font-bold mb-2 mt-3 first:mt-0" />,
              /* eslint-enable @typescript-eslint/no-unused-vars */
            }}
          >
            {message.text}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function ShrinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 14 14 4" />
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "bot",
      text: "Halo! Saya Asisten Wisata Bangkep 👋 Ada yang ingin kamu ketahui tentang wisata di Banggai Kepulauan?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Session ID
  const sessionIdRef = useRef<string>(uid());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
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

      let replyText = "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
      if (typeof data === "object" && data !== null) {
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
          replyText = "Terjadi kesalahan. Silakan coba lagi.";
          console.error("[ChatWidget] API error:", d.error);
        }
      }

      const botMessage: Message = { id: uid(), role: "bot", text: replyText };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
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
            className="fixed bottom-20 right-6 z-[60] h-14 px-5 rounded-full bg-white text-slate-800 shadow-xl shadow-slate-300 flex items-center justify-center gap-2.5 border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
          >
            <Image src="/brand/logo-bangkep.svg" alt="Bangkep Logo" width={32} height={32} className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg tracking-wide text-blue-900">AI</span>
            <span className="absolute inset-0 rounded-full animate-ping bg-slate-300 opacity-25 pointer-events-none" />
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
            className={`fixed bottom-20 right-6 z-[60] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-gray-200 bg-slate-50 transition-[width,max-width,height] duration-300 ease-in-out ${
              isExpanded 
                ? "w-[calc(100vw-3rem)] max-w-2xl h-[clamp(500px,80vh,800px)]" 
                : "w-[calc(100vw-3rem)] max-w-sm h-[clamp(420px,60vh,580px)]"
            }`}
            role="dialog"
            aria-label="Asisten Wisata Bangkep"
            aria-modal="false"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-200 flex-shrink-0">
              <Image 
                src="/brand/logo-bangkep.svg" 
                alt="Bot" 
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-gray-100" 
              />
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-bold text-sm leading-tight truncate">
                  Asisten Wisata Bangkep
                </p>
                <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  Online
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  id="chat-widget-expand"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? "Perkecil chat" : "Perbesar chat"}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  {isExpanded ? <ShrinkIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
                </button>
                <button
                  id="chat-widget-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup chat"
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-5 scroll-smooth bg-slate-50"
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
            <div className="flex-shrink-0 px-4 py-4 bg-slate-50">
              <div className="flex items-end gap-2 px-3 py-2 bg-white rounded-xl border border-gray-800 shadow-[2px_2px_0px_rgba(0,0,0,1)] focus-within:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-shadow duration-200">
                <textarea
                  ref={inputRef}
                  id="chat-widget-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder={isLoading ? "Mengetik..." : "Type a new message here"}
                  rows={1}
                  maxLength={2000}
                  aria-label="Ketik pesan"
                  className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-h-24 overflow-y-auto leading-relaxed"
                  style={{ scrollbarWidth: "thin" }}
                />
                <div className="flex items-center gap-1.5 pb-1">
                  <button
                    id="chat-widget-send"
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    aria-label="Kirim pesan"
                    className="p-1.5 text-slate-800 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <SendIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
