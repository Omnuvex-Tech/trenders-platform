"use server";

const API = process.env.API_URL;

export async function submitVacancyForm(formData: FormData) {
    const cvFile = formData.get("cv") as File;
    const uploadForm = new FormData();
    uploadForm.append("file", cvFile);
    const uploadRes = await fetch(`${API}/vacancy/upload-cv`, {
        method: "POST",
        body: uploadForm,
    });
    if (!uploadRes.ok) throw new Error("CV yüklənmədi");
    const uploadBody = await uploadRes.text();
    if (!uploadBody.trim()) throw new Error("CV upload boş cavab qaytardı");
    const { url: cvUrl } = JSON.parse(uploadBody) as { url?: string };
    if (!cvUrl) throw new Error("CV upload cavabında url tapılmadı");
    const submitRes = await fetch(`${API}/vacancy/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message") || undefined,
            cvUrl,
            vacancyId: formData.get("vacancyId")
                ? Number(formData.get("vacancyId"))
                : undefined,
            vacancyTitle: formData.get("vacancyTitle") || undefined,
        }),
    });
    if (!submitRes.ok) throw new Error("Göndərilmədi");
}
