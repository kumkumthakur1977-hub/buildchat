"use client";

import {
    useEffect,
    useState,
} from "react";

import { supabase } from "@/lib/supabaseClient";

import {
    useParams,
    useRouter,
} from "next/navigation";

export default function ChatbotPage() {
    const router = useRouter();

    const params = useParams();

    const chatbotId = params.id;

    const [loading, setLoading] =
        useState(true);

    const [chatbot, setChatbot] =
        useState<any>(null);

    const [qaCount, setQaCount] =
        useState(0);

    const [deleting, setDeleting] =
        useState(false);

    useEffect(() => {
        fetchChatbot();
    }, []);

    const fetchChatbot = async () => {
        setLoading(true);

        const { data, error } =
            await supabase
                .from("chatbots")
                .select("*")
                .eq("id", chatbotId)
                .single();

        if (error) {
            console.log(error.message);

            setLoading(false);

            return;
        }

        setChatbot(data);

        // FETCH TRAINED DATA COUNT
        const {
            count,
        } = await supabase
            .from("chatbot_data")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq(
                "chatbot_id",
                chatbotId
            );

        setQaCount(count || 0);

        setLoading(false);
    };

    const deleteChatbot = async () => {
        const confirmDelete = confirm(
            "Delete this chatbot permanently?"
        );

        if (!confirmDelete) return;

        setDeleting(true);

        // DELETE TRAINING DATA FIRST
        await supabase
            .from("chatbot_data")
            .delete()
            .eq(
                "chatbot_id",
                chatbotId
            );

        // DELETE CHATBOT
        await supabase
            .from("chatbots")
            .delete()
            .eq("id", chatbotId);

        router.push("/dashboard");
    };

    if (loading) {
        return (
            <>
                <style>
                    {`
                    @keyframes pulse {
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
                `}
                </style>

                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                        background:
                            "#050816",
                        color: "white",
                        fontSize: "24px",
                        fontWeight: 700,
                        animation:
                            "pulse 1.5s infinite",
                        fontFamily:
                            "Inter, sans-serif",
                    }}
                >
                    Loading Chatbot...
                </div>
            </>
        );
    }

    return (
        <>
            <style>
                {`
                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }

                    50% {
                        transform: translateY(-18px);
                    }

                    100% {
                        transform: translateY(0px);
                    }
                }

                @keyframes glow {
                    0% {
                        transform: scale(1);
                        opacity: 0.5;
                    }

                    50% {
                        transform: scale(1.1);
                        opacity: 1;
                    }

                    100% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                }

                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0px);
                    }
                }
            `}
            </style>

            <div style={styles.page}>
                {/* GLOW */}
                <div style={styles.glow1}></div>

                <div style={styles.glow2}></div>

                <div style={styles.grid}></div>

                {/* FLOATING ORBS */}
                <div style={styles.orb1}></div>

                <div style={styles.orb2}></div>

                <div style={styles.orb3}></div>

                {/* TOPBAR */}
                <div style={styles.topbar}>
                    <div>
                        <p style={styles.small}>
                            BuildChat AI
                        </p>

                        <h1 style={styles.title}>
                            {chatbot?.name}
                        </h1>

                        <p
                            style={
                                styles.subtitle
                            }
                        >
                            AI Assistant
                            Dashboard
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            router.push(
                                "/dashboard"
                            )
                        }
                        style={
                            styles.dashboardBtn
                        }
                    >
                        ← Dashboard
                    </button>
                </div>

                {/* MAIN */}
                <div style={styles.mainGrid}>
                    {/* LEFT */}
                    <div style={styles.left}>
                        {/* OVERVIEW */}
                        <div
                            style={
                                styles.mainCard
                            }
                        >
                            <div
                                style={
                                    styles.iconWrap
                                }
                            >
                                🤖
                            </div>

                            <h2
                                style={
                                    styles.cardTitle
                                }
                            >
                                Chatbot Overview
                            </h2>

                            <p
                                style={
                                    styles.cardText
                                }
                            >
                                Manage,
                                train and
                                test your AI
                                chatbot.
                            </p>

                            {/* INFO GRID */}
                            <div
                                style={
                                    styles.infoGrid
                                }
                            >
                                <div
                                    style={
                                        styles.infoCard
                                    }
                                >
                                    <p
                                        style={
                                            styles.label
                                        }
                                    >
                                        Chatbot
                                    </p>

                                    <h3
                                        style={
                                            styles.value
                                        }
                                    >
                                        {
                                            chatbot?.name
                                        }
                                    </h3>
                                </div>

                                <div
                                    style={
                                        styles.infoCard
                                    }
                                >
                                    <p
                                        style={
                                            styles.label
                                        }
                                    >
                                        Status
                                    </p>

                                    <h3
                                        style={{
                                            ...styles.value,
                                            color:
                                                "#22c55e",
                                        }}
                                    >
                                        Active
                                    </h3>
                                </div>

                                <div
                                    style={
                                        styles.infoCard
                                    }
                                >
                                    <p
                                        style={
                                            styles.label
                                        }
                                    >
                                        Created
                                    </p>

                                    <h3
                                        style={
                                            styles.value
                                        }
                                    >
                                        {new Date(
                                            chatbot?.created_at
                                        ).toLocaleDateString()}
                                    </h3>
                                </div>

                                <div
                                    style={
                                        styles.infoCard
                                    }
                                >
                                    <p
                                        style={
                                            styles.label
                                        }
                                    >
                                        Training
                                    </p>

                                    <h3
                                        style={
                                            styles.value
                                        }
                                    >
                                        {
                                            qaCount
                                        }{" "}
                                        Q&A
                                    </h3>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div
                                style={
                                    styles.actionRow
                                }
                            >
                                <button
                                    onClick={() =>
                                        router.push(
                                            `/chatbot/${chatbotId}/train`
                                        )
                                    }
                                    style={
                                        styles.trainBtn
                                    }
                                >
                                    🚀 Train
                                    Chatbot
                                </button>

                                <button
                                    onClick={() =>
                                        router.push(
                                            `/chatbot/${chatbotId}/test`
                                        )
                                    }
                                    style={
                                        styles.testBtn
                                    }
                                >
                                    💬 Test AI
                                </button>

                                <button
                                    onClick={
                                        deleteChatbot
                                    }
                                    disabled={
                                        deleting
                                    }
                                    style={
                                        styles.deleteBtn
                                    }
                                >
                                    {deleting
                                        ? "Deleting..."
                                        : "🗑 Delete"}
                                </button>
                            </div>
                        </div>

                        {/* EMBED */}
                        <div
                            style={
                                styles.embedCard
                            }
                        >
                            <h2
                                style={
                                    styles.embedTitle
                                }
                            >
                                Embed Code
                            </h2>

                            <div
                                style={
                                    styles.codeBox
                                }
                            >
                                {`<script src="https://buildchat.ai/widget.js" chatbot-id="${chatbotId}"></script>`}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div style={styles.right}>
                        {/* STATS */}
                        <div
                            style={
                                styles.statsCard
                            }
                        >
                            <h2
                                style={
                                    styles.statsTitle
                                }
                            >
                                Quick Stats
                            </h2>

                            <div
                                style={
                                    styles.statItem
                                }
                            >
                                <p
                                    style={
                                        styles.label
                                    }
                                >
                                    Training
                                    Data
                                </p>

                                <h1
                                    style={
                                        styles.bigValue
                                    }
                                >
                                    {qaCount}
                                </h1>
                            </div>

                            <div
                                style={
                                    styles.statItem
                                }
                            >
                                <p
                                    style={
                                        styles.label
                                    }
                                >
                                    Conversations
                                </p>

                                <h1
                                    style={
                                        styles.bigValue
                                    }
                                >
                                    0
                                </h1>
                            </div>

                            <div
                                style={
                                    styles.statItem
                                }
                            >
                                <p
                                    style={
                                        styles.label
                                    }
                                >
                                    Messages
                                </p>

                                <h1
                                    style={
                                        styles.bigValue
                                    }
                                >
                                    0
                                </h1>
                            </div>
                        </div>

                        {/* AI VISUAL */}
                        <div
                            style={
                                styles.aiCard
                            }
                        >
                            <div
                                style={
                                    styles.aiGlow
                                }
                            ></div>

                            <div
                                style={
                                    styles.aiCircle
                                }
                            >
                                ⚡
                            </div>

                            <h2
                                style={{
                                    color:
                                        "white",
                                    marginBottom:
                                        "12px",
                                }}
                            >
                                AI Powered
                            </h2>

                            <p
                                style={{
                                    color:
                                        "#94a3b8",
                                    lineHeight: 1.7,
                                    textAlign:
                                        "center",
                                }}
                            >
                                Train your
                                chatbot with
                                custom
                                business
                                knowledge and
                                build smart
                                AI workflows.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const glass = {
    background:
        "rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)",
    border:
        "1px solid rgba(255,255,255,0.08)",
    boxShadow:
        "0 20px 60px rgba(0,0,0,0.25)",
};

