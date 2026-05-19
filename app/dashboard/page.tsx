"use client";

import {
    useEffect,
    useState,
} from "react";

import { supabase } from "@/lib/supabaseClient";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    const [darkMode, setDarkMode] =
        useState(true);

    const [loading, setLoading] =
        useState(true);

    const [activeTab, setActiveTab] =
        useState("Dashboard");

    const [user, setUser] =
        useState<any>(null);

    const [userName, setUserName] =
        useState("User");

    const [chatbots, setChatbots] =
        useState<any[]>([]);

    const [search, setSearch] =
        useState("");

    const [totalResponses, setTotalResponses] =
        useState(0);

    const [savingProfile, setSavingProfile] =
        useState(false);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        setUser(user);

        // PROFILE
        const { data: profile } =
            await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

        if (profile) {
            setUserName(profile.name);
        }

        // CHATBOTS
        const { data: bots } =
            await supabase
                .from("chatbots")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", {
                    ascending: false,
                });

        if (bots) {
            setChatbots(bots);

            // COUNT AI RESPONSES
            const ids = bots.map(
                (b) => b.id
            );

            if (ids.length > 0) {
                const { count } =
                    await supabase
                        .from("chatbot_data")
                        .select("*", {
                            count: "exact",
                            head: true,
                        })
                        .in(
                            "chatbot_id",
                            ids
                        );

                setTotalResponses(
                    count || 0
                );
            }
        }

        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();

        router.push("/login");
    };

    const updateProfile =
        async () => {
            if (!user) return;

            setSavingProfile(true);

            await supabase
                .from("profiles")
                .update({
                    name: userName,
                })
                .eq("id", user.id);

            setSavingProfile(false);

            alert("Profile updated!");
        };

    const filteredBots =
        chatbots.filter((bot) =>
            bot.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <div
            style={{
                ...styles.page,
                background: darkMode
                    ? "#050816"
                    : "#f3f7fc",
            }}
        >
            {/* GLOW */}
            <div style={styles.glow1} />
            <div style={styles.glow2} />

            {/* SIDEBAR */}
            <div
                style={{
                    ...styles.sidebar,
                    background: darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.85)",
                }}
            >
                {/* LOGO */}
                <div>
                    <div style={styles.logoRow}>
                        <div style={styles.logo}>
                            LOGO
                        </div>

                        <div>
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

                            <p
                                style={{
                                    color: darkMode
                                        ? "#94a3b8"
                                        : "#64748b",
                                    fontSize: "14px",
                                }}
                            >
                                AI Workspace
                            </p>
                        </div>
                    </div>

                    {/* MENU */}
                    <div style={styles.menu}>
                        {[
                            "Dashboard",
                            "Chatbots",
                            "Profile",
                            "Settings",
                        ].map((item) => (
                            <button
                                key={item}
                                onClick={() =>
                                    setActiveTab(item)
                                }
                                style={{
                                    ...styles.menuBtn,
                                    background:
                                        activeTab === item
                                            ? "linear-gradient(135deg,#7c3aed,#06b6d4)"
                                            : "transparent",
                                    color:
                                        activeTab === item
                                            ? "white"
                                            : darkMode
                                                ? "#cbd5e1"
                                                : "#334155",
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* BOTTOM */}
                <div>
                    <div
                        style={{
                            ...styles.profileCard,
                            background: darkMode
                                ? "rgba(255,255,255,0.05)"
                                : "white",
                        }}
                    >
                        <div style={styles.avatar}>
                            {userName.charAt(0)}
                        </div>

                        <div>
                            <h3
                                style={{
                                    color: darkMode
                                        ? "white"
                                        : "#0f172a",
                                }}
                            >
                                {userName}
                            </h3>

                            <p
                                style={{
                                    color: darkMode
                                        ? "#94a3b8"
                                        : "#64748b",
                                }}
                            >
                                AI Creator
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            setDarkMode(!darkMode)
                        }
                        style={styles.darkBtn}
                    >
                        {darkMode
                            ? "☀️ Light Mode"
                            : "🌙 Dark Mode"}
                    </button>

                    <button
                        onClick={handleLogout}
                        style={styles.logoutBtn}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* MAIN */}
            <div style={styles.main}>
                {/* DASHBOARD */}
                {activeTab ===
                    "Dashboard" && (
                        <>
                            <div style={styles.topbar}>
                                <div>
                                    <h1
                                        style={{
                                            ...styles.heading,
                                            color: darkMode
                                                ? "white"
                                                : "#0f172a",
                                        }}
                                    >
                                        Welcome back,
                                        {" "}
                                        {userName} 👋
                                    </h1>

                                    <p
                                        style={{
                                            color: darkMode
                                                ? "#94a3b8"
                                                : "#64748b",
                                        }}
                                    >
                                        Build and manage
                                        your AI chatbots.
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        router.push(
                                            "/chatbot/create"
                                        )
                                    }
                                    style={styles.createBtn}
                                >
                                    + Create Chatbot
                                </button>
                            </div>

                            {/* STATS */}
                            <div
                                style={styles.statsGrid}
                            >
                                <StatCard
                                    darkMode={
                                        darkMode
                                    }
                                    title="Total Chatbots"
                                    value={
                                        chatbots.length
                                    }
                                />

                                <StatCard
                                    darkMode={
                                        darkMode
                                    }
                                    title="AI Responses"
                                    value={
                                        totalResponses
                                    }
                                />

                                <StatCard
                                    darkMode={
                                        darkMode
                                    }
                                    title="Active Projects"
                                    value={
                                        chatbots.length
                                    }
                                />
                            </div>

                            {/* SEARCH */}
                            <input
                                placeholder="Search chatbot..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                style={{
                                    ...styles.search,
                                    background: darkMode
                                        ? "rgba(255,255,255,0.06)"
                                        : "white",
                                    color: darkMode
                                        ? "white"
                                        : "#0f172a",
                                }}
                            />

                            {/* CHATBOTS */}
                            <div
                                style={styles.botGrid}
                            >
                                {loading ? (
                                    <p>Loading...</p>
                                ) : filteredBots.length ===
                                    0 ? (
                                    <div
                                        style={{
                                            color: darkMode
                                                ? "white"
                                                : "#0f172a",
                                        }}
                                    >
                                        No chatbots found.
                                    </div>
                                ) : (
                                    filteredBots.map(
                                        (bot) => (
                                            <div
                                                key={bot.id}
                                                onClick={() =>
                                                    router.push(
                                                        `/chatbot/${bot.id}`
                                                    )
                                                }
                                                style={{
                                                    ...styles.botCard,
                                                    background:
                                                        darkMode
                                                            ? "rgba(255,255,255,0.06)"
                                                            : "white",
                                                }}
                                            >
                                                <div
                                                    style={
                                                        styles.botIcon
                                                    }
                                                >
                                                    🤖
                                                </div>

                                                <h3
                                                    style={{
                                                        color:
                                                            darkMode
                                                                ? "white"
                                                                : "#0f172a",
                                                    }}
                                                >
                                                    {bot.name}
                                                </h3>

                                                <p
                                                    style={{
                                                        color:
                                                            darkMode
                                                                ? "#94a3b8"
                                                                : "#64748b",
                                                    }}
                                                >
                                                    AI Assistant
                                                </p>

                                                <p
                                                    style={{
                                                        marginTop:
                                                            "16px",
                                                        fontSize:
                                                            "14px",
                                                        color:
                                                            darkMode
                                                                ? "#94a3b8"
                                                                : "#64748b",
                                                    }}
                                                >
                                                    {new Date(
                                                        bot.created_at
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </>
                    )}

                {/* PROFILE */}
                {activeTab ===
                    "Profile" && (
                        <div
                            style={{
                                ...styles.sectionCard,
                                background: darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "white",
                            }}
                        >
                            <h2
                                style={{
                                    color: darkMode
                                        ? "white"
                                        : "#0f172a",
                                }}
                            >
                                Profile Settings
                            </h2>

                            <input
                                value={userName}
                                onChange={(e) =>
                                    setUserName(
                                        e.target.value
                                    )
                                }
                                placeholder="Your Name"
                                style={styles.input}
                            />

                            <input
                                value={
                                    user?.email || ""
                                }
                                disabled
                                style={{
                                    ...styles.input,
                                    opacity: 0.7,
                                }}
                            />

                            <button
                                onClick={
                                    updateProfile
                                }
                                style={styles.saveBtn}
                            >
                                {savingProfile
                                    ? "Saving..."
                                    : "Save Profile"}
                            </button>
                        </div>
                    )}

                {/* SETTINGS */}
                {activeTab ===
                    "Settings" && (
                        <div
                            style={{
                                ...styles.sectionCard,
                                background: darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "white",
                            }}
                        >
                            <h2
                                style={{
                                    color: darkMode
                                        ? "white"
                                        : "#0f172a",
                                }}
                            >
                                App Settings
                            </h2>

                            <div
                                style={{
                                    marginTop: "20px",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        setDarkMode(
                                            !darkMode
                                        )
                                    }
                                    style={
                                        styles.saveBtn
                                    }
                                >
                                    Toggle Theme
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    darkMode,
}: any) {
    return (
        <div
            style={{
                ...styles.statCard,
                background: darkMode
                    ? "rgba(255,255,255,0.06)"
                    : "white",
            }}
        >
            <p
                style={{
                    color: darkMode
                        ? "#94a3b8"
                        : "#64748b",
                }}
            >
                {title}
            </p>

            <h2
                style={{
                    color: darkMode
                        ? "white"
                        : "#0f172a",
                }}
            >
                {value}
            </h2>
        </div>
    );
}

const styles: any = {
    page: {
        minHeight: "100vh",
        display: "flex",
        fontFamily:
            "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
    },

    glow1: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(124,58,237,0.25)",
        filter: "blur(140px)",
        top: "-200px",
        left: "-200px",
        borderRadius: "50%",
    },

    glow2: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(6,182,212,0.22)",
        filter: "blur(140px)",
        bottom: "-200px",
        right: "-200px",
        borderRadius: "50%",
    },

    sidebar: {
        width: "290px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        justifyContent:
            "space-between",
        backdropFilter: "blur(20px)",
        zIndex: 2,
    },

    logoRow: {
        display: "flex",
        gap: "14px",
        alignItems: "center",
        marginBottom: "40px",
    },

    logo: {
        width: "60px",
        height: "60px",
        borderRadius: "20px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: 700,
    },

    brand: {
        fontSize: "28px",
        fontWeight: 800,
        margin: 0,
    },

    menu: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },

    menuBtn: {
        padding: "16px",
        borderRadius: "16px",
        border: "none",
        cursor: "pointer",
        fontWeight: 700,
        textAlign: "left",
    },

    profileCard: {
        padding: "18px",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "14px",
    },

    avatar: {
        width: "52px",
        height: "52px",
        borderRadius: "16px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "20px",
    },

    darkBtn: {
        width: "100%",
        padding: "14px",
        borderRadius: "14px",
        border: "none",
        marginBottom: "12px",
        cursor: "pointer",
        fontWeight: 700,
    },

    logoutBtn: {
        width: "100%",
        padding: "14px",
        borderRadius: "14px",
        border: "none",
        background:
            "linear-gradient(135deg,#ef4444,#f97316)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
    },

    main: {
        flex: 1,
        padding: "40px",
        overflowY: "auto",
        zIndex: 2,
    },

    topbar: {
        display: "flex",
        justifyContent:
            "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "30px",
    },

    heading: {
        fontSize: "48px",
        fontWeight: 800,
        marginBottom: "10px",
    },

    createBtn: {
        padding: "16px 22px",
        borderRadius: "16px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
    },

    statsGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "24px",
    },

    statCard: {
        padding: "24px",
        borderRadius: "24px",
    },

    search: {
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border: "none",
        outline: "none",
        marginBottom: "24px",
    },

    botGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
        gap: "20px",
    },

    botCard: {
        padding: "22px",
        borderRadius: "24px",
        cursor: "pointer",
    },

    botIcon: {
        width: "58px",
        height: "58px",
        borderRadius: "18px",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        marginBottom: "18px",
    },

    sectionCard: {
        padding: "30px",
        borderRadius: "30px",
        maxWidth: "600px",
    },

    input: {
        width: "100%",
        padding: "18px",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        marginTop: "18px",
        fontSize: "15px",
    },

    saveBtn: {
        marginTop: "22px",
        padding: "16px 22px",
        borderRadius: "16px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
    },
};