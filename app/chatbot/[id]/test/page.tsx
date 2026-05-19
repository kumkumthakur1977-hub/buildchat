"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";

export default function TestPage() {
    const params = useParams();

    const chatbotId = params.id;

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message) return;

        const userMessage = {
            role: "user",
            text: message,
        };

        setChat((prev) => [...prev, userMessage]);

        setLoading(true);

        const { data } = await supabase
            .from("chatbot_data")
            .select("*")
            .eq("chatbot_id", chatbotId)
            .ilike("question", `%${message}%`);

        let botReply = "Sorry, I don't know that yet.";

        if (data && data.length > 0) {
            botReply = data[0].answer;
        }

        const botMessage = {
            role: "bot",
            text: botReply,
        };

        setChat((prev) => [...prev, botMessage]);

        setMessage("");
        setLoading(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                display: "flex",
                flexDirection: "column",
                padding: "40px",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <h1
                style={{
                    fontSize: "42px",
                    fontWeight: 700,
                    marginBottom: "10px",
                }}
            >
                Test Chatbot
            </h1>

            <p
                style={{
                    color: "#64748b",
                    marginBottom: "30px",
                    fontSize: "18px",
                }}
            >
                Test your trained AI chatbot in real time.
            </p>

            {/* CHAT AREA */}
            <div
                style={{
                    flex: 1,
                    background: "white",
                    borderRadius: "30px",
                    padding: "30px",
                    overflowY: "auto",
                    marginBottom: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
            >
                {chat.length === 0 && (
                    <p
                        style={{
                            color: "#94a3b8",
                        }}
                    >
                        Start chatting with your AI chatbot...
                    </p>
                )}

                {chat.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent:
                                msg.role === "user"
                                    ? "flex-end"
                                    : "flex-start",
                            marginBottom: "18px",
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "70%",
                                padding: "16px 20px",
                                borderRadius: "18px",
                                background:
                                    msg.role === "user"
                                        ? "linear-gradient(90deg,#7c3aed,#ec4899)"
                                        : "#f1f5f9",
                                color:
                                    msg.role === "user"
                                        ? "white"
                                        : "#0f172a",
                                lineHeight: 1.6,
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* INPUT */}
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                }}
            >
                <input
                    type="text"
                    placeholder="Ask something..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "18px",
                        borderRadius: "18px",
                        border: "1px solid #e2e8f0",
                        outline: "none",
                        fontSize: "16px",
                    }}
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{
                        padding: "18px 26px",
                        borderRadius: "18px",
                        border: "none",
                        background:
                            "linear-gradient(90deg,#7c3aed,#ec4899,#06b6d4)",
                        color: "white",
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                >
                    {loading ? "..." : "Send"}
                </button>
            </div>
        </div>
    );
}