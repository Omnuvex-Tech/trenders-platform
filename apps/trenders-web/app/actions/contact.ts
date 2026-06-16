"use server";

const API = process.env.API_URL;

export async function submitContactForm(data: Record<string, string>) {
    const res = await fetch(`${API}/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Submit failed");
}
