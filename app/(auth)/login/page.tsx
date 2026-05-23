"use client";

import {
    useEffect,
    useState,
} from "react";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const [isLogin, setIsLogin] =
        useState(true);

    const [darkMode, setDarkMode] =
        useState(true);

    const [isMobile, setIsMobile] =
        useState(false);

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const checkScreen = () => {
            setIsMobile(
                window.innerWidth < 900
            );
        };

        checkScreen();

        window.addEventListener(
            "resize",
            checkScreen
        );

        return () =>
            window.removeEventListener(
                "resize",
                checkScreen
            );

    }, []);

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

            // DEVICE CHECK
            if (
                typeof window !== "undefined" &&
                window.innerWidth < 768
            ) {

                router.push(
                    "/dashboard/mobile_dashboard"
                );

            } else {

                router.push(
                    "/dashboard/desktop_dash"
                );

            }

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
        <>
            <style>
                {`
        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
        }

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

        @keyframes typing {
          0% {
            opacity: 0.3;
            transform: translateY(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px);
          }
          100% {
            opacity: 0.3;
            transform: translateY(0px);
          }
        }

        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }
      `}
            </style>

            <div
                style={{
                    ...styles.page,
                    flexDirection: isMobile
                        ? "column"
                        : "row",
                    background: darkMode
                        ? "#050816"
                        : "#f4f7fb",
                }}
            >

                {/* BG */}
                <div
                    style={{
                        ...styles.glow1,
                        opacity: darkMode ? 1 : 0.4,
                    }}
                />

                <div
                    style={{
                        ...styles.glow2,
                        opacity: darkMode ? 1 : 0.4,
                    }}
                />

                <div
                    style={{
                        ...styles.grid,
                        opacity: darkMode ? 1 : 0.08,
                    }}
                />

                {/* LEFT */}
                <div style={styles.left}>

                    {/* NAV */}
                    <div style={styles.navbar}>

                        <div style={styles.logoRow}>

                            <div style={styles.logo}>
                                LOGO
                            </div>

                            <h1
                                style={{
                                    ...styles.brand,
                                    color: darkMode
                                        ? "white"
                                        : "#0f172a",
                                }}
                            >
                                BuildChat
                            </h1>

                        </div>

                        <button
                            onClick={() =>
                                setDarkMode(!darkMode)
                            }
                            style={{
                                ...styles.toggle,
                                background: darkMode
                                    ? "rgba(255,255,255,0.08)"
                                    : "white",
                                color: darkMode
                                    ? "white"
                                    : "#0f172a",
                            }}
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>

                    </div>

                    {/* HERO */}
                    <div style={styles.hero}>

                        {!isMobile && (
                            <div
                                style={
                                    styles.animationWrap
                                }
                            >

                                <div
                                    style={{
                                        ...styles.animationCard,
                                        background: darkMode
                                            ? "rgba(255,255,255,0.06)"
                                            : "white",
                                    }}
                                >

                                    <div
                                        style={
                                            styles.animationGlow
                                        }
                                    />

                                    <div
                                        style={styles.orb1}
                                    />

                                    <div
                                        style={styles.orb2}
                                    />

                                    <div
                                        style={styles.orb3}
                                    />

                                    <div
                                        style={styles.chatFlow}
                                    >

                                        <div
                                            style={{
                                                ...styles.chatLeft,
                                                color: darkMode
                                                    ? "white"
                                                    : "#0f172a",
                                            }}
                                        >
                                            User asks a question...
                                        </div>

                                        <div
                                            style={styles.typing}
                                        >
                                            <span
                                                style={
                                                    styles.typingDot
                                                }
                                            />

                                            <span
                                                style={{
                                                    ...styles.typingDot,
                                                    animationDelay:
                                                        "0.2s",
                                                }}
                                            />

                                            <span
                                                style={{
                                                    ...styles.typingDot,
                                                    animationDelay:
                                                        "0.4s",
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={
                                                styles.chatRight
                                            }
                                        >
                                            AI responds instantly ⚡
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                        <div
                            style={{
                                ...styles.badge,
                                background: darkMode
                                    ? "rgba(255,255,255,0.08)"
                                    : "white",
                                color: darkMode
                                    ? "#cbd5e1"
                                    : "#475569",
                            }}
                        >
                            ✨ Buildchat-pro
                        </div>

                        <h1
                            style={{
                                ...styles.heading,
                                color: darkMode
                                    ? "white"
                                    : "#0f172a",
                                textAlign: isMobile
                                    ? "center"
                                    : "left",
                            }}
                        >
                            Build your Website
                            <br />
                            Smarter with us

                        </h1>

                        <p
                            style={{
                                ...styles.subtitle,
                                color: darkMode
                                    ? "#94a3b8"
                                    : "#475569",
                                textAlign: isMobile
                                    ? "center"
                                    : "left",
                            }}
                        >
                            Train custom AI assistants on
                            your business knowledge,
                            support documents, FAQs,
                            and workflows.
                        </p>

                    </div>

                </div>

                {/* RIGHT */}
                <div style={styles.right}>

                    <div
                        style={{
                            ...styles.authCard,
                            background: darkMode
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(255,255,255,0.85)",
                        }}
                    >

                        <div style={styles.authLogo}>
                            LOGO
                        </div>

                        <h2
                            style={{
                                ...styles.authTitle,
                                color: darkMode
                                    ? "white"
                                    : "#0f172a",
                            }}
                        >
                            {isLogin
                                ? "Welcome Back"
                                : "Create Account"}
                        </h2>

                        <p
                            style={{
                                ...styles.authSub,
                                color: darkMode
                                    ? "#94a3b8"
                                    : "#64748b",
                            }}
                        >
                            {isLogin
                                ? "Continue building your AI workspace"
                                : "Start your AI chatbot journey"}
                        </p>

                        {/* TABS */}
                        <div
                            style={{
                                ...styles.tabs,
                                background: darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "#eef2ff",
                            }}
                        >

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

                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                style={{
                                    ...styles.input,
                                    background: darkMode
                                        ? "rgba(255,255,255,0.05)"
                                        : "white",
                                    color: darkMode
                                        ? "white"
                                        : "#0f172a",
                                }}
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            style={{
                                ...styles.input,
                                background: darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "white",
                                color: darkMode
                                    ? "white"
                                    : "#0f172a",
                            }}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            style={{
                                ...styles.input,
                                background: darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "white",
                                color: darkMode
                                    ? "white"
                                    : "#0f172a",
                            }}
                        />

                        {error && (
                            <p style={styles.error}>
                                {error}
                            </p>
                        )}

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

                        <p
                            style={{
                                ...styles.footer,
                                color: "#64748b",
                            }}
                        >
                            Secure authentication
                            powered by Supabase
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

const styles: any = {

    page: {
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        overflow: "hidden",
        position: "relative",
        fontFamily:
            "Inter, sans-serif",
    },

    glow1: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(124,58,237,0.28)",
        filter: "blur(140px)",
        borderRadius: "50%",
        top: "-120px",
        left: "-120px",
    },

    glow2: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(6,182,212,0.22)",
        filter: "blur(140px)",
        borderRadius: "50%",
        bottom: "-150px",
        right: "-150px",
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
        minWidth: "300px",
        padding: "30px 5vw",
        zIndex: 2,
    },

    navbar: {
        display: "flex",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginBottom:
            "clamp(30px,5vw,60px)",
    },

    logoRow: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
    },

    logo: {
        width: "58px",
        height: "58px",
        borderRadius: "18px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "12px",
    },

    brand: {
        fontSize: "30px",
        fontWeight: 800,
    },

    toggle: {
        border: "none",
        width: "52px",
        height: "52px",
        borderRadius: "16px",
        cursor: "pointer",
        fontSize: "18px",
    },

    hero: {
        maxWidth: "650px",
        margin: "0 auto",
    },

    animationWrap: {
        marginBottom: "40px",
    },

    animationCard: {
        position: "relative",
        width: "100%",
        maxWidth: "520px",
        height: "220px",
        borderRadius: "34px",
        overflow: "hidden",
        backdropFilter:
            "blur(20px)",
        border:
            "1px solid rgba(255,255,255,0.08)",
    },

    animationGlow: {
        position: "absolute",
        width: "260px",
        height: "260px",
        borderRadius: "50%",
        background:
            "rgba(124,58,237,0.35)",
        filter: "blur(80px)",
        top: "-120px",
        left: "-80px",
        animation:
            "pulseGlow 4s ease-in-out infinite",
    },

    orb1: {
        position: "absolute",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background: "#7c3aed",
        top: "30px",
        right: "60px",
        animation:
            "float 4s ease-in-out infinite",
    },

    orb2: {
        position: "absolute",
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        background: "#06b6d4",
        top: "120px",
        right: "120px",
        animation:
            "float 5s ease-in-out infinite",
    },

    orb3: {
        position: "absolute",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#ec4899",
        bottom: "40px",
        left: "80px",
        animation:
            "float 3.5s ease-in-out infinite",
    },

    chatFlow: {
        position: "relative",
        zIndex: 2,
        padding: "34px",
    },

    chatLeft: {
        padding: "16px",
        borderRadius: "18px",
        background:
            "rgba(255,255,255,0.08)",
        width: "240px",
        marginBottom: "18px",
    },

    typing: {
        display: "flex",
        gap: "6px",
        marginBottom: "18px",
        paddingLeft: "12px",
    },

    typingDot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#06b6d4",
        animation:
            "typing 1.4s infinite ease-in-out",
    },

    chatRight: {
        padding: "16px",
        borderRadius: "18px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        width: "260px",
        marginLeft: "140px",
    },

    badge: {
        display: "inline-flex",
        padding: "10px 18px",
        borderRadius: "999px",
        marginBottom: "28px",
        fontSize: "14px",
        fontWeight: 600,
    },

    heading: {
        fontSize:
            "clamp(38px,8vw,90px)",
        lineHeight: 1,
        fontWeight: 800,
        marginBottom: "26px",
        letterSpacing: "-3px",
    },

    subtitle: {
        fontSize:
            "clamp(16px,3vw,20px)",
        lineHeight: 1.8,
        maxWidth: "580px",
    },

    right: {
        width: "100%",
        maxWidth: "560px",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        zIndex: 2,
    },

    authCard: {
        width: "100%",
        borderRadius: "34px",
        padding:
            "clamp(22px,5vw,42px)",
        backdropFilter:
            "blur(30px)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        boxShadow:
            "0 20px 60px rgba(0,0,0,0.08)",
    },

    authLogo: {
        width: "72px",
        height: "72px",
        borderRadius: "24px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto 22px",
        color: "white",
        fontWeight: 700,
    },

    authTitle: {
        textAlign: "center",
        fontSize:
            "clamp(30px,6vw,42px)",
        fontWeight: 800,
        marginBottom: "10px",
    },

    authSub: {
        textAlign: "center",
        marginBottom: "30px",
    },

    tabs: {
        display: "flex",
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
        cursor: "pointer",
        fontWeight: 700,
        color: "#94a3b8",
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
        outline: "none",
        marginBottom: "18px",
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
        fontSize: "13px",
        marginTop: "22px",
    },

};