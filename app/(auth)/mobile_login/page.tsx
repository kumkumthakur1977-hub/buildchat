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

  const [focusField, setFocusField] =
    useState("");

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
            overflow:hidden;
          }

          @keyframes float {

            0%{
              transform:
                translateY(0px);
            }

            50%{
              transform:
                translateY(-15px);
            }

            100%{
              transform:
                translateY(0px);
            }

          }

          @keyframes pulse {

            0%{
              transform:scale(1);
            }

            50%{
              transform:scale(1.08);
            }

            100%{
              transform:scale(1);
            }

          }

          @keyframes fadeUp {

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

          @keyframes rotate {

            from{
              transform:
                rotate(0deg);
            }

            to{
              transform:
                rotate(360deg);
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

        {/* BG */}
        <div style={styles.glow1} />
        <div style={styles.glow2} />
        <div style={styles.glow3} />

        {/* TOP */}
        <div style={styles.topBar}>

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

          <div style={styles.orb1} />
          <div style={styles.orb2} />
          <div style={styles.orb3} />

          {/* AI FACE */}
          <div style={styles.aiFace}>

            {focusField ===
              "password" && (
              <>
                <div
                  style={
                    styles.handLeft
                  }
                />

                <div
                  style={
                    styles.handRight
                  }
                />
              </>
            )}

            <div
              style={{
                ...styles.eye,
                transform:
                  focusField ===
                    "email"
                    ? `translateX(${email.length * 1.5
                    }px)`
                    : "translateX(0px)",
                opacity:
                  focusField ===
                    "password"
                    ? 0
                    : 1,
              }}
            />

            <div
              style={{
                ...styles.eye,
                transform:
                  focusField ===
                    "email"
                    ? `translateX(${email.length * 1.5
                    }px)`
                    : "translateX(0px)",
                opacity:
                  focusField ===
                    "password"
                    ? 0
                    : 1,
              }}
            />

          </div>

          <h1
            style={{
              ...styles.heading,
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          >
            Hey Human 👋
          </h1>

          <p
            style={{
              ...styles.subtitle,
              color: darkMode
                ? "#94a3b8"
                : "#475569",
            }}
          >
            Your AI buddy is waiting
            for you ✨
          </p>

          <p style={styles.hookText}>

            {focusField ===
              "email" &&
              "👀 I'm watching your email..."}

            {focusField ===
              "password" &&
              "🙈 I can't see your password..."}

            {focusField ===
              "" &&
              "⚡ Let's build something amazing"}

          </p>

        </div>

        {/* INPUTS */}
        <div style={styles.formArea}>

          <div style={styles.switchRow}>

            <button
              onClick={() =>
                setIsLogin(true)
              }
              style={{
                ...styles.switchBtn,
                ...(isLogin
                  ? styles.activeSwitch
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
                ...styles.switchBtn,
                ...(!isLogin
                  ? styles.activeSwitch
                  : {}),
              }}
            >
              Sign Up
            </button>

          </div>

          {!isLogin && (

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              style={styles.input}
            />

          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onFocus={() =>
              setFocusField("email")
            }
            onBlur={() =>
              setFocusField("")
            }
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onFocus={() =>
              setFocusField(
                "password"
              )
            }
            onBlur={() =>
              setFocusField("")
            }
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={styles.input}
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
                ? "Enter BuildChat 🚀"
                : "Create Account ✨"}
          </button>

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
    padding: "24px",
    fontFamily:
      "Inter, sans-serif",
  },

  glow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background:
      "rgba(124,58,237,0.35)",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "-120px",
    left: "-120px",
  },

  glow2: {
    position: "absolute",
    width: "320px",
    height: "320px",
    background:
      "rgba(6,182,212,0.28)",
    borderRadius: "50%",
    filter: "blur(120px)",
    bottom: "-100px",
    right: "-100px",
  },

  glow3: {
    position: "absolute",
    width: "220px",
    height: "220px",
    background:
      "rgba(236,72,153,0.25)",
    borderRadius: "50%",
    filter: "blur(90px)",
    top: "40%",
    left: "30%",
  },

  topBar: {
    position: "relative",
    zIndex: 5,
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  logoWrap: {
    position: "relative",
    width: "72px",
    height: "72px",
  },

  logoRing: {
    position: "absolute",
    inset: 0,
    border:
      "2px solid rgba(255,255,255,0.12)",
    borderRadius: "50%",
    animation:
      "rotate 10s linear infinite",
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
    fontSize: "22px",
    boxShadow:
      "0 20px 50px rgba(124,58,237,0.45)",
  },

  toggle: {
    border: "none",
    width: "52px",
    height: "52px",
    borderRadius: "18px",
    cursor: "pointer",
    fontSize: "18px",
  },

  hero: {
    position: "relative",
    textAlign: "center",
    marginTop: "60px",
    zIndex: 3,
    animation:
      "fadeUp 1s ease",
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
      "float 4s infinite",
  },

  orb2: {
    position: "absolute",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#06b6d4",
    top: "100px",
    right: "40px",
    animation:
      "float 5s infinite",
  },

  orb3: {
    position: "absolute",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#ec4899",
    bottom: "0px",
    left: "70px",
    animation:
      "float 3s infinite",
  },

  aiFace: {
    width: "140px",
    height: "140px",
    borderRadius: "40px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    margin: "0 auto 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    position: "relative",
    boxShadow:
      "0 30px 70px rgba(124,58,237,0.45)",
    animation:
      "float 5s infinite",
  },

  eye: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "white",
    transition:
      "all 0.25s ease",
  },

  handLeft: {
    position: "absolute",
    width: "40px",
    height: "80px",
    background: "white",
    borderRadius: "30px",
    left: "18px",
    top: "12px",
    transform:
      "rotate(-35deg)",
    zIndex: 10,
  },

  handRight: {
    position: "absolute",
    width: "40px",
    height: "80px",
    background: "white",
    borderRadius: "30px",
    right: "18px",
    top: "12px",
    transform:
      "rotate(35deg)",
    zIndex: 10,
  },

  heading: {
    fontSize: "52px",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "-3px",
    marginBottom: "18px",
  },

  subtitle: {
    fontSize: "17px",
    lineHeight: 1.7,
    maxWidth: "320px",
    margin: "0 auto",
  },

  hookText: {
    marginTop: "18px",
    fontSize: "15px",
    color: "#cbd5e1",
    fontWeight: 700,
    minHeight: "24px",
  },

  formArea: {
    position: "relative",
    zIndex: 5,
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    animation:
      "fadeUp 1.3s ease",
  },

  switchRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "8px",
  },

  switchBtn: {
    flex: 1,
    padding: "16px",
    borderRadius: "18px",
    border: "none",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },

  activeSwitch: {
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
  },

  input: {
    width: "100%",
    padding: "18px",
    borderRadius: "22px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background:
      "rgba(255,255,255,0.08)",
    backdropFilter:
      "blur(14px)",
    color: "white",
    outline: "none",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "20px",
    borderRadius: "24px",
    border: "none",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    fontWeight: 900,
    fontSize: "17px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow:
      "0 25px 60px rgba(124,58,237,0.45)",
  },

  error: {
    color: "#ef4444",
    fontSize: "14px",
  },

};
