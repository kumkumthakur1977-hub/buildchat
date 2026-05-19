"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";

import { chatbotTemplates } from "@/components/Templates/chatbotTemplates";

export default function TrainPage() {
    const params = useParams();

    const chatbotId = params.id;

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [trainingData, setTrainingData] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTrainingData();
    }, []);

    // FETCH TRAINING DATA
    const fetchTrainingData = async () => {
        const { data } = await supabase
            .from("chatbot_data")
            .select("*")
            .eq("chatbot_id", chatbotId)
            .order("created_at", {
                ascending: false,
            });

        if (data) {
            setTrainingData(data);
        }
    };

    // ADD MANUAL TRAINING
    const addTraining = async () => {
        if (!question || !answer) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        const { error } = await supabase
            .from("chatbot_data")
            .insert({
                chatbot_id: chatbotId,
                question,
                answer,
            });

        if (error) {
            alert(error.message);
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
        const templateData =
            chatbotTemplates[templateName];

        if (!templateData) return;

        const formatted = templateData.map(
            (item: any) => ({
                chatbot_id: chatbotId,
                question: item.question,
                answer: item.answer,
            })
        );

        const { error } = await supabase
            .from("chatbot_data")
            .insert(formatted);

        if (error) {
            alert(error.message);
        } else {
            alert("Template added successfully");

            fetchTrainingData();
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right,#ffffff,#f8fafc)",
                padding: "40px",
                fontFamily: "Inter, sans-serif",
            }}
        >
            {/* HEADER */}
            <div
                style={{
                    marginBottom: "40px",
                }}
            >
                <h1
                    style={{
                        fontSize: "42px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "10px",
                    }}
                >
                    Train Chatbot
                </h1>

                <p
                    style={{
                        color: "#64748b",
                        fontSize: "18px",
                    }}
                >
                    Add manual training or use smart templates.
                </p>
            </div>

            {/* SMART TEMPLATES */}
            <div
                style={{
                    marginBottom: "40px",
                }}
            >
                <h2
                    style={{
                        fontSize: "30px",
                        fontWeight: 700,
                        marginBottom: "22px",
                        color: "#0f172a",
                    }}
                >
                    Smart Templates
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(240px,1fr))",
                        gap: "20px",
                    }}
                >
                    {/* RESTAURANT */}
                    <div
                        onClick={() =>
                            useTemplate("restaurant")
                        }
                        style={templateCard}
                    >
                        <div style={emojiStyle}>🍔</div>

                        <h3 style={templateTitle}>
                            Restaurant
                        </h3>

                        <p style={templateText}>
                            Delivery, reservations,
                            timings and menu support.
                        </p>
                    </div>

                    {/* ECOMMERCE */}
                    <div
                        onClick={() =>
                            useTemplate("ecommerce")
                        }
                        style={templateCard}
                    >
                        <div style={emojiStyle}>🛒</div>

                        <h3 style={templateTitle}>
                            Ecommerce
                        </h3>

                        <p style={templateText}>
                            Refunds, orders, shipping
                            and payment FAQs.
                        </p>
                    </div>

                    {/* SAAS */}
                    <div
                        onClick={() =>
                            useTemplate("saas")
                        }
                        style={templateCard}
                    >
                        <div style={emojiStyle}>💻</div>

                        <h3 style={templateTitle}>
                            SaaS
                        </h3>

                        <p style={templateText}>
                            Pricing, onboarding,
                            support and subscriptions.
                        </p>
                    </div>
                </div>
            </div>

            {/* MANUAL TRAINING */}
            <div
                style={{
                    background: "white",
                    borderRadius: "28px",
                    padding: "30px",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.05)",
                    marginBottom: "40px",
                }}
            >
                <h2
                    style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "24px",
                    }}
                >
                    Manual Training
                </h2>

                <input
                    type="text"
                    placeholder="Enter Question"
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    style={inputStyle}
                />

                <textarea
                    placeholder="Enter Answer"
                    value={answer}
                    onChange={(e) =>
                        setAnswer(e.target.value)
                    }
                    style={{
                        ...inputStyle,
                        minHeight: "160px",
                        resize: "vertical",
                    }}
                />

                <button
                    onClick={addTraining}
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading
                        ? "Adding..."
                        : "Add Training"}
                </button>
            </div>

            {/* TRAINING DATA */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                {trainingData.length === 0 && (
                    <div
                        style={{
                            background: "white",
                            padding: "40px",
                            borderRadius: "28px",
                            textAlign: "center",
                            color: "#64748b",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.04)",
                        }}
                    >
                        No training data yet.
                    </div>
                )}

                {trainingData.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            background: "white",
                            padding: "26px",
                            borderRadius: "26px",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.04)",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "22px",
                                fontWeight: 700,
                                color: "#0f172a",
                                marginBottom: "14px",
                            }}
                        >
                            Q: {item.question}
                        </h2>

                        <p
                            style={{
                                color: "#64748b",
                                lineHeight: 1.8,
                                marginBottom: "20px",
                            }}
                        >
                            {item.answer}
                        </p>

                        <button
                            onClick={() =>
                                deleteTraining(item.id)
                            }
                            style={{
                                padding: "12px 18px",
                                borderRadius: "14px",
                                border: "none",
                                background: "#ef4444",
                                color: "white",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    border: "1px solid #e2e8f0",
    marginBottom: "20px",
    fontSize: "16px",
    outline: "none",
    background: "white",
};

const buttonStyle = {
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    border: "none",
    background:
        "linear-gradient(90deg,#7c3aed,#ec4899,#06b6d4)",
    color: "white",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
};

const templateCard = {
    background: "white",
    padding: "24px",
    borderRadius: "24px",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};

const emojiStyle = {
    fontSize: "42px",
    marginBottom: "16px",
};

const templateTitle = {
    fontSize: "24px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "10px",
};

const templateText = {
    color: "#64748b",
    lineHeight: 1.7,
};