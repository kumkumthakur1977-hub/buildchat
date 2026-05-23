"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {

  const router = useRouter();

  const handleGetStarted = () => {

    // MOBILE
    if (window.innerWidth < 768) {

      router.push("/mobile_login");

    }

    // DESKTOP
    else {

      router.push("/login");

    }

  };

  return (

    <div style={styles.page}>

      {/* BACKGROUND GLOW */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      {/* NAVBAR */}
      <nav style={styles.navbar}>

        <div style={styles.logoRow}>

          <div style={styles.logo}>
            BC
          </div>

          <h1 style={styles.brand}>
            BuildChat
          </h1>

        </div>

        <button
          onClick={handleGetStarted}
          style={styles.navButton}
        >
          Login
        </button>

      </nav>

      {/* HERO */}
      <section style={styles.hero}>

        <div style={styles.badge}>
          ✨ AI SaaS Platform
        </div>

        <h1 style={styles.heading}>
          Build Powerful
          <br />
          AI Chatbots
        </h1>

        <p style={styles.subtitle}>
          Train custom AI assistants
          using your own business
          knowledge, FAQs, documents,
          and workflows.
        </p>

        <button
          onClick={handleGetStarted}
          style={styles.button}
        >
          Get Started 🚀
        </button>

      </section>

    </div>

  );
}

const styles: any = {

  page: {
    minHeight: "100vh",
    background: "#050816",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
    color: "white",
    padding: "20px",
  },

  glow1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "rgba(124,58,237,0.28)",
    filter: "blur(140px)",
    top: "-150px",
    left: "-150px",
  },

  glow2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "rgba(6,182,212,0.22)",
    filter: "blur(140px)",
    bottom: "-180px",
    right: "-180px",
  },

  navbar: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding:
      "10px clamp(10px,5vw,60px)",
  },

  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  logo: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 800,
  },

  brand: {
    fontSize:
      "clamp(24px,4vw,34px)",
    fontWeight: 800,
  },

  navButton: {
    border: "none",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    padding: "14px 24px",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "15px",
  },

  hero: {
    position: "relative",
    zIndex: 2,
    minHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "950px",
    margin: "0 auto",
    padding: "20px",
  },

  badge: {
    padding: "10px 18px",
    borderRadius: "999px",
    background:
      "rgba(255,255,255,0.08)",
    marginBottom: "30px",
    color: "#cbd5e1",
    fontWeight: 600,
    fontSize: "14px",
  },

  heading: {
    fontSize:
      "clamp(48px,10vw,110px)",
    lineHeight: 1,
    fontWeight: 900,
    marginBottom: "30px",
    letterSpacing: "-4px",
  },

  subtitle: {
    fontSize:
      "clamp(18px,3vw,24px)",
    color: "#94a3b8",
    lineHeight: 1.7,
    maxWidth: "720px",
    marginBottom: "40px",
  },

  button: {
    border: "none",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    color: "white",
    padding: "20px 42px",
    borderRadius: "22px",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: "18px",
    boxShadow:
      "0 20px 50px rgba(124,58,237,0.35)",
  },

};