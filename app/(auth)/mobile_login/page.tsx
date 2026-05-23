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

    if (
      typeof window !== "undefined" &&
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

          setError(
            "Account created successfully 🎉"
          );

        }

      } catch {

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
          background:#020617;
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
              translateY(-16px);
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
            transform:scale(1.08);
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
              translateY(50px);
          }

          to{
            opacity:1;
            transform:
              translateY(0px);
          }

        }

        @keyframes wave{

          0%{
            transform:
              rotate(0deg);
          }

          50%{
            transform:
              rotate(8deg);
          }

          100%{
            transform:
              rotate(0deg);
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

        {/* GRID */}
        <div
          style={{
            ...styles.grid,
            opacity:
              darkMode
                ? 1
                : 0.05,
          }}
        />

        {/* GLOWS */}
        <div style={styles.glow1} />

        <div style={styles.glow2} />

        <div style={styles.glow3} />

        {/* TOPBAR */}
        <div style={styles.topbar}>

          <div style={styles.logoArea}>

            <div
              style={
                styles.logoRing
              }
            />

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
                AI Workspace
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
              ...styles.toggle,
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

          <div style={styles.ball1} />

          <div style={styles.ball2} />

          <div style={styles.ball3} />

          {/* ROBOT */}
          <div style={styles.robotCard}>

            <div
              style={
                styles.robotGlow
              }
            />

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
                }}
              />

              {/* MOUTH */}
              <div
                style={
                  styles.mouth
                }
              />

            </div>

          </div>

          {/* BADGE */}
          <div
            style={{
              ...styles.badge,
              background:
                darkMode
                  ? "rgba(255,255,255,0.08)"
                  : "white",
              color:
                darkMode
                  ? "#cbd5e1"
                  : "#475569",
            }}
          >
            ✨ Trusted by AI Teams
          </div>

          {/* TITLE */}
          <h1
            style={{
              ...styles.heading,
              color:
                darkMode
                  ? "white"
                  : "#0f172a",
            }}
          >
            Build AI Chatbots
            <br />
            For Modern Teams
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
            Launch powerful AI
            assistants trained on
            your business knowledge,
            workflows and documents.
          </p>

          {/* HOOK */}
          <div
            style={
              styles.hookWrap
            }
          >

            {focusField ===
              "" && (
              <span>
                ⚡ Enterprise-ready
                AI platform
              </span>
            )}

            {focusField ===
              "email" && (
              <span>
                👀 Nice email
                choice
              </span>
            )}

            {focusField ===
              "password" && (
              <span>
                🙈 Password secured
              </span>
            )}

          </div>

        </div>

        {/* AUTH */}
        <div
          style={{
            ...styles.authWrap,
            background:
              darkMode
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.92)",
          }}
        >

          {/* SWITCH */}
          <div
            style={{
              ...styles.switchWrap,
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
                setIsLogin(
                  false
                )
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

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onFocus={() =>
              setFocusField(
                "email"
              )
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
              ? "Continue →"
              : "Create Account"}
          </button>

          {/* FOOTER */}
          <p
            style={{
              ...styles.footer,
              color:
                darkMode
                  ? "#64748b"
                  : "#64748b",
            }}
          >
            Secure authentication
            powered by Supabase
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
      "24px 22px 120px",
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize:
      "40px 40px",
  },

  glow1: {
    position: "absolute",
    width: "340px",
    height: "340px",
    background:
      "rgba(124,58,237,0.30)",
    borderRadius: "50%",
    filter: "blur(130px)",
    top: "-120px",
    left: "-100px",
  },

  glow2: {
    position: "absolute",
    width: "320px",
    height: "320px",
    background:
      "rgba(6,182,212,0.24)",
    borderRadius: "50%",
    filter: "blur(120px)",
    bottom: "-120px",
    right: "-100px",
  },

  glow3: {
    position: "absolute",
    width: "220px",
    height: "220px",
    background:
      "rgba(236,72,153,0.18)",
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "40%",
    left: "30%",
  },

  topbar: {
    position: "relative",
    zIndex: 5,
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  logoRing: {
    position: "absolute",
    inset: 0,
    border:
      "2px solid rgba(255,255,255,0.10)",
    borderRadius: "50%",
    animation:
      "rotate 12s linear infinite",
  },

  logoWrap: {
    position: "relative",
    width: "74px",
    height: "74px",
  },

  logo: {
    position: "absolute",
    inset: "8px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: 900,
    fontSize: "22px",
    boxShadow:
      "0 25px 60px rgba(124,58,237,0.45)",
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

  toggle: {
    width: "52px",
    height: "52px",
    borderRadius: "18px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },

  hero: {
    position: "relative",
    zIndex: 5,
    textAlign: "center",
    marginTop: "40px",
    animation:
      "fadeUp 1s ease",
  },

  ball1: {
    position: "absolute",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#7c3aed",
    left: "20px",
    top: "10px",
    animation:
      "float 4s infinite",
  },

  ball2: {
    position: "absolute",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#06b6d4",
    right: "30px",
    top: "100px",
    animation:
      "float 5s infinite",
  },

  ball3: {
    position: "absolute",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#ec4899",
    left: "70px",
    bottom: "20px",
    animation:
      "float 3s infinite",
  },

  robotCard: {
    position: "relative",
    width: "180px",
    height: "180px",
    margin:
      "0 auto 28px",
  },

  robotGlow: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background:
      "rgba(124,58,237,0.28)",
    filter: "blur(50px)",
    animation:
      "pulse 4s infinite",
  },

  robot: {
    position: "relative",
    width: "140px",
    height: "140px",
    borderRadius: "42px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    margin: "20px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
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
    bottom: "32px",
  },

  handLeft: {
    position: "absolute",
    width: "34px",
    height: "74px",
    background: "white",
    borderRadius: "40px",
    left: "12px",
    top: "12px",
    transform:
      "rotate(-35deg)",
  },

  handRight: {
    position: "absolute",
    width: "34px",
    height: "74px",
    background: "white",
    borderRadius: "40px",
    right: "12px",
    top: "12px",
    transform:
      "rotate(35deg)",
  },

  badge: {
    display: "inline-flex",
    padding: "10px 18px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 700,
    marginBottom: "22px",
    backdropFilter:
      "blur(14px)",
  },

  heading: {
    fontSize: "48px",
    lineHeight: 1,
    letterSpacing: "-3px",
    fontWeight: 900,
    marginBottom: "18px",
  },

  subtitle: {
    fontSize: "16px",
    lineHeight: 1.8,
    maxWidth: "320px",
    margin: "0 auto",
  },

  hookWrap: {
    marginTop: "18px",
    minHeight: "22px",
    color: "#cbd5e1",
    fontWeight: 700,
    fontSize: "15px",
  },

  authWrap: {
    position: "relative",
    zIndex: 5,
    marginTop: "42px",
    borderRadius: "34px",
    padding: "24px",
    backdropFilter:
      "blur(24px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    animation:
      "fadeUp 1.2s ease",
  },

  switchWrap: {
    display: "flex",
    padding: "5px",
    borderRadius: "22px",
    marginBottom: "18px",
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
      "0 14px 40px rgba(124,58,237,0.35)",
  },

  input: {
    width: "100%",
    padding: "20px",
    borderRadius: "22px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    fontSize: "16px",
    marginBottom: "14px",
    backdropFilter:
      "blur(16px)",
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
    fontSize: "16px",
    cursor: "pointer",
    boxShadow:
      "0 25px 60px rgba(124,58,237,0.45)",
  },

  error: {
    color: "#ef4444",
    fontSize: "14px",
    marginBottom: "12px",
  },

  footer: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "18px",
  },

};
