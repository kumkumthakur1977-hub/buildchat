"use client";

import {
    useEffect,
    useState,
} from "react";

import { supabase }
    from "@/lib/supabaseClient";

import { useRouter }
    from "next/navigation";

export default function MobileLoginPage() {

    const router = useRouter();

    const [isLogin, setIsLogin] =
        useState(true);

    const [darkMode, setDarkMode] =
        useState(true);

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

        // Prevent desktop access
        if (window.innerWidth >= 768) {
            router.push("/login");
        }

    }, []);

    const handleAuth = async () => {

        setLoading(true);
        setError("");

        if (isLogin) {

            const { error } =
                await supabase.auth
                    .signInWithPassword({
                        email,
                        password,
                    });

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
        <>
            <style>
                {`

        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
          overflow-x:hidden;
        }

        @keyframes float {
          0%{
            transform:
              translateY(0px)
              rotate(0deg);
          }

          50%{
            transform:
              translateY(-18px)
              rotate(8deg);
          }

          100%{
            transform:
              translateY(0px)
              rotate(0deg);
          }
        }

        @keyframes pulse {
          0%{
            transform:scale(1);
            opacity:0.7;
          }

          50%{
            transform:scale(1.15);
            opacity:1;
          }

          100%{
            transform:scale(1);
            opacity:0.7;
          }
        }

        @keyframes slideUp {
          from{
            opacity:0;
            transform:
              translateY(40px);
          }

          to{
            opacity:1;
            transform:
              translateY(0px);
          }
        }

        @keyframes glowMove {

          0%{
            transform:
              translateX(0px)
              translateY(0px);
          }

          50%{
            transform:
              translateX(20px)
              translateY(-20px);
          }

          100%{
            transform:
              translateX(0px)
              translateY(0px);
          }

        }

      `}
            </style>

            <div
                style={{
                    ...styles.page,
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

                {/* TOP */}
                <div style={styles.top}>

                    <div style={styles.logo}>
                        BC
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

                    <div style={styles.orb1} />
                    <div style={styles.orb2} />
                    <div style={styles.orb3} />

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
                        ✨ AI Powered
                    </div>

                    <h1
                        style={{
                            ...styles.heading,
                            color: darkMode
                                ? "white"
                                : "#0f172a",
                        }}
                    >
                        Build AI
                        <br />
                        Chatbots
                    </h1>

                    <p
                        style={{
                            ...styles.subtitle,
                            color: darkMode
                                ? "#94a3b8"
                                : "#475569",
                        }}
                    >
                        Create intelligent AI
                        assistants for your
                        business instantly.
                    </p>

                </div>

                {/* CARD */}
                <div
                    style={{
                        ...styles.card,
                        background: darkMode
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(255,255,255,0.92)",
                    }}
                >

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
                            color: darkMode
                                ? "#64748b"
                                : "#64748b",
                        }}
                    >
                        Secure login powered
                        by Supabase
                    </p>

                </div>

            </div>
        </>
    );
}

const styles: any = {

    page: {
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding:
            "20px 20px 40px",
        fontFamily:
            "Inter, sans-serif",
    },

    glow1: {
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background:
            "rgba(124,58,237,0.35)",
        filter: "blur(120px)",
        top: "-120px",
        left: "-100px",
        animation:
            "glowMove 8s ease-in-out infinite",
    },

    glow2: {
        position: "absolute",
        width: "280px",
        height: "280px",
        borderRadius: "50%",
        background:
            "rgba(6,182,212,0.25)",
        filter: "blur(120px)",
        bottom: "-120px",
        right: "-100px",
        animation:
            "glowMove 10s ease-in-out infinite",
    },

    top: {
        position: "relative",
        zIndex: 2,
        display: "flex",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginBottom: "30px",
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
        fontWeight: 800,
        fontSize: "18px",
        boxShadow:
            "0 20px 40px rgba(124,58,237,0.35)",
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
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        marginBottom: "40px",
        animation:
            "slideUp 0.8s ease",
    },

    orb1: {
        position: "absolute",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background: "#7c3aed",
        top: "10px",
        left: "30px",
        animation:
            "float 4s ease-in-out infinite",
    },

    orb2: {
        position: "absolute",
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        background: "#06b6d4",
        top: "80px",
        right: "40px",
        animation:
            "float 5s ease-in-out infinite",
    },

    orb3: {
        position: "absolute",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: "#ec4899",
        bottom: "-10px",
        left: "80px",
        animation:
            "float 3.5s ease-in-out infinite",
    },

    badge: {
        display: "inline-flex",
        padding: "10px 18px",
        borderRadius: "999px",
        marginBottom: "24px",
        fontWeight: 700,
        fontSize: "14px",
        backdropFilter: "blur(10px)",
    },

    heading: {
        fontSize:
            "clamp(48px,12vw,72px)",
        lineHeight: 1,
        fontWeight: 900,
        marginBottom: "20px",
        letterSpacing: "-3px",
    },

    subtitle: {
        fontSize: "17px",
        lineHeight: 1.8,
        maxWidth: "340px",
        margin: "0 auto",
    },

    card: {
        position: "relative",
        zIndex: 2,
        width: "100%",
        borderRadius: "32px",
        padding: "24px",
        backdropFilter:
            "blur(30px)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        animation:
            "slideUp 1s ease",
    },

    tabs: {
        display: "flex",
        padding: "5px",
        borderRadius: "18px",
        background:
            "rgba(255,255,255,0.05)",
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
        transition: "0.3s",
    },

    activeTab: {
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        boxShadow:
            "0 10px 30px rgba(124,58,237,0.35)",
    },

    input: {
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border:
            "1px solid rgba(255,255,255,0.08)",
        outline: "none",
        marginBottom: "16px",
        fontSize: "15px",
        backdropFilter: "blur(10px)",
    },

    error: {
        color: "#ef4444",
        marginBottom: "12px",
        fontSize: "14px",
    },

    button: {
        width: "100%",
        padding: "18px",
        borderRadius: "20px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        fontWeight: 800,
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "8px",
        boxShadow:
            "0 20px 50px rgba(124,58,237,0.35)",
    },

    footer: {
        textAlign: "center",
        fontSize: "13px",
        marginTop: "20px",
    },

};