"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function ChatbotPage() {
    const router = useRouter();
    const params = useParams();

    const chatbotId = params.id;

    const [loading, setLoading] = useState(true);
    const [chatbot, setChatbot] = useState<any>(null);

    useEffect(() => {
        fetchChatbot();
    }, []);

    const fetchChatbot = async () => {
        const { data, error } = await supabase
            .from("chatbots")
            .select("*")
            .eq("id", chatbotId)
            .single();

        if (error) {
            console.log(error.message);
        } else {
            setChatbot(data);
        }

        setLoading(false);
    };

    const deleteChatbot = async () => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this chatbot?"
        );

        if (!confirmDelete) return;

        await supabase
            .from("chatbots")
            .delete()
            .eq("id", chatbotId);

        router.push("/dashboard");
    };

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "22px",
                    fontWeight: 600,
                }}
            >
                Loading chatbot...
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right, #ffffff, #f8f8ff)",
                padding: "40px",
                fontFamily: "Inter, sans-serif",
            }}
        >
            {/* TOP BAR */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px",
                }}
            >
                <div>
                    <h1
                        style={{
                            fontSize: "42px",
                            fontWeight: 700,
                            color: "#0f172a",
                            marginBottom: "10px",
                        }}
                    >
                        {chatbot?.name}
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "18px",
                        }}
                    >
                        {chatbot?.purpose || "AI Chatbot"}
                    </p>
                </div>

                <button
                    onClick={() => router.push("/dashboard")}
                    style={{
                        padding: "14px 24px",
                        borderRadius: "14px",
                        border: "none",
                        background: "#f1f5f9",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    ← Dashboard
                </button>
            </div>

            {/* MAIN GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "30px",
                }}
            >
                {/* LEFT */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "30px",
                        padding: "35px",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "28px",
                            marginBottom: "30px",
                            color: "#111827",
                        }}
                    >
                        Chatbot Overview
                    </h2>

                    {/* INFO */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "24px",
                            marginBottom: "40px",
                        }}
                    >
                        <div style={cardStyle}>
                            <p style={labelStyle}>Chatbot Name</p>
                            <h3 style={valueStyle}>{chatbot?.name}</h3>
                        </div>

                        <div style={cardStyle}>
                            <p style={labelStyle}>Tone</p>
                            <h3 style={valueStyle}>
                                {chatbot?.tone || "Professional"}
                            </h3>
                        </div>

                        <div style={cardStyle}>
                            <p style={labelStyle}>Created At</p>
                            <h3 style={valueStyle}>
                                {new Date(
                                    chatbot?.created_at
                                ).toLocaleDateString()}
                            </h3>
                        </div>

                        <div style={cardStyle}>
                            <p style={labelStyle}>Status</p>
                            <h3
                                style={{
                                    ...valueStyle,
                                    color: "#22c55e",
                                }}
                            >
                                Active
                            </h3>
                        </div>
                    </div>

                    {/* PURPOSE */}
                    <div
                        style={{
                            padding: "24px",
                            borderRadius: "22px",
                            background: "#f8fafc",
                            marginBottom: "30px",
                        }}
                    >
                        <p
                            style={{
                                color: "#64748b",
                                marginBottom: "10px",
                                fontWeight: 600,
                            }}
                        >
                            Purpose
                        </p>

                        <p
                            style={{
                                fontSize: "17px",
                                lineHeight: 1.7,
                                color: "#0f172a",
                            }}
                        >
                            {chatbot?.purpose ||
                                "No purpose description added."}
                        </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div
                        style={{
                            display: "flex",
                            gap: "18px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            onClick={() =>
                                router.push(`/chatbot/${chatbotId}/train`)
                            }
                            style={gradientButton}
                        >
                            Train Chatbot
                        </button>

                        <button
                            onClick={() =>
                                router.push(`/chatbot/${chatbotId}/test`)
                            }
                            style={secondaryButton}
                        >
                            Test Chatbot
                        </button>

                        <button
                            onClick={deleteChatbot}
                            style={deleteButton}
                        >
                            Delete Chatbot
                        </button>
                    </div>
                </div>

                {/* RIGHT */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    {/* QUICK STATS */}
                    <div
                        style={{
                            background: "white",
                            borderRadius: "30px",
                            padding: "30px",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2
                            style={{
                                marginBottom: "24px",
                                fontSize: "24px",
                            }}
                        >
                            Quick Stats
                        </h2>

                        <div style={statBox}>
                            <p style={labelStyle}>Training Q&A</p>
                            <h3 style={valueStyle}>0</h3>
                        </div>

                        <div style={statBox}>
                            <p style={labelStyle}>Conversations</p>
                            <h3 style={valueStyle}>0</h3>
                        </div>

                        <div style={statBox}>
                            <p style={labelStyle}>Messages</p>
                            <h3 style={valueStyle}>0</h3>
                        </div>
                    </div>

                    {/* EMBED */}
                    <div
                        style={{
                            background: "white",
                            borderRadius: "30px",
                            padding: "30px",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2
                            style={{
                                marginBottom: "18px",
                                fontSize: "24px",
                            }}
                        >
                            Embed Code
                        </h2>

                        <div
                            style={{
                                background: "#0f172a",
                                color: "white",
                                padding: "18px",
                                borderRadius: "18px",
                                overflowX: "auto",
                                fontSize: "14px",
                            }}
                        >
                            {`<script src="https://buildchat.ai/widget.js" chatbot-id="${chatbotId}"></script>`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    background: "#f8fafc",
    padding: "22px",
    borderRadius: "20px",
};

const labelStyle = {
    color: "#64748b",
    fontSize: "15px",
    marginBottom: "8px",
};

const valueStyle = {
    fontSize: "22px",
    fontWeight: 700,
    color: "#0f172a",
};

const statBox = {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "16px",
};

const gradientButton = {
    padding: "16px 24px",
    borderRadius: "16px",
    border: "none",
    background:
        "linear-gradient(90deg,#7c3aed,#ec4899,#f59e0b,#06b6d4)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
};

const secondaryButton = {
    padding: "16px 24px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    background: "white",
    fontWeight: 700,
    cursor: "pointer",
};

const deleteButton = {
    padding: "16px 24px",
    borderRadius: "16px",
    border: "none",
    background: "#ef4444",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
};