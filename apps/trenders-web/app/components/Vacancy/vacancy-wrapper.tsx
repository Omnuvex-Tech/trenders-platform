import { VacancyUI } from "@repo/ui";
import type { VacancyItem } from "@repo/ui";

const VACANCIES: VacancyItem[] = [
    {
        id: 1,
        date: "20 MAY, 2026",
        isNew: true,
        title: "Senior UI/UX Designer",
        category: "Graphic Designer",
        tags: [
            { label: "Part time" },
            { label: "Project work" },
            { label: "Senior level" },
            { label: "Distant" },
            { label: "Senior level" },
        ],
        detailHref: "#",
    },
    {
        id: 2,
        date: "28 MAY, 2026",
        isNew: true,
        title: "Senior Motion Designer",
        category: "Motion",
        tags: [
            { label: "Full time" },
            { label: "Junior level" },
            { label: "Distant" },
            { label: "Project work" },
            { label: "Full time" },
        ],
        detailHref: "#",
    },
    {
        id: 3,
        date: "20 APRIL, 2026",
        isNew: true,
        title: "Graphic Designer",
        category: "Graphic Designer",
        tags: [
            { label: "Full time" },
            { label: "Middle level" },
            { label: "Project work" },
            { label: "Distant" },
            { label: "Full time" },
        ],
        detailHref: "#",
    },
    {
        id: 4,
        date: "20 MAY, 2026",
        isNew: true,
        title: "Senior UI/UX Designer",
        category: "Graphic Designer",
        tags: [
            { label: "Part time" },
            { label: "Project work" },
            { label: "Senior level" },
            { label: "Distant" },
            { label: "Full time" },
        ],
        detailHref: "#",
    },
    {
        id: 5,
        date: "28 MAY, 2026",
        isNew: true,
        title: "Intern Motion Designer",
        category: "Motion",
        tags: [
            { label: "Full time" },
            { label: "Junior level" },
            { label: "Distant" },
            { label: "Project work" },
            { label: "Full time" },
        ],
        detailHref: "#",
    },
    {
        id: 6,
        date: "20 JUNE, 2026",
        isNew: false,
        title: "Graphic Designer",
        category: "Graphic Designer",
        tags: [
            { label: "Full time" },
            { label: "Middle level" },
            { label: "Project work" },
            { label: "Distant" },
            { label: "Full time" },
        ],
        detailHref: "#",
    },
     {
        id: 7,
        date: "20 JUNE, 2026",
        isNew: false,
        title: "Graphic Designer",
        category: "Graphic Designer",
        tags: [
            { label: "Full time" },
            { label: "Middle level" },
            { label: "Project work" },
            { label: "Distant" },
        ],
        detailHref: "#",
    },
     {
        id: 8,
        date: "20 JUNE, 2026",
        isNew: false,
        title: "Graphic Designer",
        category: "Graphic Designer",
        tags: [
            { label: "Full time" },
            { label: "Middle level" },
            { label: "Project work" },
            { label: "Distant" },
        ],
        detailHref: "#",
    },
];

export function VacancyWrapper() {
    return (
        <VacancyUI
            title="Vakansiyalar"
            filterTags={["SMM", "Motion", "ADS", "Graphic Designer", "Branding", "Website"]}
            dropdownLabel="Vakansiya seçin"
            dropdownOptions={[
                "Graphic designer",
                "Digital Marketing",
                "Motion designer",
                "Generative Ai",
                "SMM"
                // "Software Developer",
                // "Senior Motion Designer",
                // "DevOps"
            ]}
            vacancies={VACANCIES}
        />
    );
}