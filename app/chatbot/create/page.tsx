"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateChatbotPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const createChatbot = async () => {
        if (!name) return;

        setLoading(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data, error } = await supabase
            .from("chatbots")
            .insert({
                user_id: user.id,
                name,
            })
            .select()
            .single();

        if (error) {
            console.log(error.message);
            return;
        }

        router.push(`/chatbot/${data.id}`);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f8f8fc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Inter",
            }}
        >
            <div
                style={{
                    width: "500px",
                    background: "white",
                    padding: "40px",
                    borderRadius: "30px",
                    border: "1px solid #ececec",
                }}
            >
                <h1
                    style={{
                        fontSize: "38px",
                        marginBottom: "10px",
                        color: "#0f172a",
                    }}
                >
                    Create Chatbot
                </h1>

                <p
                    style={{
                        color: "#64748b",
                        marginBottom: "30px",
                    }}
                >
                    Give your AI chatbot a name.
                </p>

                <input
                    placeholder="Chatbot Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "18px",
                        borderRadius: "16px",
                        border: "1px solid #e2e8f0",
                        marginBottom: "20px",
                        fontSize: "16px",
                        outline: "none",
                    }}
                />

                <button
                    onClick={createChatbot}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "18px",
                        borderRadius: "16px",
                        border: "none",
                        background:
                            "linear-gradient(90deg,#7c3aed,#ec4899,#f59e0b)",
                        color: "white",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>
        </div>
    );
}