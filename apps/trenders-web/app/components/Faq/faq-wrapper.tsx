import { FaqUI } from "@repo/ui";
import type { FaqItem } from "@repo/ui";

const FAQ_ITEMS: FaqItem[] = [
    {
        id: 1,
        question: "Where can I watch?",
        answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor ttitore ismod nulla.",
    },
    {
        id: 2,
        question: "Where can I watch?",
        answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
    },
    {
        id: 3,
        question: "Where can I watch?",
        answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
    },
    {
        id: 4,
        question: "Where can I watch?",
        answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
    },
];

export function FaqWrapper() {
    return (            <FaqUI items={FAQ_ITEMS} />

    );
}