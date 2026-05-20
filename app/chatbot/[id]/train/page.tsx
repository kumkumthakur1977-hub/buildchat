"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
    useParams,
    useRouter,
} from "next/navigation";

import { chatbotTemplates } from "@/components/Templates/chatbotTemplates";

export default function TrainPage() {
    const router = useRouter();
    const params = useParams();

    const chatbotId = params.id;

    const [question, setQuestion] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    const [trainingData, setTrainingData] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [templateLoading, setTemplateLoading] =
        useState("");

    const [darkMode, setDarkMode] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        fetchTrainingData();
    }, []);

    // FETCH TRAINING DATA
    const fetchTrainingData = async () => {
        const { data, error } =
            await supabase
                .from("chatbot_data")
                .select("*")
                .eq("chatbot_id", chatbotId)
                .order("created_at", {
                    ascending: false,
                });

        if (!error && data) {
            setTrainingData(data);
        }
    };

    // ADD TRAINING
    const addTraining = async () => {
        setError("");

        if (
            !question.trim() ||
            !answer.trim()
        ) {
            setError(
                "Please fill all fields"
            );
            return;
        }

        setLoading(true);

        const { error } =
            await supabase
                .from("chatbot_data")
                .insert({
                    chatbot_id: chatbotId,
                    question,
                    answer,
                });

        if (error) {
            setError(error.message);
        } else {
            setQuestion("");
            setAnswer("");

            fetchTrainingData();
        }

        setLoading(false);
    };

    // DELETE TRAINING
    const deleteTraining = async (
        id: string
    ) => {
        const confirmDelete = confirm(
            "Delete this training data?"
        );

        if (!confirmDelete) return;

        await supabase
            .from("chatbot_data")
            .delete()
            .eq("id", id);

        fetchTrainingData();
    };

    // USE TEMPLATE
    const useTemplate = async (
        templateName: string
    ) => {
        setTemplateLoading(templateName);

        const templateData =
            chatbotTemplates[templateName];

        if (!templateData) return;

        const formatted =
            templateData.map(
                (item: any) => ({
                    chatbot_id: chatbotId,
                    question:
                        item.question,
                    answer: item.answer,
                })
            );

        const { error } =
            await supabase
                .from("chatbot_data")
                .insert(formatted);

        if (error) {
            alert(error.message);
        } else {
            fetchTrainingData();

            alert(
                "Template added successfully"
            );
        }

        setTemplateLoading("");
    };

    return (
        <>
            {/* ANIMATIONS */}
            <style>
                {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-18px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes glow {
            0% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
            100% {
              opacity: 0.5;
              transform: scale(1);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
        `}
            </style>

            <div
                style={{
                    ...styles.page,
                    background: darkMode
                        ? "#050816"
                        : "#f3f7fc",
                }}
            >
                {/* BACKGROUND GLOW */}
                <div
                    style={styles.glow1}
                />

                <div
                    style={styles.glow2}
                />

                {/* TOP BAR */}
                <div
                    style={styles.topbar}
                >
                    <button
                        onClick={() =>
                            router.push(
                                `/chatbot/${chatbotId}`
                            )
                        }
                        style={{
                            ...styles.backBtn,
                            background:
                                darkMode
                                    ? "rgba(255,255,255,0.08)"
                                    : "white",
                            color: darkMode
                                ? "white"
                                : "#0f172a",
                        }}
                    >
                        ← Back
                    </button>

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
                            color: darkMode
                                ? "white"
                                : "#0f172a",
                        }}
                    >
                        {darkMode
                            ? "☀️"
                            : "🌙"}
                    </button>
                </div>

                {/* HEADER */}
                <div
                    style={styles.header}
                >
                    <div
                        style={
                            styles.heroOrb
                        }
                    />

                    <h1
                        style={{
                            ...styles.title,
                            color: darkMode
                                ? "white"
                                : "#0f172a",
                        }}
                    >
                        Train Your AI 🤖
                    </h1>

                    <p
                        style={{
                            ...styles.subtitle,
                            color: darkMode
                                ? "#94a3b8"
                                : "#64748b",
                        }}
                    >
                        Add smart training
                        data to improve your
                        chatbot responses.
                    </p>
                </div>

                {/* SMART TEMPLATES */}
                <div
                    style={{
                        marginBottom:
                            "50px",
                    }}
                >
                    <h2
                        style={{
                            ...styles.sectionTitle,
                            color: darkMode
                                ? "white"
                                : "#0f172a",
                        }}
                    >
                        Smart Templates
                    </h2>

                    <div
                        style={
                            styles.templateGrid
                        }
                    >
                        {/* RESTAURANT */}
                        <div
                            onClick={() =>
                                useTemplate(
                                    "restaurant"
                                )
                            }
                            style={{
                                ...styles.templateCard,
                                background:
                                    darkMode
                                        ? "rgba(255,255,255,0.06)"
                                        : "white",
                            }}
                        >
                            <div
                                style={
                                    styles.templateEmoji
                                }
                            >
                                🍔
                            </div>

                            <h3
                                style={{
                                    color:
                                        darkMode
                                            ? "white"
                                            : "#0f172a",
                                }}
                            >
                                Restaurant
                            </h3>

                            <p
                                style={{
                                    color:
                                        darkMode
                                            ? "#94a3b8"
                                            : "#64748b",
                                }}
                            >
                                Delivery,
                                timings,
                                booking &
                                menu support.
                            </p>

                            {templateLoading ===
                                "restaurant" && (
                                    <p
                                        style={{
                                            marginTop:
                                                "14px",
                                            color:
                                                "#06b6d4",
                                        }}
                                    >
                                        Adding...
                                    </p>
                                )}
                        </div>

                        {/* ECOMMERCE */}
                        <div
                            onClick={() =>
                                useTemplate(
                                    "ecommerce"
                                )
                            }
                            style={{
                                ...styles.templateCard,
                                background:
                                    darkMode
                                        ? "rgba(255,255,255,0.06)"
                                        : "white",
                            }}
                        >
                            <div
                                style={
                                    styles.templateEmoji
                                }
                            >
                                🛒
                            </div>

                            <h3
                                style={{
                                    color:
                                        darkMode
                                            ? "white"
                                            : "#0f172a",
                                }}
                            >
                                Ecommerce
                            </h3>

                            <p
                                style={{
                                    color:
                                        darkMode
                                            ? "#94a3b8"
                                            : "#64748b",
                                }}
                            >
                                Orders,
                                refunds,
                                shipping &
                                payment FAQs.
                            </p>

                            {templateLoading ===
                                "ecommerce" && (
                                    <p
                                        style={{
                                            marginTop:
                                                "14px",
                                            color:
                                                "#06b6d4",
                                        }}
                                    >
                                        Adding...
                                    </p>
                                )}
                        </div>

                        {/* SAAS */}
                        <div
                            onClick={() =>
                                useTemplate(
                                    "saas"
                                )
                            }
                            style={{
                                ...styles.templateCard,
                                background:
                                    darkMode
                                        ? "rgba(255,255,255,0.06)"
                                        : "white",
                            }}
                        >
                            <div
                                style={
                                    styles.templateEmoji
                                }
                            >
                                💻
                            </div>

                            <h3
                                style={{
                                    color:
                                        darkMode
                                            ? "white"
                                            : "#0f172a",
                                }}
                            >
                                SaaS
                            </h3>

                            <p
                                style={{
                                    color:
                                        darkMode
                                            ? "#94a3b8"
                                            : "#64748b",
                                }}
                            >
                                Pricing,
                                onboarding &
                                subscriptions.
                            </p>

                            {templateLoading ===
                                "saas" && (
                                    <p
                                        style={{
                                            marginTop:
                                                "14px",
                                            color:
                                                "#06b6d4",
                                        }}
                                    >
                                        Adding...
                                    </p>
                                )}
                        </div>
                    </div>
                </div>

                {/* TRAINING FORM */}
                <div
                    style={{
                        ...styles.formCard,
                        background: darkMode
                            ? "rgba(255,255,255,0.06)"
                            : "white",
                    }}
                >
                    <h2
                        style={{
                            ...styles.sectionTitle,
                            color: darkMode
                                ? "white"
                                : "#0f172a",
                        }}
                    >
                        Manual Training
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter Question"
                        value={question}
                        onChange={(e) =>
                            setQuestion(
                                e.target.value
                            )
                        }
                        style={{
                            ...styles.input,
                            background:
                                darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "#f8fafc",
                            color: darkMode
                                ? "white"
                                : "#0f172a",
                        }}
                    />

                    <textarea
                        placeholder="Enter Answer"
                        value={answer}
                        onChange={(e) =>
                            setAnswer(
                                e.target.value
                            )
                        }
                        style={{
                            ...styles.input,
                            minHeight:
                                "180px",
                            resize:
                                "vertical",
                            background:
                                darkMode
                                    ? "rgba(255,255,255,0.05)"
                                    : "#f8fafc",
                            color: darkMode
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
                            addTraining
                        }
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity:
                                loading
                                    ? 0.7
                                    : 1,
                        }}
                    >
                        {loading
                            ? "Adding..."
                            : "Add Training"}
                    </button>
                </div>

                {/* TRAINING DATA */}
                <div
                    style={
                        styles.trainingContainer
                    }
                >
                    {trainingData.length ===
                        0 && (
                            <div
                                style={{
                                    ...styles.emptyCard,
                                    background:
                                        darkMode
                                            ? "rgba(255,255,255,0.06)"
                                            : "white",
                                    color:
                                        darkMode
                                            ? "#94a3b8"
                                            : "#64748b",
                                }}
                            >
                                No training
                                data yet.
                            </div>
                        )}

                    {trainingData.map(
                        (item, index) => (
                            <div
                                key={item.id}
                                style={{
                                    ...styles.dataCard,
                                    background:
                                        darkMode
                                            ? "rgba(255,255,255,0.06)"
                                            : "white",
                                    animation:
                                        "slideUp 0.4s ease",
                                    animationDelay: `${index * 0.1
                                        }s`,
                                }}
                            >
                                <h2
                                    style={{
                                        color:
                                            darkMode
                                                ? "white"
                                                : "#0f172a",
                                        marginBottom:
                                            "14px",
                                    }}
                                >
                                    Q:{" "}
                                    {
                                        item.question
                                    }
                                </h2>

                                <p
                                    style={{
                                        color:
                                            darkMode
                                                ? "#94a3b8"
                                                : "#64748b",
                                        lineHeight:
                                            1.8,
                                        marginBottom:
                                            "20px",
                                    }}
                                >
                                    {
                                        item.answer
                                    }
                                </p>

                                <button
                                    onClick={() =>
                                        deleteTraining(
                                            item.id
                                        )
                                    }
                                    style={
                                        styles.deleteBtn
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

const styles: any = {
    page: {
        minHeight: "100vh",
        padding: "40px",
        fontFamily:
            "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
    },

    glow1: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(124,58,237,0.25)",
        filter: "blur(140px)",
        top: "-200px",
        left: "-200px",
        borderRadius: "50%",
    },

    glow2: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background:
            "rgba(6,182,212,0.22)",
        filter: "blur(140px)",
        bottom: "-200px",
        right: "-200px",
        borderRadius: "50%",
    },

    topbar: {
        display: "flex",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginBottom: "50px",
        position: "relative",
        zIndex: 2,
    },

    backBtn: {
        padding: "14px 20px",
        borderRadius: "16px",
        border: "none",
        fontWeight: 700,
        cursor: "pointer",
        backdropFilter:
            "blur(20px)",
    },

    themeBtn: {
        width: "52px",
        height: "52px",
        borderRadius: "16px",
        border: "none",
        cursor: "pointer",
        fontSize: "18px",
    },

    header: {
        textAlign: "center",
        marginBottom: "60px",
        position: "relative",
        zIndex: 2,
    },

    heroOrb: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background:
            "linear-gradient(135deg,#7c3aed,#06b6d4)",
        margin: "0 auto 30px",
        animation:
            "float 4s ease-in-out infinite",
        boxShadow:
            "0 0 80px rgba(124,58,237,0.5)",
    },

    title: {
        fontSize:
            "clamp(44px,6vw,70px)",
        fontWeight: 800,
        marginBottom: "18px",
    },

    subtitle: {
        fontSize: "20px",
        maxWidth: "700px",
        margin: "0 auto",
        lineHeight: 1.8,
    },

    sectionTitle: {
        fontSize: "30px",
        fontWeight: 800,
        marginBottom: "24px",
    },

    templateGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
        gap: "24px",
        position: "relative",
        zIndex: 2,
    },

    templateCard: {
        padding: "30px",
        borderRadius: "28px",
        cursor: "pointer",
        backdropFilter:
            "blur(20px)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        transition: "0.3s",
        animation:
            "slideUp 0.5s ease",
    },

    templateEmoji: {
        fontSize: "52px",
        marginBottom: "20px",
        animation:
            "float 4s ease-in-out infinite",
    },

    formCard: {
        padding: "35px",
        borderRadius: "30px",
        marginTop: "50px",
        marginBottom: "40px",
        backdropFilter:
            "blur(20px)",
        border:
            "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        zIndex: 2,
    },

    input: {
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border:
            "1px solid rgba(255,255,255,0.1)",
        outline: "none",
        marginBottom: "20px",
        fontSize: "16px",
    },

    button: {
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border: "none",
        background:
            "linear-gradient(135deg,#7c3aed,#ec4899,#06b6d4)",
        color: "white",
        fontWeight: 700,
        fontSize: "16px",
        cursor: "pointer",
        boxShadow:
            "0 20px 40px rgba(124,58,237,0.35)",
    },

    error: {
        color: "#f87171",
        marginBottom: "14px",
    },

    trainingContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        position: "relative",
        zIndex: 2,
    },

    emptyCard: {
        padding: "50px",
        borderRadius: "30px",
        textAlign: "center",
        backdropFilter:
            "blur(20px)",
    },

    dataCard: {
        padding: "30px",
        borderRadius: "28px",
        backdropFilter:
            "blur(20px)",
        border:
            "1px solid rgba(255,255,255,0.08)",
    },

    deleteBtn: {
        padding: "12px 18px",
        borderRadius: "14px",
        border: "none",
        background:
            "linear-gradient(135deg,#ef4444,#f97316)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
    },
};