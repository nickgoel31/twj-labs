"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import {
    Send, X, Check, ChevronRight, Sparkles, Bot, User,
    Loader2, ArrowUp, GripHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage, groqChatAction, UIComponent } from "@/actions/groq-chat";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
};

// ─────────────────────────────────────────────
// Orb: the idle pulsing button
// ─────────────────────────────────────────────
const Orb = ({ onClick }: { onClick: () => void }) => {
    return (
        <motion.button
            onClick={onClick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex items-center justify-center"
            aria-label="Open AI Chat"
        >
            <motion.span
                className="absolute inset-0 rounded-full bg-violet-500/20"
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
                className="absolute inset-0 rounded-full bg-indigo-500/15"
                animate={{ scale: [1, 2.0, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                <Sparkles className="w-6 h-6 text-white fill-white/40" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
        </motion.button>
    );
};

// ─────────────────────────────────────────────
// ExpandedInput
// ─────────────────────────────────────────────
const ExpandedInput = ({
    onSubmit,
    onClose,
}: {
    onSubmit: (text: string) => void;
    onClose: () => void;
}) => {
    const [val, setVal] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 200);
    }, []);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && val.trim()) { onSubmit(val); setVal(""); }
        if (e.key === "Escape") onClose();
    };

    return (
        <motion.div
            initial={{ width: 56, borderRadius: 9999, opacity: 0 }}
            animate={{ width: "min(580px, 90vw)", borderRadius: 24, opacity: 1 }}
            exit={{ width: 56, borderRadius: 9999, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="relative flex items-center bg-[#0d0d18]/95 backdrop-blur-2xl border border-white/10 shadow-[0_8px_60px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ height: 56 }}
        >
            <div className="flex-shrink-0 ml-4 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_14px_rgba(124,58,237,0.4)]">
                <Sparkles className="w-4 h-4 text-white fill-white/30" />
            </div>
            <input
                ref={inputRef}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask JumboBot anything…"
                className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <div className="flex items-center gap-1 mr-2">
                <AnimatePresence>
                    {val.trim() && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => { onSubmit(val); setVal(""); }}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.4)] hover:brightness-110 transition"
                        >
                            <ArrowUp className="w-4 h-4 text-white" />
                        </motion.button>
                    )}
                </AnimatePresence>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────
