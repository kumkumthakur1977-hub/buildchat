"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [darkMode, setDarkMode] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

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

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);

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
      setUserName(
        profile.name || "User"
      );
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

      const ids = bots.map(
        (bot) => bot.id
      );

      if (ids.length > 0) {
        const { count } =
          await supabase
            .from("chatbot_data")
            .select("*", {
              count: "exact",
              head: true,
            })
            .in("chatbot_id", ids);

        setTotalResponses(
          count || 0
        );
      }
    }

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();

    router.push("/login");
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
          0%{
            transform:translateY(0px);
          }
          50%{
            transform:translateY(-18px);
          }
          100%{
            transform:translateY(0px);
          }
        }

        @keyframes pulse {
          0%{
            transform:scale(1);
            opacity:0.5;
          }

          50%{
            transform:scale(1.08);
            opacity:1;
          }

          100%{
            transform:scale(1);
            opacity:0.5;
          }
        }

        @keyframes slideUp {
          from{
            opacity:0;
            transform:translateY(30px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes rotateGlow {
          0%{
            transform:rotate(0deg);
          }

          100%{
            transform:rotate(360deg);
          }
        }

        @keyframes shine {
          0%{
            background-position:-300px;
          }

          100%{
            background-position:300px;
          }
        }

        @keyframes borderGlow {
          0%{
            box-shadow:0 0 0px rgba(124,58,237,0.3);
          }

          50%{
            box-shadow:0 0 40px rgba(124,58,237,0.4);
          }

          100%{
            box-shadow:0 0 0px rgba(124,58,237,0.3);
          }
        }

        .glass-hover:hover{
          transform:translateY(-8px) scale(1.02);
          border:1px solid rgba(255,255,255,0.15);
        }

        .sidebar-btn:hover{
          transform:translateX(8px);
          background:rgba(255,255,255,0.08);
        }

        .bot-hover:hover{
          transform:translateY(-12px) scale(1.02);
        }

        .create-hover:hover{
          transform:scale(1.04);
        }

        .graph-bar:hover{
          opacity:0.8;
          transform:scaleY(1.06);
        }

        `}
      </style>

      <div
        style={{
          ...styles.page,
          background: darkMode
            ? "#020617"
            : "#edf2ff",
        }}
      >
        {/* GLOW BACKGROUND */}
        <div style={styles.glow1} />
        <div style={styles.glow2} />
        <div style={styles.glow3} />

        {/* SIDEBAR */}
        <div
          style={{
            ...styles.sidebar,
            background: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.75)",
          }}
        >
          <div>
            {/* LOGO */}
            <div style={styles.logoRow}>
              <div style={styles.logo}>
                BC
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
                    marginTop: "4px",
                  }}
                >
                  Next Gen AI Workspace
                </p>
              </div>
            </div>

            {/* MENU */}
            <div style={styles.menu}>
              <button
                className="sidebar-btn"
                style={{
                  ...styles.menuBtn,
                  background:
                    "linear-gradient(135deg,#7c3aed,#06b6d4)",
                }}
              >
                🏠 Dashboard
              </button>

              <button
                className="sidebar-btn"
                style={{
                  ...styles.menuBtn,
                  color: darkMode
                    ? "#cbd5e1"
                    : "#334155",
                }}
                onClick={() =>
                  router.push(
                    "/chatbot/create"
                  )
                }
              >
                🤖 Create Chatbot
              </button>

              <button
                className="sidebar-btn"
                style={{
                  ...styles.menuBtn,
                  color: darkMode
                    ? "#cbd5e1"
                    : "#334155",
                }}
                onClick={() =>
                  router.push(
                    "/profile"
                  )
                }
              >
                👤 Profile
              </button>

              <button
                className="sidebar-btn"
                style={{
                  ...styles.menuBtn,
                  color: darkMode
                    ? "#cbd5e1"
                    : "#334155",
                }}
              >
                ⚙️ Settings
              </button>
            </div>
          </div>

          {/* PROFILE */}
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
                {userName
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              <div>
                <h3
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  {userName}
                </h3>

                <p
                  style={{
                    color: darkMode
                      ? "#94a3b8"
                      : "#64748b",
                    fontSize: "13px",
                  }}
                >
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              style={styles.themeBtn}
            >
              {darkMode
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"}
            </button>

            <button
              onClick={logout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div style={styles.main}>
          {/* TOP */}
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
                <br />
                {userName} 👋
              </h1>

              <p
                style={{
                  color: darkMode
                    ? "#94a3b8"
                    : "#64748b",
                  marginTop: "14px",
                  fontSize: "17px",
                }}
              >
                Build futuristic AI
                chatbots and manage
                everything from one
                place.
              </p>
            </div>

            <button
              className="create-hover"
              onClick={() =>
                router.push(
                  "/chatbot/create"
                )
              }
              style={styles.createBtn}
            >
              + Create AI Chatbot
            </button>
          </div>

          {/* STATS */}
          <div style={styles.statsGrid}>
            <StatCard
              title="Chatbots"
              value={chatbots.length}
              icon="🤖"
              darkMode={darkMode}
            />

            <StatCard
              title="AI Responses"
              value={totalResponses}
              icon="💬"
              darkMode={darkMode}
            />

            <StatCard
              title="Analytics"
              value="98%"
              icon="📊"
              darkMode={darkMode}
            />

            <StatCard
              title="Status"
              value="Active"
              icon="⚡"
              darkMode={darkMode}
            />
          </div>

          {/* GRAPH + AI PANEL */}
          <div style={styles.grid2}>
            {/* GRAPH */}
            <div
              className="glass-hover"
              style={{
                ...styles.graphCard,
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom: "26px",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: darkMode
                        ? "white"
                        : "#0f172a",
                      fontSize: "30px",
                      marginBottom: "8px",
                    }}
                  >
                    AI Analytics
                  </h2>

                  <p
                    style={{
                      color: darkMode
                        ? "#94a3b8"
                        : "#64748b",
                    }}
                  >
                    Weekly chatbot
                    growth
                  </p>
                </div>

                <div style={styles.analyticsIcon}>
                  📈
                </div>
              </div>

              <div style={styles.graph}>
                {[50, 90, 70, 150, 110, 180, 140].map(
                  (
                    height,
                    index
                  ) => (
                    <div
                      key={index}
                      className="graph-bar"
                      style={{
                        ...styles.bar,
                        height: `${height}px`,
                        animation:
                          "float 5s ease-in-out infinite",
                        animationDelay: `${index * 0.2}s`,
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* AI CARD */}
            <div
              className="glass-hover"
              style={{
                ...styles.aiCard,
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "white",
              }}
            >
              <div style={styles.aiOrb}>
                ✨
              </div>

              <h2
                style={{
                  color: darkMode
                    ? "white"
                    : "#0f172a",
                  fontSize: "30px",
                  marginBottom: "14px",
                }}
              >
                AI Engine
              </h2>

              <p
                style={{
                  color: darkMode
                    ? "#94a3b8"
                    : "#64748b",
                  lineHeight: 1.8,
                }}
              >
                Your workspace is
                optimized and ready
                for AI chatbot
                training.
              </p>

              <div style={styles.aiProgress}>
                <div
                  style={
                    styles.aiProgressFill
                  }
                />
              </div>

              <div
                style={{
                  marginTop: "14px",
                  color: "#22c55e",
                  fontWeight: 700,
                }}
              >
                System Performance:
                98%
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div
            style={{
              marginTop: "34px",
              marginBottom: "28px",
            }}
          >
            <input
              placeholder="Search your chatbot..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={{
                ...styles.search,
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "white",
                color: darkMode
                  ? "white"
                  : "#0f172a",
              }}
            />
          </div>

          {/* CHATBOT GRID */}
          <div style={styles.botGrid}>
            {loading ? (
              <div
                style={{
                  color: darkMode
                    ? "white"
                    : "#0f172a",
                }}
              >
                Loading...
              </div>
            ) : filteredBots.length ===
              0 ? (
              <div
                style={{
                  ...styles.emptyCard,
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
                    marginBottom: "10px",
                  }}
                >
                  No Chatbots Yet
                </h2>

                <p
                  style={{
                    color: darkMode
                      ? "#94a3b8"
                      : "#64748b",
                  }}
                >
                  Create your first AI
                  chatbot now.
                </p>
              </div>
            ) : (
              filteredBots.map(
                (bot, index) => (
                  <div
                    key={bot.id}
                    className="bot-hover"
                    onClick={() =>
                      router.push(
                        `/chatbot/${bot.id}`
                      )
                    }
                    style={{
                      ...styles.botCard,
                      background:
                        darkMode
                          ? "rgba(255,255,255,0.05)"
                          : "white",
                      animation:
                        "slideUp 0.6s ease",
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div
                      style={
                        styles.botTop
                      }
                    >
                      <div
                        style={
                          styles.botIcon
                        }
                      >
                        🤖
                      </div>

                      <div
                        style={
                          styles.activeDot
                        }
                      />
                    </div>

                    <h2
                      style={{
                        color: darkMode
                          ? "white"
                          : "#0f172a",
                        marginBottom:
                          "12px",
                        fontSize: "25px",
                      }}
                    >
                      {bot.name}
                    </h2>

                    <p
                      style={{
                        color: darkMode
                          ? "#94a3b8"
                          : "#64748b",
                        lineHeight: 1.8,
                      }}
                    >
                      AI assistant ready
                      for conversations
                      and advanced
                      training.
                    </p>

                    <div
                      style={{
                        marginTop: "24px",
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                      }}
                    >
                      <span
                        style={{
                          color:
                            "#22c55e",
                          fontWeight: 700,
                        }}
                      >
                        ● Active
                      </span>

                      <span
                        style={{
                          color:
                            darkMode
                              ? "#94a3b8"
                              : "#64748b",
                          fontSize:
                            "13px",
                        }}
                      >
                        {new Date(
                          bot.created_at
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  title,
  value,
  icon,
  darkMode,
}: any) {
  return (
    <div
      className="glass-hover"
      style={{
        ...styles.statCard,
        background: darkMode
          ? "rgba(255,255,255,0.05)"
          : "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <p
            style={{
              color: darkMode
                ? "#94a3b8"
                : "#64748b",
              marginBottom: "8px",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              color: darkMode
                ? "white"
                : "#0f172a",
              fontSize: "38px",
              fontWeight: 800,
            }}
          >
            {value}
          </h2>
        </div>

        <div style={styles.statIcon}>
          {icon}
        </div>
      </div>

      <div style={styles.statLine}>
        <div style={styles.statFill} />
      </div>
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
    width: "550px",
    height: "550px",
    background:
      "rgba(124,58,237,0.25)",
    borderRadius: "50%",
    filter: "blur(160px)",
    top: "-220px",
    left: "-220px",
    animation:
      "pulse 8s ease infinite",
  },

  glow2: {
    position: "absolute",
    width: "550px",
    height: "550px",
    background:
      "rgba(6,182,212,0.2)",
    borderRadius: "50%",
    filter: "blur(160px)",
    bottom: "-220px",
    right: "-220px",
    animation:
      "pulse 8s ease infinite",
  },

  glow3: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background:
      "rgba(236,72,153,0.15)",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "40%",
    left: "40%",
  },

  sidebar: {
    width: "320px",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent:
      "space-between",
    backdropFilter: "blur(30px)",
    borderRight:
      "1px solid rgba(255,255,255,0.08)",
    zIndex: 2,
  },

  logoRow: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginBottom: "50px",
  },

  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: 900,
    fontSize: "22px",
    animation:
      "borderGlow 5s infinite",
  },

  brand: {
    fontSize: "34px",
    fontWeight: 900,
    margin: 0,
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  menuBtn: {
    padding: "18px",
    borderRadius: "18px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    fontWeight: 700,
    cursor: "pointer",
    transition: "0.3s",
    fontSize: "15px",
  },

  profileCard: {
    padding: "18px",
    borderRadius: "24px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
    marginBottom: "18px",
  },

  avatar: {
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
    fontSize: "24px",
  },

  themeBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: "12px",
  },

  logoutBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    color: "white",
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
    marginBottom: "34px",
    gap: "20px",
    flexWrap: "wrap",
  },

  heading: {
    fontSize: "60px",
    fontWeight: 900,
    lineHeight: 1,
  },

  createBtn: {
    padding: "20px 28px",
    borderRadius: "22px",
    border: "none",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "16px",
    boxShadow:
      "0 20px 40px rgba(124,58,237,0.35)",
    transition: "0.3s",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px",
    marginBottom: "26px",
  },

  statCard: {
    padding: "26px",
    borderRadius: "30px",
    backdropFilter: "blur(20px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    transition: "0.3s",
  },

  statIcon: {
    width: "62px",
    height: "62px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
  },

  statLine: {
    width: "100%",
    height: "8px",
    background:
      "rgba(255,255,255,0.06)",
    borderRadius: "999px",
    overflow: "hidden",
  },

  statFill: {
    width: "80%",
    height: "100%",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg,#7c3aed,#06b6d4)",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr",
    gap: "22px",
  },

  graphCard: {
    padding: "30px",
    borderRadius: "30px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    transition: "0.3s",
  },

  graph: {
    height: "240px",
    display: "flex",
    alignItems: "flex-end",
    gap: "18px",
  },

  bar: {
    flex: 1,
    borderRadius: "20px 20px 0 0",
    background:
      "linear-gradient(180deg,#7c3aed,#06b6d4)",
    boxShadow:
      "0 20px 30px rgba(124,58,237,0.35)",
    transition: "0.3s",
  },

  analyticsIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    color: "white",
  },

  aiCard: {
    padding: "30px",
    borderRadius: "30px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    transition: "0.3s",
  },

  aiOrb: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4,#ec4899)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "38px",
    color: "white",
    marginBottom: "26px",
    animation:
      "float 5s ease infinite",
  },

  aiProgress: {
    width: "100%",
    height: "12px",
    background:
      "rgba(255,255,255,0.06)",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "28px",
  },

  aiProgressFill: {
    width: "98%",
    height: "100%",
    background:
      "linear-gradient(90deg,#7c3aed,#06b6d4,#ec4899)",
    borderRadius: "999px",
  },

  search: {
    width: "100%",
    padding: "22px",
    borderRadius: "24px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    fontSize: "16px",
    backdropFilter: "blur(20px)",
  },

  botGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "22px",
  },

  botCard: {
    padding: "28px",
    borderRadius: "32px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    transition: "0.3s",
    cursor: "pointer",
  },

  botTop: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  botIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    color: "white",
    boxShadow:
      "0 20px 40px rgba(124,58,237,0.35)",
  },

  activeDot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow:
      "0 0 20px #22c55e",
  },

  emptyCard: {
    padding: "40px",
    borderRadius: "30px",
    textAlign: "center",
  },
};