const styles: any = {
    page: {
        minHeight: "100vh",
        background:
            "linear-gradient(135deg,#050816,#111827,#1e1b4b)",
        padding: "40px",
        position: "relative",
        overflow: "hidden",
        fontFamily:
            "Inter, sans-serif",
    },

    glow1: {
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background:
            "rgba(124,58,237,0.25)",
        filter: "blur(120px)",
        top: "-150px",
        left: "-120px",
        animation:
            "glow 5s infinite ease-in-out",
    },

    glow2: {
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background:
            "rgba(6,182,212,0.22)",
        filter: "blur(120px)",
        bottom: "-180px",
        right: "-120px",
        animation:
            "glow 6s infinite ease-in-out",
    },

    grid: {
        position: "absolute",
        inset: 0,
        backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
    },

    orb1: {
        position: "absolute",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "#7c3aed",
        top: "18%",
        left: "15%",
        animation:
            "float 4s ease-in-out infinite",
    },

    orb2: {
        position: "absolute",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background: "#06b6d4",
        top: "70%",
        right: "18%",
        animation:
            "float 5s ease-in-out infinite",
    },

    orb3: {
        position: "absolute",
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        background: "#ec4899",
        bottom: "18%",
        left: "25%",
        animation:
            "float 3.5s ease-in-out infinite",
    },

    topbar: {
        display: "flex",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginBottom: "40px",
        position: "relative",
        zIndex: 2,
        flexWrap: "wrap",
        gap: "20px",
    },

    small: {
        color: "#06b6d4",
        marginBottom: "8px",
        fontWeight: 700,
    },

    title: {
        fontSize: "56px",
        color: "white",
        fontWeight: 800,
        marginBottom: "10px",
        letterSpacing: "-2px",
    },

    subtitle: {
        color: "#94a3b8",
        fontSize: "18px",
    },

    dashboardBtn: {
        padding: "16px 24px",
        borderRadius: "18px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
    },

    mainGrid: {
        display: "grid",
        gridTemplateColumns:
            "2fr 1fr",
        gap: "28px",
        position: "relative",
        zIndex: 2,
    },

    left: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },

    mainCard: {
        ...glass,
        borderRadius: "32px",
        padding: "34px",
        animation:
            "fadeUp 0.7s ease forwards",
    },

    iconWrap: {
        width: "90px",
        height: "90px",
        borderRadius: "28px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "42px",
        marginBottom: "24px",
        boxShadow:
            "0 20px 50px rgba(124,58,237,0.35)",
    },

    cardTitle: {
        color: "white",
        fontSize: "34px",
        marginBottom: "12px",
        fontWeight: 800,
    },

    cardText: {
        color: "#94a3b8",
        lineHeight: 1.7,
        marginBottom: "30px",
    },

    infoGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
        gap: "18px",
        marginBottom: "32px",
    },

    infoCard: {
        background:
            "rgba(255,255,255,0.05)",
        padding: "22px",
        borderRadius: "24px",
        border:
            "1px solid rgba(255,255,255,0.05)",
    },

    label: {
        color: "#94a3b8",
        marginBottom: "10px",
        fontSize: "14px",
    },

    value: {
        color: "white",
        fontSize: "24px",
        fontWeight: 700,
    },

    actionRow: {
        display: "flex",
        gap: "18px",
        flexWrap: "wrap",
    },

    trainBtn: {
        padding: "16px 24px",
        borderRadius: "18px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#ec4899,#f59e0b)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow:
            "0 20px 40px rgba(124,58,237,0.35)",
    },

    testBtn: {
        padding: "16px 24px",
        borderRadius: "18px",
        border:
            "1px solid rgba(255,255,255,0.08)",
        background:
            "rgba(255,255,255,0.05)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
    },

    deleteBtn: {
        padding: "16px 24px",
        borderRadius: "18px",
        border: "none",
        background:
            "linear-gradient(135deg,#ef4444,#f97316)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
    },

    embedCard: {
        ...glass,
        borderRadius: "30px",
        padding: "30px",
    },

    embedTitle: {
        color: "white",
        fontSize: "28px",
        marginBottom: "18px",
        fontWeight: 800,
    },

    codeBox: {
        background: "#020617",
        color: "#38bdf8",
        padding: "20px",
        borderRadius: "18px",
        overflowX: "auto",
        fontSize: "14px",
        lineHeight: 1.7,
    },

    right: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },

    statsCard: {
        ...glass,
        borderRadius: "30px",
        padding: "30px",
    },

    statsTitle: {
        color: "white",
        fontSize: "28px",
        marginBottom: "24px",
        fontWeight: 800,
    },

    statItem: {
        background:
            "rgba(255,255,255,0.05)",
        borderRadius: "24px",
        padding: "24px",
        marginBottom: "18px",
    },

    bigValue: {
        color: "white",
        fontSize: "42px",
        fontWeight: 800,
    },

    aiCard: {
        ...glass,
        borderRadius: "30px",
        padding: "40px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    aiGlow: {
        position: "absolute",
        width: "250px",
        height: "250px",
        background:
            "rgba(124,58,237,0.35)",
        borderRadius: "50%",
        filter: "blur(80px)",
        top: "-120px",
    },

    aiCircle: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "54px",
        marginBottom: "24px",
        position: "relative",
        zIndex: 2,
        animation:
            "float 4s ease-in-out infinite",
        boxShadow:
            "0 20px 60px rgba(124,58,237,0.45)",
    },
};