// ServiceSelector
// ─────────────────────────────────────────────
const ServiceSelector = ({
    services,
    onConfirm,
    onCancel,
}: {
    services: string[];
    onConfirm: (s: string[]) => void;
    onCancel: () => void;
}) => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (s: string) =>
        setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 z-50 bg-[#08080f]/95 backdrop-blur-md flex flex-col p-5"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold text-sm tracking-wide">Choose Services</h3>
                <button onClick={onCancel} className="text-slate-500 hover:text-white transition">
                    <X size={18} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-hide">
                {services.map((s) => (
                    <button
                        key={s}
                        onClick={() => toggle(s)}
                        className={cn(
                            "w-full text-left px-3 py-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all duration-150",
                            selected.includes(s)
                                ? "bg-violet-600/30 border-violet-500/60 text-white"
                                : "bg-white/4 border-white/8 text-slate-400 hover:bg-white/8 hover:text-slate-200"
                        )}
                    >
                        <span>{s}</span>
                        {selected.includes(s) && <Check size={14} className="text-violet-400 flex-shrink-0" />}
                    </button>
                ))}
            </div>
            <div className="pt-3 mt-auto">
                <button
                    disabled={selected.length === 0}
                    onClick={() => onConfirm(selected)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition shadow-[0_4px_20px_rgba(124,58,237,0.3)]"
                >
                    Confirm Selection <ChevronRight size={15} />
                </button>
            </div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────
// SuccessView
// ─────────────────────────────────────────────
const SuccessView = ({ onClose }: { onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="absolute inset-0 z-50 bg-[#08080f]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1, stiffness: 260, damping: 18 }}
            className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
        >
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Check size={22} className="text-black stroke-[3]" />
            </div>
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">You're all set!</h3>
        <p className="text-slate-400 text-sm mb-7 max-w-[220px] leading-relaxed">
            We've got your details and will reach out shortly.
        </p>
        <button
            onClick={onClose}
            className="px-7 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-slate-200 transition"
        >
            New Conversation
        </button>
    </motion.div>
);

// ─────────────────────────────────────────────
// ChatPanel — draggable
// ─────────────────────────────────────────────
const ChatPanel = ({
    messages,
    isTyping,
    inputDisabled,
    inputLocked,
    activeUI,
    onSend,
    onClose,
    onServiceConfirm,
    onServiceCancel,
    onSuccessClose,
}: {
    messages: Message[];
    isTyping: boolean;
    inputDisabled: boolean;
    inputLocked: boolean;
    activeUI: UIComponent;
    onSend: (text: string) => void;
    onClose: () => void;
    onServiceConfirm: (s: string[]) => void;
    onServiceCancel: () => void;
    onSuccessClose: () => void;
}) => {
    const [val, setVal] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && val.trim() && !inputDisabled) {
            e.preventDefault();
            onSend(val);
            setVal("");
        }
    };

    const quickChips = ["What services do you offer?", "Show pricing", "Start a project"];

    return (
        <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}          // only drag from the handle
            dragMomentum={false}
            dragElastic={0}
            dragTransition={{ power: 0 }}
            // Constrain so panel can't be dragged fully off-screen
            dragConstraints={{
                top: -window.innerHeight + 120,
                left: -window.innerWidth + 100,
                right: window.innerWidth - 100,
                bottom: window.innerHeight - 120,
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ x: 0, y: 0 }}
            className={cn(
                "fixed z-[9998] flex flex-col overflow-hidden",
                // Default position: bottom-right floating panel
                "bottom-28 right-10",
                "w-[520px] h-[560px] rounded-2xl",
                "bg-[#08080f]/80 backdrop-blur-2xl border border-white/8",
                "shadow-[0_24px_80px_rgba(0,0,0,0.8)]",
                isDragging && "shadow-[0_32px_100px_rgba(124,58,237,0.25)] border-violet-500/20 cursor-grabbing"
            )}
        >
            {/* Top gradient wash */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-violet-950/30 to-transparent z-0" />

            {/* Overlay UIs */}
            <AnimatePresence>
                {activeUI?.type === "serviceSelector" && (
                    <ServiceSelector
                        services={(activeUI as any).data}
                        onConfirm={onServiceConfirm}
                        onCancel={onServiceCancel}
                    />
                )}
                {activeUI?.type === "leadConfirmation" && (
                    <SuccessView onClose={onSuccessClose} />
                )}
            </AnimatePresence>

            {/* ── Drag handle header ── */}
            <div
                onPointerDown={(e) => {
                    // Don't hijack clicks on the close button
                    if ((e.target as HTMLElement).closest("button")) return;
                    dragControls.start(e);
                }}
                className={cn(
                    "relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/6 select-none",
                    "cursor-grab active:cursor-grabbing"
                )}
            >
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.4)]">
                        <Sparkles className="w-4 h-4 text-white fill-white/30" />
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold leading-none">JumboBot</p>
                        <p className="text-[10px] text-violet-400 mt-0.5">Powered by Groq</p>
                    </div>
                </div>

                {/* Centre grip indicator */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-[3px] opacity-25 hover:opacity-60 transition-opacity pointer-events-none">
                    <GripHorizontal size={16} className="text-slate-400" />
                </div>

                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/6 transition"
                >
                    <X size={17} />
                </button>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
                <div className="sticky top-0 h-6 bg-gradient-to-b from-[#08080f]/60 to-transparent pointer-events-none -mt-4 mb-2" />

                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex gap-2.5 max-w-[88%]",
                            msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        )}
                    >
                        <div
                            className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                                msg.sender === "user"
                                    ? "bg-slate-700/80"
                                    : "bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/20"
                            )}
                        >
                            {msg.sender === "user"
                                ? <User size={13} className="text-slate-300" />
                                : <Bot size={13} className="text-violet-400" />}
                        </div>
                        <div
                            className={cn(
                                "px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed",
                                msg.sender === "user"
                                    ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-tr-sm shadow-[0_4px_20px_rgba(124,58,237,0.25)]"
                                    : "bg-white/6 border border-white/8 text-slate-200 rounded-tl-sm"
                            )}
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                                    ul: ({ children }) => <ul className="list-disc ml-4 space-y-0.5 my-1">{children}</ul>,
                                    li: ({ children }) => <li className="pl-0.5">{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                    a: ({ children, href }) => (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:underline">
                                            {children}
                                        </a>
                                    ),
                                }}
                            >
                                {msg.text}
                            </ReactMarkdown>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <div className="flex gap-2.5 max-w-[88%] mr-auto">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Loader2 size={13} className="text-violet-400 animate-spin" />
                        </div>
                        <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm bg-white/6 border border-white/8 flex gap-1 items-center">
                            {[0, 0.15, 0.3].map((d, i) => (
                                <motion.span
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-violet-400"
                                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                                    transition={{ duration: 0.9, repeat: Infinity, delay: d }}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick chips */}
            {messages.length < 3 && !activeUI && (
                <div className="relative z-10 px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                    {quickChips.map((chip) => (
                        <button
                            key={chip}
                            onClick={() => onSend(chip)}
                            className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-600/10 text-violet-300 hover:bg-violet-600/20 hover:border-violet-500/60 transition"
                        >
                            {chip}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="relative z-10 px-3 pb-3 pt-2 border-t border-white/6">
                <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-[#08080f]/80 to-transparent pointer-events-none" />
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 focus-within:border-violet-500/40 transition">
                    <input
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        onKeyDown={handleKey}
                        disabled={inputDisabled || inputLocked}
                        placeholder={inputLocked ? "Please complete the selection above…" : "Message JumboBot…"}
                        className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none disabled:opacity-50"
                    />
                    <button
                        onClick={() => { onSend(val); setVal(""); }}
                        disabled={!val.trim() || inputDisabled || inputLocked}
                        className="w-7 h-7 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition"
                    >
                        <Send size={13} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────
// AIChatWidget — main export
// ─────────────────────────────────────────────
const INITIAL_MESSAGES: Message[] = [
    {
        id: "init-1",
        text: "Hey there! 👋 I'm **JumboBot**, your AI guide to The Walking Jumbo.\n\nI can help you explore **services**, check **pricing**, or walk you through starting a **new project**.\n\nWhat can I do for you?",
        sender: "bot",
        timestamp: new Date(),
    },
];

type Stage = "orb" | "input" | "chat";

export default function AIChatWidget() {
    const [stage, setStage] = useState<Stage>("orb");
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [isTyping, setIsTyping] = useState(false);
    const [activeUI, setActiveUI] = useState<UIComponent>(null);
    const [history, setHistory] = useState<ChatMessage[]>([]);

    const sendMessage = useCallback(
        async (text: string) => {
            if (!text.trim()) return;
            setStage("chat");
            const userMsg: Message = { id: Date.now().toString(), text, sender: "user", timestamp: new Date() };
            setMessages((p) => [...p, userMsg]);
            setIsTyping(true);
            const newHistory: ChatMessage[] = [...history, { role: "user", content: text }];
            try {
                const res = await groqChatAction(history, text);
                const botMsg: Message = { id: (Date.now() + 1).toString(), text: res.message, sender: "bot", timestamp: new Date() };
                setMessages((p) => [...p, botMsg]);
                if (res.uiComponent) setActiveUI(res.uiComponent);
                setHistory([...newHistory, { role: "assistant", content: res.message }]);
            } catch {
                setMessages((p) => [...p, { id: Date.now().toString(), text: "Oops, something went wrong. Try again?", sender: "bot", timestamp: new Date() }]);
            } finally {
                setIsTyping(false);
            }
        },
        [history]
    );

    const handleServiceConfirm = (selected: string[]) => {
        setActiveUI(null);
        sendMessage(`I've selected the following services: ${selected.join(", ")}`);
    };

    const handleSuccessClose = () => {
        setActiveUI(null);
        setMessages(INITIAL_MESSAGES);
        setHistory([]);
        setStage("orb");
    };

    const handleClose = () => {
        setStage("orb");
        setActiveUI(null);
    };

    return (
        <>
            {/* Chat panel (no backdrop — panel is freely draggable) */}
            <AnimatePresence>
                {stage === "chat" && (
                    <ChatPanel
                        key="chat"
                        messages={messages}
                        isTyping={isTyping}
                        inputDisabled={isTyping}
                        inputLocked={!!activeUI}
                        activeUI={activeUI}
                        onSend={sendMessage}
                        onClose={handleClose}
                        onServiceConfirm={handleServiceConfirm}
                        onServiceCancel={() => setActiveUI(null)}
                        onSuccessClose={handleSuccessClose}
                    />
                )}
            </AnimatePresence>

            {/* Bottom-right dock */}
            <div className="fixed bottom-8 right-10 z-[9999] flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {stage === "orb" && (
                        <Orb key="orb" onClick={() => setStage("input")} />
                    )}
                    {stage === "input" && (
                        <ExpandedInput
                            key="input"
                            onSubmit={sendMessage}
                            onClose={() => setStage("orb")}
                        />
                    )}
                    {stage === "chat" && (
                        <motion.button
                            key="mini"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={handleClose}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0d0d18]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-slate-400 hover:text-white transition text-xs"
                        >
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                                <Sparkles className="w-2.5 h-2.5 text-white" />
                            </div>
                            JumboBot · Close
                            <X size={13} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}