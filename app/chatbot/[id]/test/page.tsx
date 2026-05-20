"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function TestChatbotPage() {
    const params = useParams();
    const router = useRouter();

    const chatbotId = params.id;

    const [chatbot, setChatbot] = useState<any>(null);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<any>(null);

    useEffect(() => {
        fetchChatbot();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // FETCH CHATBOT
    const fetchChatbot = async () => {
        const { data } = await supabase
            .from("chatbots")
            .select("*")
            .eq("id", chatbotId)
            .single();

        if (data) {
            setChatbot(data);
        }
    };

    // SEND MESSAGE
    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            role: "user",
            text: message,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        const currentMessage = message;

        setMessage("");
        setLoading(true);

        // FIND TRAINING MATCH
        const { data } = await supabase
            .from("chatbot_data")
            .select("*")
            .eq("chatbot_id", chatbotId);

        let aiReply =
            "Sorry, I don't know that yet.";

        if (data && data.length > 0) {
            const found = data.find((item) =>
                currentMessage
                    .toLowerCase()
                    .includes(
                        item.question.toLowerCase()
                    )
            );

            if (found) {
                aiReply = found.answer;
            }
        }

        // AI TYPING EFFECT
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: aiReply,
                },
            ]);

            setLoading(false);
        }, 1200);
    };

    return (
        <>
            {/* ANIMATIONS */}
            <style>
                {`
                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-16px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }

                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0px);
                    }
                }

                @keyframes glow {
                    0% {
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0.5;
                    }
                }

                @keyframes typing {
                    0% {
                        transform: translateY(0px);
                        opacity: 0.4;
                    }

                    50% {
                        transform: translateY(-5px);
                        opacity: 1;
                    }

                    100% {
                        transform: translateY(0px);
                        opacity: 0.4;
                    }
                }
            `}
            </style>

            <div style={styles.page}>
                {/* GLOW EFFECTS */}
                <div style={styles.glow1}></div>
                <div style={styles.glow2}></div>

                {/* FLOATING ORBS */}
                <div style={styles.orb1}></div>
                <div style={styles.orb2}></div>
                <div style={styles.orb3}></div>

                {/* TOPBAR */}
                <div style={styles.topbar}>
                    <div>
                        <h1 style={styles.title}>
                            Test Chatbot
                        </h1>

                        <p style={styles.subtitle}>
                            {chatbot?.name ||
                                "AI Assistant"}
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            router.push(
                                `/chatbot/${chatbotId}`
                            )
                        }
                        style={styles.backButton}
                    >
                        ← Back
                    </button>
                </div>

                {/* CHAT CONTAINER */}
                <div style={styles.chatContainer}>
                    {/* CHAT HEADER */}
                    <div style={styles.chatHeader}>
                        <div style={styles.botAvatar}>
                            🤖
                        </div>

                        <div>
                            <h2 style={styles.botName}>
                                {chatbot?.name ||
                                    "AI Bot"}
                            </h2>

                            <p style={styles.online}>
                                ● Online
                            </p>
                        </div>
                    </div>

                    {/* MESSAGES */}
                    <div style={styles.messagesBox}>
                        {messages.length === 0 && (
                            <div
                                style={
                                    styles.emptyState
                                }
                            >
                                <div
                                    style={
                                        styles.emptyIcon
                                    }
                                >
                                    ✨
                                </div>

                                <h2
                                    style={
                                        styles.emptyTitle
                                    }
                                >
                                    Start Conversation
                                </h2>

                                <p
                                    style={
                                        styles.emptyText
                                    }
                                >
                                    Test your chatbot
                                    by sending a
                                    message.
                                </p>
                            </div>
                        )}

                        {messages.map(
                            (msg, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.messageRow,
                                        justifyContent:
                                            msg.role ===
                                            "user"
                                                ? "flex-end"
                                                : "flex-start",
                                    }}
                                >
                                    <div
                                        style={{
                                            ...styles.messageBubble,
                                            background:
                                                msg.role ===
                                                "user"
                                                    ? "linear-gradient(135deg,#7c3aed,#06b6d4)"
                                                    : "rgba(255,255,255,0.08)",

                                            color:
                                                "white",

                                            animation:
                                                "fadeUp 0.4s ease",
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            )
                        )}

                        {/* TYPING */}
                        {loading && (
                            <div
                                style={{
                                    ...styles.messageRow,
                                    justifyContent:
                                        "flex-start",
                                }}
                            >
                                <div
                                    style={
                                        styles.typingBox
                                    }
                                >
                                    <span
                                        style={
                                            styles.typingDot
                                        }
                                    ></span>

                                    <span
                                        style={{
                                            ...styles.typingDot,
                                            animationDelay:
                                                "0.2s",
                                        }}
                                    ></span>

                                    <span
                                        style={{
                                            ...styles.typingDot,
                                            animationDelay:
                                                "0.4s",
                                        }}
                                    ></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* INPUT AREA */}
                    <div style={styles.inputArea}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) =>
                                setMessage(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {
                                if (
                                    e.key ===
                                    "Enter"
                                ) {
                                    sendMessage();
                                }
                            }}
                            style={styles.input}
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            style={{
                                ...styles.sendButton,
                                opacity: loading
                                    ? 0.7
                                    : 1,
                            }}
                        >
                            {loading
                                ? "..."
                                : "Send"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const styles: any = {
    page: {
        minHeight: "100vh",
        background:
            "linear-gradient(135deg,#050816,#111827,#1e1b4b)",
        padding: "40px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
    },

    glow1: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(124,58,237,0.25)",
        borderRadius: "50%",
        filter: "blur(120px)",
        top: "-180px",
        left: "-180px",
        animation: "glow 5s infinite",
    },

    glow2: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(6,182,212,0.2)",
        borderRadius: "50%",
        filter: "blur(120px)",
        bottom: "-180px",
        right: "-180px",
        animation: "glow 5s infinite",
    },

    orb1: {
        position: "absolute",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background: "#7c3aed",
        top: "120px",
        right: "180px",
        animation:
            "float 4s ease-in-out infinite",
    },

    orb2: {
        position: "absolute",
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        background: "#06b6d4",
        top: "300px",
        left: "140px",
        animation:
            "float 5s ease-in-out infinite",
    },

    orb3: {
        position: "absolute",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#ec4899",
        bottom: "120px",
        right: "280px",
        animation:
            "float 3s ease-in-out infinite",
    },

    topbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        position: "relative",
        zIndex: 2,
    },

    title: {
        fontSize: "48px",
        fontWeight: 800,
        color: "white",
        marginBottom: "10px",
    },

    subtitle: {
        color: "#94a3b8",
        fontSize: "18px",
    },

    backButton: {
        padding: "14px 22px",
        borderRadius: "16px",
        border: "none",
        background:
            "rgba(255,255,255,0.08)",
        color: "white",
        cursor: "pointer",
        fontWeight: 700,
        backdropFilter: "blur(10px)",
    },

    chatContainer: {
        maxWidth: "1100px",
        margin: "0 auto",
        height: "75vh",
        background:
            "rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
        border:
            "1px solid rgba(255,255,255,0.1)",
        borderRadius: "32px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 2,
        boxShadow:
            "0 20px 60px rgba(0,0,0,0.3)",
    },

    chatHeader: {
        padding: "24px",
        borderBottom:
            "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "18px",
    },

    botAvatar: {
        width: "70px",
        height: "70px",
        borderRadius: "22px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        color: "white",
        animation:
            "float 4s ease-in-out infinite",
    },

    botName: {
        color: "white",
        fontSize: "24px",
        fontWeight: 700,
    },

    online: {
        color: "#4ade80",
        marginTop: "4px",
    },

    messagesBox: {
        flex: 1,
        padding: "30px",
        overflowY: "auto",
    },

    emptyState: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },

    emptyIcon: {
        fontSize: "70px",
        marginBottom: "20px",
        animation:
            "float 4s ease-in-out infinite",
    },

    emptyTitle: {
        color: "white",
        fontSize: "34px",
        marginBottom: "10px",
    },

    emptyText: {
        color: "#94a3b8",
        fontSize: "18px",
    },

    messageRow: {
        display: "flex",
        marginBottom: "18px",
    },

    messageBubble: {
        maxWidth: "70%",
        padding: "18px",
        borderRadius: "22px",
        lineHeight: 1.7,
        fontSize: "15px",
        backdropFilter: "blur(10px)",
    },

    typingBox: {
        display: "flex",
        gap: "6px",
        background:
            "rgba(255,255,255,0.08)",
        padding: "16px",
        borderRadius: "18px",
    },

    typingDot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#06b6d4",
        animation:
            "typing 1.2s infinite ease-in-out",
    },

    inputArea: {
        display: "flex",
        gap: "16px",
        padding: "24px",
        borderTop:
            "1px solid rgba(255,255,255,0.08)",
    },

    input: {
        flex: 1,
        padding: "18px",
        borderRadius: "18px",
        border:
            "1px solid rgba(255,255,255,0.1)",
        background:
            "rgba(255,255,255,0.05)",
        color: "white",
        outline: "none",
        fontSize: "16px",
    },

    sendButton: {
        padding: "18px 28px",
        borderRadius: "18px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4,#ec4899)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
        minWidth: "120px",
        boxShadow:
            "0 10px 30px rgba(124,58,237,0.4)",
    },
};