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

  const [step, setStep] =
    useState(0);

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
          overflow:hidden;
        }

        @keyframes float {

          0%{
            transform:
              translateY(0px)
              rotate(0deg);
          }

          50%{
            transform:
              translateY(-20px)
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
          }

          50%{
            transform:scale(1.15);
          }

          100%{
            transform:scale(1);
          }

        }

        @keyframes fadeUp {

          from{
            opacity:0;
            transform:
              translateY(50px);
          }

          to{
            opacity:1;
            transform:
              translateY(0px);
          }

        }

        @keyframes rotate {

          from{
            transform:rotate(0deg);
          }

          to{
            transform:rotate(360deg);
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

        {/* BACKGROUND */}
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

          <div style={styles.aiFace}>

            <div style={styles.eye} />
            <div style={styles.eye} />

          </div>

          <h1
            style={{
              ...styles.heading,
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          >
            Hello Human 👋
          </h1>

          <p
            style={{
              ...styles.subtitle,
              color: darkMode
                ? "#94a3b8"
                : "#475569",
            }}
          >
            Your AI assistant is waiting
            to build something amazing.
          </p>

        </div>

        {/* INTERACTIVE LOGIN */}
        <div style={styles.bottomArea}>

          {step === 0 && (

            <button
              onClick={() =>
                setStep(1)
              }
              style={styles.bigButton}
            >
              Tap To Enter 🚀
            </button>

          )}

          {step >= 1 && (

            <div
              style={styles.inputArea}
            >

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
                style={styles.enterBtn}
              >
                {loading
                  ? "Entering..."
                  : "Enter BuildChat ⚡"}
              </button>

            </div>

          )}

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
      "pulse 6s infinite",
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
      "pulse 8s infinite",
  },

  glow3: {
    position: "absolute",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background:
      "rgba(236,72,153,0.28)",
    filter: "blur(90px)",
    top: "40%",
    left: "30%",
    animation:
      "float 7s infinite",
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
  },

  hero: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    marginTop: "70px",
    animation:
      "fadeUp 1s ease",
  },

  orb1: {
    position: "absolute",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#7c3aed",
    top: "20px",
    left: "40px",
    animation:
      "float 4s infinite",
  },

  orb2: {
    position: "absolute",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#06b6d4",
    top: "120px",
    right: "50px",
    animation:
      "float 6s infinite",
  },

  orb3: {
    position: "absolute",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#ec4899",
    bottom: "-20px",
    left: "90px",
    animation:
      "float 5s infinite",
  },

  aiFace: {
    width: "130px",
    height: "130px",
    borderRadius: "40px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    margin: "0 auto 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    boxShadow:
      "0 30px 80px rgba(124,58,237,0.45)",
    animation:
      "float 5s infinite",
  },

  eye: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "white",
    animation:
      "pulse 2s infinite",
  },

  heading: {
    fontSize: "54px",
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: "-3px",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "17px",
    lineHeight: 1.8,
    maxWidth: "320px",
    margin: "0 auto",
  },

  bottomArea: {
    position: "relative",
    zIndex: 5,
    marginTop: "60px",
    animation:
      "fadeUp 1.2s ease",
  },

  bigButton: {
    width: "100%",
    padding: "24px",
    borderRadius: "28px",
    border: "none",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    fontWeight: 900,
    fontSize: "20px",
    cursor: "pointer",
    boxShadow:
      "0 25px 60px rgba(124,58,237,0.45)",
  },

  inputArea: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  switchRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "10px",
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
    borderRadius: "20px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    fontSize: "16px",
    backdropFilter: "blur(10px)",
  },

  enterBtn: {
    width: "100%",
    padding: "20px",
    borderRadius: "22px",
    border: "none",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    fontWeight: 900,
    fontSize: "17px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow:
      "0 20px 50px rgba(124,58,237,0.45)",
  },

  error: {
    color: "#ef4444",
    fontSize: "14px",
  },

};
