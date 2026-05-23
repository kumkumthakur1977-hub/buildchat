"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabaseClient";

export default function MobileDashboard() {

    const router = useRouter();

    const [darkMode, setDarkMode] =
        useState(true);

    const [userName, setUserName] =
        useState("User");

    useEffect(() => {

        const getUser = async () => {

            const {
                data: { user },
            } =
                await supabase.auth.getUser();

            if (!user) {

                router.push(
                    "/mobile_login"
                );

                return;

            }

            const { data } =
                await supabase
                    .from("profiles")
                    .select("name")
                    .eq("id", user.id)
                    .single();

            if (data?.name) {

                setUserName(
                    data.name
                );

            }

        };

        getUser();

    }, [router]);

    const handleLogout =
        async () => {

            await supabase.auth.signOut();

            router.push(
                "/mobile_login"
            );

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
            font-family:Inter,sans-serif;
        }

        @keyframes fadeUp{

            from{
                opacity:0;
                transform:
                    translateY(20px);
            }

            to{
                opacity:1;
                transform:
                    translateY(0px);
            }

        }

        @keyframes pulse{

            0%{
                transform:scale(1);
            }

            50%{
                transform:scale(1.04);
            }

            100%{
                transform:scale(1);
            }

        }

        `}
            </style>

            <div
                style={{
                    ...styles.page,
                    background:
                        darkMode
                            ? "#020617"
                            : "#f8fafc",
                }}
            >

                {/* GLOW */}
                <div
                    style={{
                        ...styles.glow1,
                        opacity:
                            darkMode
                                ? 1
                                : 0.4,
                    }}
                />

                <div
                    style={{
                        ...styles.glow2,
                        opacity:
                            darkMode
                                ? 1
                                : 0.4,
                    }}
                />

                {/* HEADER */}
                <div style={styles.header}>

                    <div
                        style={
                            styles.logoWrap
                        }
                    >

                        <div
                            style={
                                styles.logo
                            }
                        >
                            BC
                        </div>

                        <div>

                            <h2
                                style={{
                                    ...styles.brand,
                                    color:
                                        darkMode
                                            ? "white"
                                            : "#0f172a",
                                }}
                            >
                                BuildChat
                            </h2>

                            <p
                                style={{
                                    ...styles.subBrand,
                                    color:
                                        darkMode
                                            ? "#94a3b8"
                                            : "#64748b",
                                }}
                            >
                                Mobile Dashboard
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={() =>
                            setDarkMode(
                                !darkMode
                            )
                        }
                        style={{
                            ...styles.themeBtn,
                            background:
                                darkMode
                                    ? "rgba(255,255,255,0.08)"
                                    : "white",
                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a",
                        }}
                    >
                        {darkMode
                            ? "☀️"
                            : "🌙"}
                    </button>

                </div>

                {/* HERO */}
                <div
                    style={{
                        ...styles.heroCard,
                        background:
                            darkMode
                                ? "rgba(255,255,255,0.06)"
                                : "white",
                    }}
                >

                    <p
                        style={{
                            ...styles.heroSmall,
                            color:
                                darkMode
                                    ? "#94a3b8"
                                    : "#64748b",
                        }}
                    >
                        Welcome back 👋
                    </p>

                    <h1
                        style={{
                            ...styles.heroTitle,
                            color:
                                darkMode
                                    ? "white"
                                    : "#0f172a",
                        }}
                    >
                        {userName}
                    </h1>

                    <p
                        style={{
                            ...styles.heroText,
                            color:
                                darkMode
                                    ? "#cbd5e1"
                                    : "#475569",
                        }}
                    >
                        Manage your AI
                        chatbots and
                        automate customer
                        conversations.
                    </p>

                    <button
                        style={
                            styles.createBtn
                        }
                    >
                        + Create Chatbot
                    </button>

                </div>

                {/* STATS */}
                <div style={styles.statsGrid}>

                    <div
                        style={{
                            ...styles.statCard,
                            background:
                                darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "white",
                        }}
                    >

                        <h3
                            style={
                                styles.statNum
                            }
                        >
                            12
                        </h3>

                        <p
                            style={{
                                ...styles.statText,
                                color:
                                    darkMode
                                        ? "#94a3b8"
                                        : "#64748b",
                            }}
                        >
                            Chatbots
                        </p>

                    </div>

                    <div
                        style={{
                            ...styles.statCard,
                            background:
                                darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "white",
                        }}
                    >

                        <h3
                            style={
                                styles.statNum
                            }
                        >
                            2.4k
                        </h3>

                        <p
                            style={{
                                ...styles.statText,
                                color:
                                    darkMode
                                        ? "#94a3b8"
                                        : "#64748b",
                            }}
                        >
                            Messages
                        </p>

                    </div>

                </div>

                {/* CHATBOT CARD */}
                <div
                    style={{
                        ...styles.botCard,
                        background:
                            darkMode
                                ? "rgba(255,255,255,0.05)"
                                : "white",
                    }}
                >

                    <div
                        style={
                            styles.botTop
                        }
                    >

                        <div
                            style={
                                styles.botLogo
                            }
                        >
                            🤖
                        </div>

                        <div>

                            <h3
                                style={{
                                    ...styles.botName,
                                    color:
                                        darkMode
                                            ? "white"
                                            : "#0f172a",
                                }}
                            >
                                Support AI
                            </h3>

                            <p
                                style={{
                                    ...styles.botStatus,
                                    color:
                                        darkMode
                                            ? "#94a3b8"
                                            : "#64748b",
                                }}
                            >
                                Active chatbot
                            </p>

                        </div>

                    </div>

                    <div
                        style={
                            styles.progressWrap
                        }
                    >

                        <div
                            style={
                                styles.progressBar
                            }
                        />

                    </div>

                    <button
                        style={
                            styles.manageBtn
                        }
                    >
                        Manage Chatbot
                    </button>

                </div>

                {/* LOGOUT */}
                <button
                    onClick={
                        handleLogout
                    }
                    style={
                        styles.logoutBtn
                    }
                >
                    Logout
                </button>

            </div>
        </>
    );
}

const styles: any = {

    page: {
        minHeight: "100vh",
        padding:
            "24px 20px 40px",
        overflowX: "hidden",
        position: "relative",
    },

    glow1: {
        position: "absolute",
        width: "280px",
        height: "280px",
        borderRadius: "50%",
        background:
            "rgba(124,58,237,0.28)",
        filter: "blur(120px)",
        top: "-120px",
        left: "-120px",
    },

    glow2: {
        position: "absolute",
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        background:
            "rgba(6,182,212,0.25)",
        filter: "blur(120px)",
        bottom: "-100px",
        right: "-100px",
    },

    header: {
        position: "relative",
        zIndex: 2,
        display: "flex",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginBottom: "34px",
        animation:
            "fadeUp .8s ease",
    },

    logoWrap: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
    },

    logo: {
        width: "56px",
        height: "56px",
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

    brand: {
        margin: 0,
        fontSize: "22px",
        fontWeight: 800,
    },

    subBrand: {
        margin: 0,
        fontSize: "13px",
    },

    themeBtn: {
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
    },

    heroCard: {
        position: "relative",
        zIndex: 2,
        borderRadius: "30px",
        padding: "28px",
        marginBottom: "24px",
        backdropFilter:
            "blur(30px)",
        animation:
            "fadeUp 1s ease",
        boxShadow:
            "0 20px 60px rgba(0,0,0,0.12)",
    },

    heroSmall: {
        margin: 0,
        marginBottom: "8px",
        fontSize: "14px",
    },

    heroTitle: {
        margin: 0,
        fontSize: "40px",
        fontWeight: 900,
        letterSpacing: "-2px",
    },

    heroText: {
        marginTop: "14px",
        lineHeight: 1.7,
        fontSize: "15px",
        maxWidth: "260px",
    },

    createBtn: {
        marginTop: "24px",
        border: "none",
        padding:
            "16px 22px",
        borderRadius: "18px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        fontWeight: 800,
        cursor: "pointer",
        boxShadow:
            "0 20px 40px rgba(124,58,237,0.35)",
    },

    statsGrid: {
        display: "grid",
        gridTemplateColumns:
            "1fr 1fr",
        gap: "16px",
        marginBottom: "24px",
        position: "relative",
        zIndex: 2,
    },

    statCard: {
        borderRadius: "24px",
        padding: "24px",
        animation:
            "fadeUp 1.2s ease",
    },

    statNum: {
        margin: 0,
        color: "white",
        fontSize: "30px",
        fontWeight: 900,
    },

    statText: {
        marginTop: "8px",
        fontSize: "14px",
    },

    botCard: {
        position: "relative",
        zIndex: 2,
        borderRadius: "28px",
        padding: "24px",
        marginBottom: "24px",
        animation:
            "fadeUp 1.4s ease",
    },

    botTop: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "20px",
    },

    botLogo: {
        width: "54px",
        height: "54px",
        borderRadius: "18px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
    },

    botName: {
        margin: 0,
        fontSize: "18px",
        fontWeight: 800,
    },

    botStatus: {
        margin: 0,
        marginTop: "4px",
        fontSize: "13px",
    },

    progressWrap: {
        width: "100%",
        height: "10px",
        borderRadius: "999px",
        background:
            "rgba(255,255,255,0.06)",
        overflow: "hidden",
        marginBottom: "20px",
    },

    progressBar: {
        width: "75%",
        height: "100%",
        borderRadius: "999px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        animation:
            "pulse 3s infinite",
    },

    manageBtn: {
        width: "100%",
        border: "none",
        padding: "16px",
        borderRadius: "18px",
        background:
            "rgba(124,58,237,0.14)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
    },

    logoutBtn: {
        width: "100%",
        padding: "18px",
        borderRadius: "20px",
        border: "none",
        background:
            "linear-gradient(135deg,#ef4444,#f97316)",
        color: "white",
        fontWeight: 800,
        fontSize: "15px",
        cursor: "pointer",
        position: "relative",
        zIndex: 2,
    },

};