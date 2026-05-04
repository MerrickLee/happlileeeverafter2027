# HappiLee Ever After 2027 — Wedding Website

The official wedding website for Gillian & Merrick Lee.  
**#HappiLeeEverAfter2027**

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS + custom CSS (Aegean Renaissance design system)
- **Fonts**: Playfair Display, Italiana, Tenor Sans (Google Fonts)
- **Analytics**: Amplitude SDK
- **Forms**: react-hook-form + Zod validation
- **Backend**: GHL (GoHighLevel) integration planned

## Design System — Aegean Renaissance

The site uses a custom design system inspired by Aegean and Renaissance aesthetics:

- **Color Palette**: Navy Deep, Gold, Rose, Emerald on warm parchment backgrounds
- **Typography**: Italiana (headings), Playfair Display (body/script), Tenor Sans (eyebrow/UI)
- **Decorative Elements**: Greek key borders, inset border patterns, corner accents, flourish dividers

## Site Sections

| Section | Status | Description |
|---------|--------|-------------|
| Hero | ✅ Active | Crest logo, names, engagement announcement |
| Countdown | ✅ Active | Live countdown timer to wedding day |
| Our Story | ✅ Active | Engagement story with drop-cap and signature |
| Gallery | ✅ Active | Mosaic grid of photo/video placeholders |
| Events | ✅ Active | Upcoming celebrations (Engagement, Bridal Shower, Wedding) |
| **Registry** | **🔒 Hidden** | **Gifts & Registry section is built but currently hidden. Re-enable by uncommenting `<Registry />` in `src/app/page.tsx`.** |
| Email Signup | ✅ Active | Newsletter subscription form |
| Guestbook | ✅ Active | Guest message form |
| Footer | ✅ Active | Crest, tagline, hashtag |

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
```

## Notes

- The RSVP modal is functional but currently saves to local storage. Connect GHL API endpoints (`/api/rsvp`, `/api/subscribe`) for production.
- Replace placeholder gallery images with production photography assets.
- Configure `metadataBase` in `layout.tsx` before deploying for proper OpenGraph support.
