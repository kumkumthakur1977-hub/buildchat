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

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

    if (
      profile &&
      profile.name
    ) {

      setUserName(profile.name);

    } else {

      const fallbackName =
        user.email
          ?.split("@")[0]
          ?.replace(/[0-9]/g, "");

      setUserName(
        fallbackName || "User"
      );
    }

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

        .sidebar{
          transition:0.35s;
        }

        .card{
          animation:fadeUp .5s ease;
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

        {/* SIDEBAR OVERLAY */}
        {sidebarOpen && (
          <div
            onClick={() =>
              setSidebarOpen(false)
            }
            style={styles.overlay}
          />
        )}

        {/* SIDEBAR */}
        <div
          className="sidebar"
          style={{
            ...styles.sidebar,
            left: sidebarOpen
              ? "0"
              : "-280px",
            background: darkMode
              ? "#111827"
              : "white",
          }}
        >

          <div>

            <div style={styles.sidebarTop}>

              <div style={styles.logo}>
                BC
              </div>

              <div>
                <h2
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                    margin: 0,
                  }}
                >
                  BuildChat
                </h2>

                <p
                  style={{
                    color: darkMode
                      ? "#94a3b8"
                      : "#64748b",
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  AI Workspace
                </p>

              </div>

            </div>

            <div style={styles.menuWrap}>

              <button
                style={styles.menuBtn}
              >
                🏠 Dashboard
              </button>

              <button
                style={styles.menuBtn}
                onClick={() =>
                  router.push(
                    "/chatbot/create"
                  )
                }
              >
                🤖 Create Bot
              </button>

              <button
                style={styles.menuBtn}
                onClick={() =>
                  router.push(
                    "/profile"
                  )
                }
              >
                👤 Profile
              </button>

              <button
                style={styles.menuBtn}
                onClick={() =>
                  setDarkMode(
                    !darkMode
                  )
                }
              >
                {darkMode
                  ? "☀️ Light Mode"
                  : "🌙 Dark Mode"}
              </button>

            </div>

          </div>

          <button
            onClick={logout}
            style={styles.logoutBtn}
          >
            Logout
          </button>

        </div>

        {/* GLOW */}
        <div style={styles.glow1} />
        <div style={styles.glow2} />

        {/* TOPBAR */}
        <div
          style={{
            ...styles.topBar,
            background: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.7)",
          }}
        >

          <button
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
            style={styles.menuToggle}
          >
            ☰
          </button>

          <div>

            <h2
              style={{
                color: darkMode
                  ? "white"
                  : "#0f172a",
                margin: 0,
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
                marginTop: "4px",
              }}
            >
              Mobile Dashboard
            </p>

          </div>

          <div style={styles.avatar}>
            {userName
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

        </div>

        {/* HERO */}
        <div
          className="card"
          style={styles.hero}
        >

          <h1
            style={{
              ...styles.heading,
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          >
            Welcome 👋
          </h1>

          <p
            style={{
              color: darkMode
                ? "#94a3b8"
                : "#64748b",
            }}
          >
            {userName}
          </p>

        </div>

        {/* STATS */}
        <div style={styles.statsGrid}>

          <StatCard
            title="Bots"
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
            value="Live"
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

        {/* CHATBOT LIST */}
        <div
          style={{
            marginTop: "24px",
          }}
        >

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

            </div>

          ) : (

            filteredBots.map(
              (bot, index) => (

                <div
                  key={bot.id}
                  className="card"
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
                    animationDelay: `${index * 0.08}s`,
                  }}
                >

                  <div
                    style={styles.botTop}
                  >

                    <div
                      style={styles.botIcon}
                    >
                      🤖
                    </div>

                    <div
                      style={styles.activeDot}
                    />

                  </div>

                  <h3
                    style={{
                      color: darkMode
                        ? "white"
                        : "#0f172a",
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
                    }}
                  >
                    AI chatbot ready
                    for conversations.
                  </p>

                </div>
              )
            )
          )}
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

      <div style={styles.statIcon}>
        {icon}
      </div>

      <h2
        style={{
          color: darkMode
            ? "white"
            : "#0f172a",
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

  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(0,0,0,0.5)",
    zIndex: 50,
  },

  sidebar: {
    position: "fixed",
    top: 0,
    bottom: 0,
    width: "260px",
    padding: "22px",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent:
      "space-between",
  },

  sidebarTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "40px",
  },

  menuWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  menuBtn: {
    padding: "16px",
    borderRadius: "18px",
    border: "none",
    background:
      "rgba(124,58,237,0.12)",
    color: "white",
    fontWeight: 700,
    textAlign: "left",
    cursor: "pointer",
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
    marginBottom: "24px",
    position: "relative",
    zIndex: 2,
    backdropFilter:
      "blur(20px)",
  },

  menuToggle: {
    width: "50px",
    height: "50px",
    borderRadius: "16px",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
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

  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: 800,
  },

  hero: {
    marginBottom: "20px",
    position: "relative",
    zIndex: 2,
  },

  heading: {
    fontSize: "34px",
    fontWeight: 900,
    marginBottom: "6px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: "12px",
    marginBottom: "22px",
  },

  statCard: {
    padding: "16px",
    borderRadius: "22px",
    textAlign: "center",
    backdropFilter:
      "blur(20px)",
  },

  statIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 10px",
  },

  search: {
    width: "100%",
    padding: "18px",
    borderRadius: "22px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    marginBottom: "18px",
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
  },

  emptyCard: {
    padding: "40px",
    borderRadius: "28px",
    textAlign: "center",
  },

  botCard: {
    padding: "22px",
    borderRadius: "26px",
    marginBottom: "16px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
  },

  botTop: {
    display: "flex",
    justifyContent:
      "space-between",
    marginBottom: "18px",
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
  },

  activeDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#22c55e",
    marginTop: "8px",
  },

  logoutBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "18px",
    border: "none",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
};
