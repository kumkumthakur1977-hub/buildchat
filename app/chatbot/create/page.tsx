"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateChatbotPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const createChatbot = async () => {
        setError("");

        if (!name.trim()) {
            setError(
                "Chatbot name is required"
            );
            return;
        }

        if (loading) return;

        setLoading(true);

        try {
            const {
                data: userData,
                error: userError,
            } =
                await supabase.auth.getUser();

            const user = userData?.user;

            if (userError || !user) {
                await supabase.auth.signOut();

                setError(
                    "Please login again"
                );

                setLoading(false);

                return;
            }

            const { data, error } =
                await supabase
                    .from("chatbots")
                    .insert({
                        user_id: user.id,
                        name: name.trim(),
                    })
                    .select()
                    .single();

            if (error) {
                setError(error.message);

                setLoading(false);

                return;
            }

            router.push(
                `/chatbot/${data.id}`
            );
        } catch (err: any) {
            setError(
                err.message ||
                    "Something went wrong"
            );
        }

        setLoading(false);
    };

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

                @keyframes pulseGlow {
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

                @keyframes shine {
                    0% {
                        transform: translateX(-100%);
                    }

                    100% {
                        transform: translateX(300%);
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
                {/* BACKGROUND GLOWS */}
                <div style={styles.glow1}></div>

                <div style={styles.glow2}></div>

                <div style={styles.grid}></div>

                {/* FLOATING ORBS */}
                <div style={styles.orb1}></div>

                <div style={styles.orb2}></div>

                <div style={styles.orb3}></div>

                {/* CARD */}
                <div style={styles.card}>
                    {/* SHINE EFFECT */}
                    <div style={styles.shine}></div>

                    {/* LOGO */}
                    <div style={styles.logo}>
                        🤖
                    </div>

                    <h1 style={styles.title}>
                        Create Chatbot
                    </h1>

                    <p style={styles.subtitle}>
                        Build your AI assistant
                        for business, support,
                        learning and automation.
                    </p>

                    {/* INPUT */}
                    <input
                        placeholder="Enter chatbot name..."
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        style={styles.input}
                    />

                    {/* ERROR */}
                    {error && (
                        <p style={styles.error}>
                            {error}
                        </p>
                    )}

                    {/* BUTTON */}
                    <button
                        onClick={
                            createChatbot
                        }
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading
                                ? 0.7
                                : 1,
                        }}
                    >
                        {loading
                            ? "Creating..."
                            : "✨ Create Chatbot"}
                    </button>

                    {/* SMALL TEXT */}
                    <p style={styles.footer}>
                        Powered by BuildChat AI
                    </p>
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily:
            "Inter, sans-serif",
        padding: "20px",
    },

    glow1: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(124,58,237,0.30)",
        borderRadius: "50%",
        filter: "blur(120px)",
        top: "-150px",
        left: "-120px",
        animation:
            "pulseGlow 5s infinite ease-in-out",
    },

    glow2: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(6,182,212,0.25)",
        borderRadius: "50%",
        filter: "blur(120px)",
        bottom: "-180px",
        right: "-120px",
        animation:
            "pulseGlow 6s infinite ease-in-out",
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

    card: {
        position: "relative",
        width: "100%",
        maxWidth: "560px",
        background:
            "rgba(255,255,255,0.08)",
        backdropFilter: "blur(22px)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        borderRadius: "32px",
        padding: "50px",
        overflow: "hidden",
        boxShadow:
            "0 30px 80px rgba(0,0,0,0.45)",
        animation:
            "fadeUp 0.8s ease forwards",
        zIndex: 2,
    },

    shine: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "120px",
        height: "100%",
        background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)",
        transform: "translateX(-100%)",
        animation:
            "shine 5s linear infinite",
    },

    logo: {
        width: "82px",
        height: "82px",
        borderRadius: "24px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "36px",
        marginBottom: "24px",
        boxShadow:
            "0 20px 40px rgba(124,58,237,0.35)",
    },

    title: {
        color: "white",
        fontSize: "46px",
        fontWeight: 800,
        marginBottom: "12px",
        letterSpacing: "-2px",
    },

    subtitle: {
        color: "#94a3b8",
        lineHeight: 1.7,
        marginBottom: "30px",
        fontSize: "16px",
    },

    input: {
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border:
            "1px solid rgba(255,255,255,0.10)",
        background:
            "rgba(255,255,255,0.05)",
        color: "white",
        outline: "none",
        fontSize: "16px",
        marginBottom: "18px",
        transition: "0.3s",
    },

    button: {
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#ec4899,#f59e0b)",
        color: "white",
        fontWeight: 800,
        fontSize: "16px",
        cursor: "pointer",
        boxShadow:
            "0 20px 50px rgba(124,58,237,0.4)",
        transition: "0.3s",
    },

    error: {
        color: "#f87171",
        marginBottom: "14px",
        fontSize: "14px",
    },

    footer: {
        textAlign: "center",
        color: "#64748b",
        marginTop: "24px",
        fontSize: "13px",
    },
};