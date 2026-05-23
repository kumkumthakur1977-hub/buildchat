"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

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
  }, [router]);

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { error } =
          await supabase.auth.signInWithPassword(
            {
              email,
              password,
            }
          );

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

        setError(
          "Account created successfully 🎉"
        );
      }
    } catch (err) {
      setError(
        "Something went wrong."
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
          overflow-x:hidden;
          font-family:Inter,sans-serif;
        }

        input::placeholder{
          color:#94a3b8;
        }

        @keyframes float{
          0%{
            transform:
              translateY(0px);
          }

          50%{
            transform:
              translateY(-14px);
          }

          100%{
            transform:
              translateY(0px);
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

        @keyframes rotate{

          from{
            transform:
              rotate(0deg);
          }

          to{
            transform:
              rotate(360deg);
          }

        }

        @keyframes fadeUp{

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

        @keyframes blink{

          0%{
            height:16px;
          }

          50%{
            height:3px;
          }

          100%{
            height:16px;
          }

        }

      `}
      </style>

      <div
        style={{
          ...styles.page,
          background: darkMode
            ? "#020617"
            : "#f8fafc",
        }}
      >
        {/* GLOW */}
        <div style={styles.glow1} />

        <div style={styles.glow2} />

        <div style={styles.glow3} />

        {/* GRID */}
        <div
          style={{
            ...styles.grid,
            opacity: darkMode
              ? 1
              : 0.06,
          }}
        />

        {/* NAVBAR */}
        <div style={styles.navbar}>
          <div style={styles.logoWrap}>
            <div
              style={styles.logoRing}
            />

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
          <div style={styles.ball1} />

          <div style={styles.ball2} />

          <div style={styles.ball3} />

          {/* ROBOT */}
          <div style={styles.robot}>
            {/* HANDS */}
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

            {/* EYES */}
            <div
              style={{
                ...styles.eye,
                transform:
                  focusField ===
                  "email"
                    ? `translateX(${Math.min(
                        email.length *
                          2,
                        12
                      )}px)`
                    : "translateX(0px)",

                opacity:
                  focusField ===
                  "password"
                    ? 0
                    : 1,

                animation:
                  focusField ===
                  "email"
                    ? "blink 2s infinite"
                    : "",
              }}
            />

            <div
              style={{
                ...styles.eye,
                transform:
                  focusField ===
                  "email"
                    ? `translateX(${Math.min(
                        email.length *
                          2,
                        12
                      )}px)`
                    : "translateX(0px)",

                opacity:
                  focusField ===
                  "password"
                    ? 0
                    : 1,

                animation:
                  focusField ===
                  "email"
                    ? "blink 2s infinite"
                    : "",
              }}
            />

            {/* MOUTH */}
            <div style={styles.mouth} />
          </div>

          {/* TEXT */}
          <h1
            style={{
              ...styles.heading,
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          >
            BuildChat
          </h1>

          <p
            style={{
              ...styles.subtitle,
              color: darkMode
                ? "#94a3b8"
                : "#475569",
            }}
          >
            Your AI buddy for building
            smart chatbots ⚡
          </p>

          <div style={styles.hookText}>
            {focusField ===
              "" &&
              "✨ Ready to build something crazy?"}

            {focusField ===
              "email" &&
              "👀 Hmm... nice email"}

            {focusField ===
              "password" &&
              "🙈 Password hidden. I promise."}
          </div>
        </div>

        {/* FORM */}
        <div style={styles.formArea}>
          {/* SWITCH */}
          <div
            style={{
              ...styles.switchWrap,
              background: darkMode
                ? "rgba(255,255,255,0.06)"
                : "white",
            }}
          >
            <button
              onClick={() =>
                setIsLogin(true)
              }
              style={{
                ...styles.switchBtn,
                ...(isLogin
                  ? styles.activeBtn
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
                  ? styles.activeBtn
                  : {}),
              }}
            >
              Sign Up
            </button>
          </div>

          {/* NAME */}
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
              style={{
                ...styles.input,
                background: darkMode
                  ? "rgba(255,255,255,0.06)"
                  : "white",
                color: darkMode
                  ? "white"
                  : "#0f172a",
              }}
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
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
            style={{
              ...styles.input,
              background: darkMode
                ? "rgba(255,255,255,0.06)"
                : "white",
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          />

          {/* PASSWORD */}
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
            style={{
              ...styles.input,
              background: darkMode
                ? "rgba(255,255,255,0.06)"
                : "white",
              color: darkMode
                ? "white"
                : "#0f172a",
            }}
          />

          {/* ERROR */}
          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleAuth}
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? "Loading..."
              : isLogin
              ? "Enter 🚀"
              : "Create Account ✨"}
          </button>

          {/* FOOTER */}
          <p
            style={{
              ...styles.footer,
              color: darkMode
                ? "#64748b"
                : "#64748b",
            }}
          >
            Secure login powered by
            Supabase
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
    overflowX: "hidden",
    overflowY: "auto",
    padding:
      "22px 22px 120px",
  },

  glow1: {
    position: "absolute",
    width: "320px",
    height: "320px",
    background:
      "rgba(124,58,237,0.35)",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "-120px",
    left: "-100px",
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
      "rgba(236,72,153,0.22)",
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "40%",
    left: "25%",
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize:
      "36px 36px",
  },

  navbar: {
    position: "relative",
    zIndex: 5,
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  logoWrap: {
    position: "relative",
    width: "74px",
    height: "74px",
  },

  logoRing: {
    position: "absolute",
    inset: 0,
    border:
      "2px solid rgba(255,255,255,0.12)",
    borderRadius: "50%",
    animation:
      "rotate 12s linear infinite",
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
      "0 20px 60px rgba(124,58,237,0.45)",
  },

  toggle: {
    width: "52px",
    height: "52px",
    border: "none",
    borderRadius: "18px",
    cursor: "pointer",
    fontSize: "18px",
  },

  hero: {
    position: "relative",
    zIndex: 5,
    textAlign: "center",
    marginTop: "28px",
    animation:
      "fadeUp 1s ease",
  },

  ball1: {
    position: "absolute",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#7c3aed",
    left: "30px",
    top: "20px",
    animation:
      "float 4s infinite",
  },

  ball2: {
    position: "absolute",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#06b6d4",
    right: "30px",
    top: "80px",
    animation:
      "float 5s infinite",
  },

  ball3: {
    position: "absolute",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#ec4899",
    left: "80px",
    bottom: "0px",
    animation:
      "float 3s infinite",
  },

  robot: {
    width: "120px",
    height: "120px",
    borderRadius: "38px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    margin: "0 auto 26px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    position: "relative",
    boxShadow:
      "0 30px 80px rgba(124,58,237,0.45)",
    animation:
      "float 5s infinite",
  },

  eye: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "white",
    transition:
      "all 0.2s ease",
  },

  mouth: {
    position: "absolute",
    width: "34px",
    height: "8px",
    background: "white",
    borderRadius: "20px",
    bottom: "28px",
  },

  handLeft: {
    position: "absolute",
    width: "34px",
    height: "74px",
    background: "white",
    borderRadius: "40px",
    left: "12px",
    top: "10px",
    transform:
      "rotate(-35deg)",
    zIndex: 5,
  },

  handRight: {
    position: "absolute",
    width: "34px",
    height: "74px",
    background: "white",
    borderRadius: "40px",
    right: "12px",
    top: "10px",
    transform:
      "rotate(35deg)",
    zIndex: 5,
  },

  heading: {
    fontSize: "48px",
    fontWeight: 900,
    letterSpacing: "-3px",
    lineHeight: 1,
    marginBottom: "14px",
  },

  subtitle: {
    fontSize: "16px",
    lineHeight: 1.8,
    maxWidth: "320px",
    margin: "0 auto",
  },

  hookText: {
    marginTop: "18px",
    minHeight: "24px",
    color: "#cbd5e1",
    fontWeight: 700,
    fontSize: "15px",
  },

  formArea: {
    position: "relative",
    zIndex: 5,
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    animation:
      "fadeUp 1.2s ease",
  },

  switchWrap: {
    display: "flex",
    padding: "5px",
    borderRadius: "22px",
    backdropFilter:
      "blur(20px)",
  },

  switchBtn: {
    flex: 1,
    padding: "16px",
    border: "none",
    background: "transparent",
    borderRadius: "18px",
    color: "#94a3b8",
    fontWeight: 800,
    cursor: "pointer",
    transition:
      "all 0.25s ease",
  },

  activeBtn: {
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    boxShadow:
      "0 10px 30px rgba(124,58,237,0.35)",
  },

  input: {
    width: "100%",
    padding: "20px",
    borderRadius: "24px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    fontSize: "16px",
    backdropFilter:
      "blur(16px)",
  },

  button: {
    width: "100%",
    padding: "20px",
    borderRadius: "26px",
    border: "none",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    fontWeight: 900,
    fontSize: "17px",
    cursor: "pointer",
    marginTop: "8px",
    boxShadow:
      "0 25px 60px rgba(124,58,237,0.45)",
  },

  error: {
    color: "#ef4444",
    fontSize: "14px",
    marginTop: "-4px",
  },

  footer: {
    textAlign: "center",
    marginTop: "8px",
    fontSize: "13px",
  },
};
