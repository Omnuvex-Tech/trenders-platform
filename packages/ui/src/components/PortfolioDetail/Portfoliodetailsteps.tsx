"use client";

import React from "react";
import styles from "../../styles/PortfolioDetail/portfolioDetailSteps.module.css";

export interface PortfolioDetailStep {
    number: string;
    label: string;
}

export interface PortfolioDetailStepsUIProps {
    description: React.ReactNode;
    steps: PortfolioDetailStep[];
}

export function PortfolioDetailStepsUI({
    description,
    steps,
}: PortfolioDetailStepsUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {/* Yuxarı açıqlama mətni */}
                <p className={styles.description}>{description}</p>

                {/* Staircase kartlar */}
              <div className={styles.staircase}>
    {steps.map((step, i) => (
        <div key={i} className={styles.card} style={{ marginTop: `${i * 100}px` }}>
            <span className={styles.stepNumber}>/{step.number}</span>
            <p className={styles.stepLabel}>{step.label}</p>
        </div>
    ))}
    {/* Divider xətlər */}
    {[1, 2, 3].map((_, i) => (
        <div
            key={`divider-${i}`}
            className={styles.divider}
            style={{ left: `${(i + 1) * 25}%` }}
        />
    ))}
</div>
            </div>
        </section>
    );
}