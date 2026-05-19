"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleAuth = async () => {
        setLoading(true);
        setError("");

        if (isLogin) {
            const { error } =
                await supabase.auth.signInWithPassword(
                    {
                        email,
                        password,
                    }
                );

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            router.push("/dashboard");
        } else {
            const { data, error } =
                await supabase.auth.signUp({
                    email,
                    password,
                });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            const user = data.user;

            if (user) {
                await supabase
                    .from("profiles")
                    .insert({
                        id: user.id,
                        name,
                    });
            }

            setIsLogin(true);
        }

        setLoading(false);
    };

    return (
        <div style={styles.page}>
            {/* BACKGROUND */}
            <div style={styles.bgGlow1}></div>
            <div style={styles.bgGlow2}></div>
            <div style={styles.grid}></div>

            {/* LEFT */}
            <div style={styles.left}>
                {/* NAV */}
                <div style={styles.nav}>
                    <div style={styles.logoWrap}>
                        <div style={styles.logoSlot}>
                            LOGO
                        </div>

                        <h1 style={styles.brand}>
                            BuildChat
                        </h1>
                    </div>
                </div>

                {/* HERO */}
                <div style={styles.hero}>
                    <div style={styles.pill}>
                        Next Generation AI Platform
                    </div>

                    <h1 style={styles.heading}>
                        Build Smarter
                        <br />
                        AI Chatbots
                    </h1>

                    <p style={styles.subtitle}>
                        Create premium AI assistants
                        trained on your business data,
                        support documents, and customer
                        workflows.
                    </p>

                    {/* FLOATING ASSETS */}
                    <div style={styles.assets}>
                        <div style={styles.assetCardLarge}>
                            <div style={styles.assetTop}>
                                <div style={styles.dot1}></div>
                                <div style={styles.dot2}></div>
                                <div style={styles.dot3}></div>
                            </div>

                            <h3 style={styles.assetTitle}>
                                AI Support Assistant
                            </h3>

                            <p style={styles.assetText}>
                                Trained on 120 documents
                            </p>

                            <div style={styles.chatBubble}>
                                “How can I reset my
                                password?”
                            </div>

                            <div
                                style={styles.chatBubble2}
                            >
                                “Here are the steps to
                                reset your password.”
                            </div>
                        </div>

                        <div style={styles.smallAsset}>
                            <h4 style={styles.smallAssetNo}>
                                98%
                            </h4>

                            <p style={styles.smallAssetTxt}>
                                Faster response
                            </p>
                        </div>

                        <div style={styles.smallAsset2}>
                            ⚡ AI Powered
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div style={styles.right}>
                <div style={styles.authCard}>
                    {/* TOP */}
                    <div style={styles.authLogo}>
                        LOGO
                    </div>

                    <h2 style={styles.authTitle}>
                        {isLogin
                            ? "Welcome back"
                            : "Create account"}
                    </h2>

                    <p style={styles.authSub}>
                        {isLogin
                            ? "Access your AI dashboard"
                            : "Start building your AI chatbot"}
                    </p>

                    {/* TABS */}
                    <div style={styles.tabs}>
                        <button
                            onClick={() =>
                                setIsLogin(true)
                            }
                            style={{
                                ...styles.tabBtn,
                                ...(isLogin
                                    ? styles.activeTab
                                    : {}),
                            }}
                        >
                            Login
                        </button>

                        <button
                            onClick={() =>
                                setIsLogin(false)
                            }
                            style={{
                                ...styles.tabBtn,
                                ...(!isLogin
                                    ? styles.activeTab
                                    : {}),
                            }}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* INPUTS */}
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            style={styles.input}
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        style={styles.input}
                    />

                    {error && (
                        <p style={styles.error}>
                            {error}
                        </p>
                    )}

                    {/* BUTTON */}
                    <button
                        onClick={handleAuth}
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading
                            ? "Loading..."
                            : isLogin
                                ? "Continue"
                                : "Create Account"}
                    </button>

                    <p style={styles.footer}>
                        Secure authentication powered
                        by Supabase
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles: any = {
    page: {
        minHeight: "100vh",
        background: "#050816",
        display: "flex",
        flexWrap: "wrap",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
    },

    bgGlow1: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(124,58,237,0.25)",
        filter: "blur(140px)",
        top: "-150px",
        left: "-100px",
        borderRadius: "50%",
    },

    bgGlow2: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(6,182,212,0.18)",
        filter: "blur(140px)",
        bottom: "-180px",
        right: "-120px",
        borderRadius: "50%",
    },

    grid: {
        position: "absolute",
        inset: 0,
        backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
    },

    left: {
        flex: 1,
        minWidth: "340px",
        padding: "50px 6vw",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
    },

    nav: {
        marginBottom: "70px",
    },

    logoWrap: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
    },

    logoSlot: {
        width: "58px",
        height: "58px",
        borderRadius: "18px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "12px",
    },

    brand: {
        color: "white",
        fontSize: "30px",
        fontWeight: 700,
    },

    hero: {
        maxWidth: "650px",
    },

    pill: {
        display: "inline-flex",
        padding: "10px 18px",
        borderRadius: "999px",
        background:
            "rgba(255,255,255,0.08)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        color: "#cbd5e1",
        marginBottom: "28px",
        backdropFilter: "blur(10px)",
    },

    heading: {
        fontSize: "clamp(54px,7vw,92px)",
        lineHeight: 1,
        fontWeight: 800,
        color: "white",
        marginBottom: "24px",
        letterSpacing: "-3px",
    },

    subtitle: {
        color: "#94a3b8",
        fontSize: "20px",
        lineHeight: 1.8,
        maxWidth: "560px",
        marginBottom: "60px",
    },

    assets: {
        position: "relative",
        height: "320px",
    },

    assetCardLarge: {
        width: "360px",
        background:
            "rgba(255,255,255,0.06)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        borderRadius: "30px",
        padding: "24px",
        boxShadow:
            "0 20px 60px rgba(0,0,0,0.25)",
    },

    assetTop: {
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
    },

    dot1: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#ef4444",
    },

    dot2: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#f59e0b",
    },

    dot3: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#10b981",
    },

    assetTitle: {
        color: "white",
        fontSize: "24px",
        fontWeight: 700,
        marginBottom: "8px",
    },

    assetText: {
        color: "#94a3b8",
        marginBottom: "24px",
    },

    chatBubble: {
        background:
            "rgba(255,255,255,0.08)",
        padding: "16px",
        borderRadius: "18px",
        color: "#e2e8f0",
        marginBottom: "14px",
    },

    chatBubble2: {
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        padding: "16px",
        borderRadius: "18px",
        color: "white",
        marginLeft: "40px",
    },

    smallAsset: {
        position: "absolute",
        right: "80px",
        top: "-20px",
        background:
            "rgba(255,255,255,0.06)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        padding: "20px",
        borderRadius: "24px",
    },

    smallAssetNo: {
        color: "white",
        fontSize: "34px",
        fontWeight: 800,
    },

    smallAssetTxt: {
        color: "#94a3b8",
    },

    smallAsset2: {
        position: "absolute",
        bottom: "10px",
        right: "40px",
        padding: "14px 20px",
        borderRadius: "999px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        fontWeight: 700,
    },

    right: {
        width: "100%",
        maxWidth: "560px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        zIndex: 2,
    },

    authCard: {
        width: "100%",
        background:
            "rgba(255,255,255,0.08)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(30px)",
        borderRadius: "34px",
        padding: "42px",
    },

    authLogo: {
        width: "72px",
        height: "72px",
        borderRadius: "24px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        margin: "0 auto 22px",
    },

    authTitle: {
        color: "white",
        textAlign: "center",
        fontSize: "42px",
        fontWeight: 800,
        marginBottom: "10px",
    },

    authSub: {
        textAlign: "center",
        color: "#94a3b8",
        marginBottom: "30px",
    },

    tabs: {
        display: "flex",
        background:
            "rgba(255,255,255,0.06)",
        padding: "5px",
        borderRadius: "18px",
        marginBottom: "24px",
    },

    tabBtn: {
        flex: 1,
        padding: "14px",
        border: "none",
        background: "transparent",
        borderRadius: "14px",
        color: "#cbd5e1",
        cursor: "pointer",
        fontWeight: 700,
    },

    activeTab: {
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
    },

    input: {
        width: "100%",
        padding: "18px",
        borderRadius: "16px",
        border:
            "1px solid rgba(255,255,255,0.08)",
        background:
            "rgba(255,255,255,0.05)",
        color: "white",
        marginBottom: "18px",
        outline: "none",
        fontSize: "15px",
    },

    error: {
        color: "#ef4444",
        marginBottom: "12px",
    },

    button: {
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        fontWeight: 700,
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px",
        boxShadow:
            "0 20px 40px rgba(124,58,237,0.35)",
    },

    footer: {
        textAlign: "center",
        color: "#64748b",
        fontSize: "13px",
        marginTop: "22px",
    },
};