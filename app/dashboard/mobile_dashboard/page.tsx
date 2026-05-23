"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function MobileDashboardPage() {
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
      router.push("/mobile_login");
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

    router.push("/mobile_login");
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
          padding:0;
        }

        @keyframes fadeUp{
          from{
            opacity:0;
            transform:translateY(20px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes pulse{
          0%{
            transform:scale(1);
          }

          50%{
            transform:scale(1.05);
          }

          100%{
            transform:scale(1);
          }
        }

        .card-hover:active{
          transform:scale(0.98);
        }

        `}
      </style>

      <div
        style={{
          ...styles.page,
          background: darkMode
            ? "#030712"
            : "#eef2ff",
        }}
      >
        {/* GLOW */}
        <div style={styles.glow1} />
        <div style={styles.glow2} />

        {/* TOP BAR */}
        <div
          style={{
            ...styles.topBar,
            background: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.7)",
          }}
        >
          <div
            style={styles.logoWrap}
          >
            <div style={styles.logo}>
              BC
            </div>

            <div>
              <h2
                style={{
                  ...styles.brand,
                  color: darkMode
                    ? "white"
                    : "#0f172a",
                }}
              >
                BuildChat
              </h2>

              <p
                style={{
                  color: darkMode
                    ? "#94a3b8"
                    : "#64748b",
                  fontSize: "12px",
                  marginTop: "2px",
                }}
              >
                AI Workspace
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            style={{
              ...styles.themeBtn,
              background: darkMode
                ? "rgba(255,255,255,0.08)"
                : "white",
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
            ...styles.hero,
            animation:
              "fadeUp 0.5s ease",
          }}
        >
          <h1
            style={{
              ...styles.heading,
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          >
            Welcome back 👋
          </h1>

          <p
            style={{
              ...styles.subHeading,
              color: darkMode
                ? "#94a3b8"
                : "#64748b",
            }}
          >
            {userName}
          </p>

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
                  margin: 0,
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
                  marginTop: "4px",
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>
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
            title="Responses"
            value={totalResponses}
            icon="💬"
            darkMode={darkMode}
          />

          <StatCard
            title="Status"
            value="Active"
            icon="⚡"
            darkMode={darkMode}
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
              ? "rgba(255,255,255,0.05)"
              : "white",
            color: darkMode
              ? "white"
              : "#0f172a",
          }}
        />

        {/* CREATE BUTTON */}
        <button
          onClick={() =>
            router.push(
              "/chatbot/create"
            )
          }
          style={styles.createBtn}
        >
          + Create AI Chatbot
        </button>

        {/* CHATBOTS */}
        <div
          style={{
            marginTop: "22px",
          }}
        >
          <h2
            style={{
              color: darkMode
                ? "white"
                : "#0f172a",
              marginBottom: "16px",
            }}
          >
            Your Chatbots
          </h2>

          {loading ? (
            <p
              style={{
                color: darkMode
                  ? "white"
                  : "#0f172a",
              }}
            >
              Loading...
            </p>
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
              <div
                style={{
                  fontSize: "50px",
                  marginBottom: "12px",
                }}
              >
                🤖
              </div>

              <h3
                style={{
                  color: darkMode
                    ? "white"
                    : "#0f172a",
                }}
              >
                No Chatbots Yet
              </h3>

              <p
                style={{
                  color: darkMode
                    ? "#94a3b8"
                    : "#64748b",
                }}
              >
                Create your first
                AI chatbot.
              </p>
            </div>
          ) : (
            filteredBots.map(
              (bot, index) => (
                <div
                  key={bot.id}
                  className="card-hover"
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
                      "fadeUp 0.5s ease",
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

                  <h3
                    style={{
                      color: darkMode
                        ? "white"
                        : "#0f172a",
                      marginBottom:
                        "10px",
                    }}
                  >
                    {bot.name}
                  </h3>

                  <p
                    style={{
                      color: darkMode
                        ? "#94a3b8"
                        : "#64748b",
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    AI assistant
                    ready for
                    conversations.
                  </p>

                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      justifyContent:
                        "space-between",
                    }}
                  >
                    <span
                      style={{
                        color:
                          "#22c55e",
                        fontWeight: 700,
                        fontSize:
                          "13px",
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
                          "12px",
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

        {/* BOTTOM BUTTONS */}
        <div style={styles.bottomWrap}>
          <button
            onClick={() =>
              router.push(
                "/profile"
              )
            }
            style={{
              ...styles.bottomBtn,
              background: darkMode
                ? "rgba(255,255,255,0.05)"
                : "white",
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          >
            👤 Profile
          </button>

          <button
            onClick={logout}
            style={styles.logoutBtn}
          >
            Logout
          </button>
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
      style={{
        ...styles.statCard,
        background: darkMode
          ? "rgba(255,255,255,0.05)"
          : "white",
      }}
    >
      <div
        style={styles.statIcon}
      >
        {icon}
      </div>

      <h2
        style={{
          color: darkMode
            ? "white"
            : "#0f172a",
          marginTop: "14px",
          marginBottom: "4px",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          color: darkMode
            ? "#94a3b8"
            : "#64748b",
          fontSize: "13px",
        }}
      >
        {title}
      </p>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    padding: "18px",
    position: "relative",
    overflowX: "hidden",
    fontFamily:
      "Inter, sans-serif",
  },

  glow1: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background:
      "rgba(124,58,237,0.25)",
    filter: "blur(120px)",
    top: "-100px",
    left: "-100px",
  },

  glow2: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background:
      "rgba(6,182,212,0.2)",
    filter: "blur(120px)",
    bottom: "-100px",
    right: "-100px",
  },

  topBar: {
    padding: "16px",
    borderRadius: "24px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    backdropFilter: "blur(20px)",
    marginBottom: "24px",
    position: "relative",
    zIndex: 2,
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logo: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: 800,
  },

  brand: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 800,
  },

  themeBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },

  hero: {
    marginBottom: "24px",
    position: "relative",
    zIndex: 2,
  },

  heading: {
    fontSize: "34px",
    fontWeight: 900,
    marginBottom: "4px",
  },

  subHeading: {
    marginBottom: "18px",
    fontSize: "15px",
  },

  profileCard: {
    padding: "18px",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    backdropFilter: "blur(20px)",
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: 800,
    fontSize: "22px",
    animation:
      "pulse 4s infinite",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: "12px",
    marginBottom: "22px",
    position: "relative",
    zIndex: 2,
  },

  statCard: {
    padding: "18px 12px",
    borderRadius: "22px",
    textAlign: "center",
    backdropFilter: "blur(20px)",
  },

  statIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    fontSize: "22px",
  },

  search: {
    width: "100%",
    padding: "18px",
    borderRadius: "22px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    fontSize: "15px",
    marginBottom: "18px",
    backdropFilter: "blur(20px)",
    position: "relative",
    zIndex: 2,
  },

  createBtn: {
    width: "100%",
    padding: "18px",
    borderRadius: "22px",
    border: "none",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    boxShadow:
      "0 10px 30px rgba(124,58,237,0.35)",
    position: "relative",
    zIndex: 2,
  },

  emptyCard: {
    padding: "30px",
    borderRadius: "28px",
    textAlign: "center",
  },

  botCard: {
    padding: "22px",
    borderRadius: "28px",
    marginBottom: "16px",
    backdropFilter: "blur(20px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
  },

  botTop: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  botIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
  },

  activeDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow:
      "0 0 15px #22c55e",
  },

  bottomWrap: {
    display: "flex",
    gap: "12px",
    marginTop: "26px",
    marginBottom: "30px",
  },

  bottomBtn: {
    flex: 1,
    padding: "16px",
    borderRadius: "20px",
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
  },

  logoutBtn: {
    flex: 1,
    padding: "16px",
    borderRadius: "20px",
    border: "none",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
};
