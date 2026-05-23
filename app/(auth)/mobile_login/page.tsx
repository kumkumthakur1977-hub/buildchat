"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  supabase,
} from "@/lib/supabaseClient";

export default function MobileLoginPage() {

  const router =
    useRouter();

  const [darkMode, setDarkMode] =
    useState(true);

  const [isLogin, setIsLogin] =
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

    if (
      typeof window !==
        "undefined" &&
      window.innerWidth >= 768
    ) {

      router.push("/login");

    }

  }, [router]);

  const handleAuth =
    async () => {

      setLoading(true);
      setError("");

      try {

        if (isLogin) {

          const { error } =
            await supabase.auth
              .signInWithPassword({
                email,
                password,
              });

          if (error) {

            setError(
              error.message
            );

            setLoading(false);
            return;

          }

          router.push(
            "/dashboard"
          );

        } else {

          const {
            data,
            error,
          } =
            await supabase.auth
              .signUp({
                email,
                password,
              });

          if (error) {

            setError(
              error.message
            );

            setLoading(false);
            return;

          }

          const user =
            data.user;

          if (user) {

            await supabase
              .from(
                "profiles"
              )
              .insert({
                id: user.id,
                name,
              });

          }

          setIsLogin(true);

        }

      } catch {

        setError(
          "Something went wrong"
        );

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

        html{
          scroll-behavior:smooth;
        }

        body{
          margin:0;
          font-family:Inter,sans-serif;
        }

        input::placeholder{
          color:#94a3b8;
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
            opacity:.5;
          }

          50%{
            transform:scale(1.08);
            opacity:1;
          }

          100%{
            transform:scale(1);
            opacity:.5;
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

        {/* BG GLOW */}
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
                : 0.3,
          }}
        />

        {/* TOP */}
        <div style={styles.top}>

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
                  ...styles.brandSub,
                  color:
                    darkMode
                      ? "#94a3b8"
                      : "#64748b",
                }}
              >
                ai space
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
        <div style={styles.hero}>

          <div
            style={{
              ...styles.heroBadge,
              background:
                darkMode
                  ? "rgba(255,255,255,0.06)"
                  : "white",
              color:
                darkMode
                  ? "#cbd5e1"
                  : "#475569",
            }}
          >
            buildchat-pro
          </div>

          <h1
            style={{
              ...styles.heading,
              color:
                darkMode
                  ? "white"
                  : "#0f172a",
            }}
          >
            Build your website smarter 
            with us.
            
            
          </h1>

          <p
            style={{
              ...styles.subtitle,
              color:
                darkMode
                  ? "#94a3b8"
                  : "#64748b",
            }}
          >
            build AI assistants
            trained on your
            business data
            that make your bussiness smarter
            
            
          </p>

        </div>

        {/* CARD */}
        <div
          style={{
            ...styles.card,
            background:
              darkMode
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.92)",
            border:
              darkMode
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(15,23,42,0.06)",
          }}
        >

          {/* SWITCH */}
          <div
            style={{
              ...styles.tabs,
              background:
                darkMode
                  ? "rgba(255,255,255,0.04)"
                  : "#eef2ff",
            }}
          >

            <button
              onClick={() =>
                setIsLogin(
                  true
                )
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
                setIsLogin(
                  false
                )
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
          <div
            style={styles.form}
          >

            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                style={{
                  ...styles.input,
                  background:
                    darkMode
                      ? "rgba(255,255,255,0.04)"
                      : "white",
                  color:
                    darkMode
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
                setEmail(
                  e.target.value
                )
              }
              style={{
                ...styles.input,
                background:
                  darkMode
                    ? "rgba(255,255,255,0.04)"
                    : "white",
                color:
                  darkMode
                    ? "white"
                    : "#0f172a",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={{
                ...styles.input,
                background:
                  darkMode
                    ? "rgba(255,255,255,0.04)"
                    : "white",
                color:
                  darkMode
                    ? "white"
                    : "#0f172a",
              }}
            />

            {error && (
              <p
                style={
                  styles.error
                }
              >
                {error}
              </p>
            )}

            <button
              onClick={
                handleAuth
              }
              disabled={loading}
              style={
                styles.button
              }
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Continue"
                : "Create Account"}
            </button>

          </div>

          <p
            style={{
              ...styles.footer,
              color:
                darkMode
                  ? "#64748b"
                  : "#64748b",
            }}
          >
            Secure your data with us.
            
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
      "24px 20px 50px",
  },

  glow1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "rgba(124,58,237,0.25)",
    filter: "blur(120px)",
    top: "-100px",
    left: "-120px",
    animation:
      "pulse 6s ease infinite",
  },

  glow2: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background:
      "rgba(6,182,212,0.22)",
    filter: "blur(120px)",
    bottom: "-100px",
    right: "-100px",
    animation:
      "pulse 7s ease infinite",
  },

  top: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "60px",
    animation:
      "fadeUp .7s ease",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  logo: {
    width: "58px",
    height: "58px",
    borderRadius: "20px",
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

  brandSub: {
    margin: 0,
    fontSize: "13px",
  },

  themeBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "18px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    backdropFilter:
      "blur(20px)",
  },

  hero: {
    position: "relative",
    zIndex: 2,
    animation:
      "fadeUp 1s ease",
  },

  heroBadge: {
    display: "inline-flex",
    padding: "10px 18px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 700,
    marginBottom: "24px",
    backdropFilter:
      "blur(20px)",
  },

  heading: {
    fontSize: "52px",
    lineHeight: 1,
    letterSpacing: "-3px",
    fontWeight: 900,
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "16px",
    lineHeight: 1.8,
    maxWidth: "320px",
  },

  card: {
    position: "relative",
    zIndex: 2,
    marginTop: "45px",
    borderRadius: "34px",
    padding: "22px",
    backdropFilter:
      "blur(30px)",
    animation:
      "fadeUp 1.2s ease",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.12)",
  },

  tabs: {
    display: "flex",
    padding: "5px",
    borderRadius: "18px",
    marginBottom: "20px",
  },

  tabBtn: {
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 700,
    color: "#94a3b8",
    transition:
      "all .25s ease",
  },

  activeTab: {
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    boxShadow:
      "0 14px 30px rgba(124,58,237,0.25)",
  },

  form: {
    display: "flex",
    flexDirection:
      "column",
    gap: "14px",
  },

  input: {
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    border:
      "1px solid rgba(255,255,255,0.06)",
    outline: "none",
    fontSize: "15px",
    transition:
      "all .25s ease",
  },

  button: {
    marginTop: "10px",
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
    boxShadow:
      "0 20px 40px rgba(124,58,237,0.35)",
  },

  error: {
    color: "#ef4444",
    fontSize: "14px",
    margin: 0,
  },

  footer: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "20px",
  },

};
