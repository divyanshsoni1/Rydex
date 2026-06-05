"use client";
import { getSocket } from "@/lib/socket";
import { RootState } from "@/redux/store";
import axios from "axios";
import { Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type message = {
  bookingId: string;
  sender: "user" | "driver";
  text: string;
  createdAt: Date;
};

function RideChat({ currentRole, bookingId, userName, driverName }: any) {
  const otherName = currentRole === "user" ? driverName : userName;
  console.log(driverName);
  console.log(otherName);

  const [messages, setMessages] = useState<message[]>([]);
  const [lastMsg, setLastMsg] = useState("");
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMsg = async () => {
    const socket = getSocket();
    try {
      const { data } = await axios.post("/api/chat/send", {
        sender: currentRole,
        text,
        bookingId,
      });
      socket.emit("chat-message", data);
      setText("");
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const getAllMsgs = async () => {
    try {
      const { data } = await axios.post("/api/chat/get-all", {
        bookingId,
      });
      setMessages(data);
      setLastMsg(data[0]);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllMsgs();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chat-message");
    };
  });

  const getAISuggestions = async () => {
    setAiLoading(true);
    setShowAiSuggestions(true);
    try {
      const { data } = await axios.post("/api/chat/ai-suggestions", {
        lastMsg,
        role: currentRole,
      });
      const jsonData = JSON.parse(data);
      setSuggestions(jsonData.suggestions);
      setAiLoading(false);
    } catch (error: any) {
      console.log(error.response.data.message);
      setAiLoading(false);
    }
  };

  const formatTime = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-white rounded-2xl overflow-hidden border border-zinc-100">
      <div className="shrink-0 flex items-center gap-3 px-4 py-3 bg-white border-b border-zinc-100">
        <div className="relative shrink-0">
          <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white text-xs font-bold">
            {String(otherName || "?")
              .charAt(0)
              .toUpperCase()}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-zinc-900 leading-none">
            {otherName}
          </p>
          <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">
            Active Now
          </p>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-zinc-50"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`div::-webkit-scrollbar {display:none;}`}</style>

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
              <Send size={18} className="text-zinc-400" />
            </div>
            <p className="text-sm text-zinc-400 font-medium">No Messages Yet</p>
            <p className="text-xs text-zinc-300">
              Start the conversation below
            </p>
          </div>
        )}

        {messages.length > 0 &&
          messages.map((mes, idx) => {
            const isMine = mes.sender === currentRole;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className={`flex w-full ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[72%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    isMine ?
                      "bg-black text-white rounded-br-md"
                    : "bg-white border border-zinc-200 text-black rounded-bl-md"
                  }`}
                >
                  <p className="break-words">{mes.text}</p>

                  <div
                    className={`text-[10px] mt-1 text-right ${
                      isMine ? "text-zinc-300" : "text-zinc-500"
                    }`}
                  >
                    {formatTime(mes.createdAt)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      <AnimatePresence>
        {showAiSuggestions && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="shrink-0 overflow-hidden border-t border-zinc-100 bg-white"
          >
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-violet-500" />
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    AI Suggestions
                  </span>
                </div>
                <button onClick={() => setShowAiSuggestions(false)}>
                  <X size={14} className="text-zinc-400 hover:text-zinc-600" />
                </button>
              </div>

              {aiLoading ?
                <div className="flex flex-col gap-1.5">
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className="h-9 bg-zinc-100 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              : <div className="flex flex-col gap-1.5">
                  {suggestions.map((sug, idx) => (
                    <motion.div
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setText(sug);
                        setShowAiSuggestions(false);
                      }}
                      className="text-left text-sm text-zinc-700 bg-zinc-50 hover:bg-violet-50 hover:text-violet-700 border border-zinc-100 hover:border-violet-200 px-3 py-2 rounded-xl transition-all"
                    >
                      {sug}
                    </motion.div>
                  ))}
                  <button
                    onClick={getAISuggestions}
                    className="text-[11px] text-violet-500 hover:text-violet-700 font-semibold text-center mt-1 transition-colors"
                  >
                    Refressh Suggestions
                  </button>
                </div>
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="shrink-0 px-4 pb-2 pt-2 bg-white">
        <div className="flex items-center gap-2 bg-zinc-100 rounded-2xl pl-3 pr-1.5 py-1.5">
          {messages.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => getAISuggestions()}
              className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${showAiSuggestions ? "bg-violet-600 text-white" : "bg-white text-violet-500 hover:bg-violet-50 border border-zinc-200"}`}
            >
              <Sparkles size={14} />
            </motion.button>
          )}

          <input
            type="text"
            value={text}
            placeholder="Message..."
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none py-1.5 min-w-0"
          />

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => sendMsg()}
            disabled={!text.trim()}
            className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${text.trim() ? "bg-zinc-950 text-white hover:bg-zinc-800" : "bg-transparent text-zinc-300 cursor-not-allowed"}`}
          >
            <Send size={14} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default RideChat;
