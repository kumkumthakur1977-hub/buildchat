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
              translateY(-25px)
              rotate(10deg);
          }

          100%{
            transform:
              translateY(0px)
              rotate(0deg);
          }
        }

        @keyframes pulseGlow {

          0%{
            transform:scale(1);
            opacity:0.6;
          }

          50%{
            transform:scale(1.2);
            opacity:1;
          }

          100%{
            transform:scale(1);
            opacity:0.6;
          }

        }

        @keyframes slideUp {

          from{
            opacity:0;
            transform:
              translateY(60px);
          }

          to{
            opacity:1;
            transform:
              translateY(0px);
          }

        }

        @keyframes rotateSlow {

          from{
            transform:rotate(0deg);
          }

          to{
            transform:rotate(360deg);
          }

        }

        @keyframes shimmer {

          0%{
            background-position:
              -400px 0;
          }

          100%{
            background-position:
              400px 0;
          }

        }

        @keyframes wave {

          0%{
            transform:
              scale(1)
              translateY(0px);
          }

          50%{
            transform:
              scale(1.08)
              translateY(-12px);
          }

          100%{
            transform:
              scale(1)
              translateY(0px);
          }

        }

      `}
      </style>

      <div
        style={{
          ...styles.page,
          background: darkMode
            ? "#030712"
            : "#f8fafc",
        }}
      >

        {/* MASSIVE GLOW */}
        <div
          style={{
            ...styles.glow1,
            opacity: darkMode ? 1 : 0.35,
          }}
        />

        <div
          style={{
            ...styles.glow2,
            opacity: darkMode ? 1 : 0.35,
          }}
        />

        <div
          style={{
            ...styles.glow3,
            opacity: darkMode ? 1 : 0.3,
          }}
        />

        {/* GRID */}
        <div
          style={{
            ...styles.grid,
            opacity: darkMode ? 1 : 0.08,
          }}
        />

        {/* HEADER */}
        <div style={styles.header}>

          <div style={styles.logoWrap}>

            <div style={styles.logoRing} />

            <div style={styles.logo}>
              BC
            </div>

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

          <div style={styles.floatingOrb1} />
          <div style={styles.floatingOrb2} />
          <div style={styles.floatingOrb3} />

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
            🚀 Future AI Platform
          </div>

          <h1
            style={{
              ...styles.heading,
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          >
            Your AI
            <br />
            Empire Starts
            <br />
            Here
          </h1>

          <p
            style={{
              ...styles.subtitle,
              color: darkMode
                ? "#94a3b8"
                : "#475569",
            }}
          >
            Build futuristic AI chatbots
            with stunning intelligence
            and powerful automation.
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

          {/* TOP SHIMMER */}
          <div style={styles.shimmer} />

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
            Secure authentication powered
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
    overflow: "hidden",
    position: "relative",
    padding: "22px",
    fontFamily:
      "Inter, sans-serif",
  },

  glow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background:
      "rgba(124,58,237,0.35)",
    filter: "blur(120px)",
    top: "-120px",
    left: "-100px",
    animation:
      "pulseGlow 6s infinite ease-in-out",
  },

  glow2: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background:
      "rgba(6,182,212,0.28)",
    filter: "blur(120px)",
    bottom: "-120px",
    right: "-100px",
    animation:
      "pulseGlow 8s infinite ease-in-out",
  },

  glow3: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background:
      "rgba(236,72,153,0.25)",
    filter: "blur(100px)",
    top: "35%",
    left: "35%",
    animation:
      "wave 7s infinite ease-in-out",
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },

  header: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  logoWrap: {
    position: "relative",
    width: "70px",
    height: "70px",
  },

  logoRing: {
    position: "absolute",
    inset: 0,
    border:
      "2px solid rgba(255,255,255,0.15)",
    borderRadius: "50%",
    animation:
      "rotateSlow 12s linear infinite",
  },

  logo: {
    position: "absolute",
    inset: "8px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: 900,
    fontSize: "20px",
    boxShadow:
      "0 20px 40px rgba(124,58,237,0.45)",
  },

  toggle: {
    border: "none",
    width: "52px",
    height: "52px",
    borderRadius: "18px",
    cursor: "pointer",
    fontSize: "18px",
    backdropFilter: "blur(10px)",
  },

  hero: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    marginBottom: "40px",
    animation:
      "slideUp 1s ease",
  },

  floatingOrb1: {
    position: "absolute",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#7c3aed",
    top: "10px",
    left: "30px",
    animation:
      "float 5s infinite ease-in-out",
  },

  floatingOrb2: {
    position: "absolute",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#06b6d4",
    top: "90px",
    right: "40px",
    animation:
      "float 7s infinite ease-in-out",
  },

  floatingOrb3: {
    position: "absolute",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#ec4899",
    bottom: "-10px",
    left: "70px",
    animation:
      "float 4s infinite ease-in-out",
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
      "clamp(54px,13vw,80px)",
    lineHeight: 0.95,
    fontWeight: 900,
    letterSpacing: "-4px",
    marginBottom: "24px",
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
    borderRadius: "34px",
    padding: "26px",
    backdropFilter:
      "blur(30px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    animation:
      "slideUp 1.2s ease",
    overflow: "hidden",
  },

  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background:
      "linear-gradient(90deg,transparent,#06b6d4,transparent)",
    backgroundSize:
      "400px 100%",
    animation:
      "shimmer 3s linear infinite",
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
    padding: "15px",
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
    padding: "19px",
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
      "0 20px 50px rgba(124,58,237,0.45)",
  },

  footer: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "20px",
  },

};
