'use client'

import React from 'react'
import { PartnersUI } from '@repo/ui'
import type { PartnerItem } from '@repo/ui'


const ROW1: PartnerItem[] = [
  {
    id: 1,
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="16" height="16" rx="2" stroke="#111" strokeWidth="1.5" fill="none" />
        <rect x="10" y="10" width="16" height="16" rx="2" stroke="#111" strokeWidth="1.5" fill="none" />
        <text x="32" y="14" fontFamily="serif" fontSize="9" fontWeight="700" fill="#111">PASHA</text>
        <text x="32" y="24" fontFamily="serif" fontSize="7" fill="#111">Facility</text>
        <text x="32" y="33" fontFamily="serif" fontSize="7" fill="#111">Management</text>
      </svg>
    ),
  },
  {
    id: 2,
    svg: (
      <svg viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="8" width="20" height="20" fill="#111" />
        <polygon points="2,8 12,18 2,28" fill="white" />
        <text x="28" y="24" fontFamily="sans-serif" fontSize="14" fontWeight="600" fill="#111">Kapital Bank</text>
      </svg>
    ),
  },
  {
    id: 3,
    svg: (
      <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="17" stroke="#111" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="20" r="12" stroke="#111" strokeWidth="1" fill="none" />
        <text x="16" y="24" fontFamily="serif" fontSize="10" fontWeight="700" fill="#111">PB</text>
        <text x="42" y="17" fontFamily="sans-serif" fontSize="11" fontWeight="800" fill="#111">PARABOKT</text>
        <text x="42" y="28" fontFamily="sans-serif" fontSize="6" letterSpacing="1" fill="#555">BANK OLMAYAN KREDİT TƏŞKİLATI</text>
      </svg>
    ),
  },
  {
    id: 4,
    svg: (
      <svg viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="27" fontFamily="cursive" fontSize="22" fontStyle="italic" fontWeight="400" fill="#111">LifeFitness</text>
      </svg>
    ),
  },
  {
    id: 5,
    svg: (
      <svg viewBox="0 0 130 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="16" textAnchor="middle" fontFamily="serif" fontSize="8" letterSpacing="3" fill="#111">✦</text>
        <text x="50%" y="28" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="700" letterSpacing="2" fill="#111">WHITESTONE</text>
        <text x="50%" y="38" textAnchor="middle" fontFamily="sans-serif" fontSize="7" letterSpacing="3" fill="#111">TOWERS</text>
      </svg>
    ),
  },
  {
    id: 6,
    svg: (
      <svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="18" textAnchor="middle" fontFamily="sans-serif" fontSize="13" fontWeight="700" letterSpacing="1" fill="#111">SEA BREEZE</text>
        <text x="50%" y="32" textAnchor="middle" fontFamily="sans-serif" fontSize="8" letterSpacing="4" fill="#111">RESORT</text>
      </svg>
    ),
  },
]

const ROW2: PartnerItem[] = [
  {
    id: 7,
    svg: (
      <svg viewBox="0 0 100 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="2" width="40" height="32" rx="4" stroke="#111" strokeWidth="1.5" fill="none" />
        <rect x="36" y="8" width="28" height="20" rx="2" stroke="#111" strokeWidth="1" fill="none" />
        <text x="50%" y="46" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="600" fill="#111">qalagroup</text>
      </svg>
    ),
  },
  {
    id: 8,
    svg: (
      <svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="20" textAnchor="middle" fontFamily="sans-serif" fontSize="15" fontWeight="800" letterSpacing="2" fill="#111">TUBADZIN</text>
        <line x1="10" y1="26" x2="120" y2="26" stroke="#111" strokeWidth="0.8" />
        <text x="50%" y="36" textAnchor="middle" fontFamily="sans-serif" fontSize="7" letterSpacing="4" fill="#111">AZERBAIJAN</text>
      </svg>
    ),
  },
  {
    id: 9,
    svg: (
      <svg viewBox="0 0 90 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 Q45 5 80 10" stroke="#111" strokeWidth="2" fill="none" />
        <path d="M10 20 Q45 15 80 20" stroke="#111" strokeWidth="2" fill="none" />
        <path d="M10 30 Q45 25 80 30" stroke="#111" strokeWidth="2" fill="none" />
        <text x="50%" y="44" textAnchor="middle" fontFamily="sans-serif" fontSize="7" letterSpacing="2" fill="#111">SABAH RESIDENCE</text>
      </svg>
    ),
  },
  {
    id: 10,
    svg: (
      <svg viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="400" fill="#111">Le MAG</text>
      </svg>
    ),
  },
  {
    id: 11,
    svg: (
      <svg viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="24" textAnchor="middle" fontFamily="sans-serif" fontSize="13" fontWeight="300" letterSpacing="5" fill="#111">GARBAGE</text>
      </svg>
    ),
  },
]

export function PartnersWrapper() {
  return (
    <PartnersUI
      sectionTitle="Tərəfdaşlarımız"
      description={
        <>
          Biz tipik bir marketinq şirkəti deyilik! Bir çox brendlər trendləri
          izləməyə çalışdığı zaman,{' '}
          <strong>biz sizə trendi yaratmağa kömək edəcəyik.</strong>
        </>
      }
      row1={ROW1}
      row2={ROW2}
    />
  )
}