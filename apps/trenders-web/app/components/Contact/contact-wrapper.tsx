"use client";

import { ContactUI } from "@repo/ui";

export function ContactWrapper() {
    return (
        <ContactUI
            title="Contact us"
            description="Ready to start a project, collaborate, or just say hello? Drop us a message – we typically reply within 24 hours."
            info={{
                email: "trenders@mail.com",
                phone: "+(994) 502263035",
                location: "Baku, Sabail Alibayov\nGardashlari, 12",
                hours: "Monday – Friday\n9:00 AM – 6:00 PM",
                socials: {
                    twitter: "#",
                    facebook: "#",
                    instagram: "#",
                    github: "#",
                },
                hashtags: [
                    "#aiblog", "#aidesign", "#managment", "#project manager",
                    "#aimontion", "#baku", "#azerbaijan", "#agencyai",
                ],
            }}
            serviceOptions={[
                "Marketing", "Design", "Development", "AI Solutions", "Consulting",
            ]}
            budgetOptions={[
                "$1,000 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000+",
            ]}
            timelineOptions={[
                "ASAP", "1 Month", "3 Months", "6 Months", "Flexible",
            ]}
            termsHref="#"
            privacyHref="#"
            onSubmit={(data) => console.log(data)}
        />
    );
}