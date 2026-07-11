# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Next.js on localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals + next/typescript + prettier)
npm run format       # Auto-fix formatting via Prettier
npm run format:check # Check formatting without writing
npm run validate     # Full validation (lint + prettier + tsc + build + protected-file check)
```

No test framework is configured.

## Architecture

**Next.js 14 (App Router)** site for Kabupaten Banggai Kepulauan — a tourism, culture, and community portal. Language is Indonesian; `lang="id"` on the HTML element.

### Data Layer

Content lives in **`data/`** as flat JSON files, not a database or CMS:

- `data/wisata/*.json` — one file per tourism entry, filename must match the `slug` field
- `data/transport.json` — single file, array of transport entries
- `data/peta-tematik/index.json` — single file, array of thematic map entries
- `data/kegiatan/`, `data/umkm/`, `data/dwb/` — placeholder dirs, not yet populated

Each domain has a **Zod schema** (`src/lib/schemas/`) that validates data at read time, and a **data-access module** (`src/lib/`) that reads, filters, and sorts the JSON. New content domains should follow the same pattern: schema → data-access module → component.

### Component Structure (Atomic Design)

`src/components/` follows atoms → molecules → organisms → templates:

- **Atoms**: `Container`, `Button`, `Heading`, `Eyebrow`, `Tag`, `Price`, `Logo`, `NavLink`
- **Molecules**: composed atoms (`WisataCard`, `TransportCard`, `MapInfoCard`, `MapDocumentCard`, `SectionHeader`, `HeroContent`, `NavLinks`, `FooterColumn`, `WisataGrid`)
- **Organisms**: full page sections (`HeroSection`, `Navbar`, `Footer`, `DestinasiPilihanSection`, `PetaInteraktifSection`, `AksesSection`, etc.)

### Routing

- `/` — fully built home page composing all organism sections
- `/wisata-dan-budaya`, `/wisata-dan-budaya/[slug]`, `/kegiatan`, `/kegiatan/[slug]`, `/peta-tematik`, `/dwb`, `/jelajah` — most are stub pages ("dalam pengembangan")

### Styling

- **Tailwind CSS 3** with `cn()` helper (`clsx` + `tailwind-merge`) in `src/lib/utils.ts`
- CSS variables `--background` / `--foreground` defined in `globals.css`; dark mode via `prefers-color-scheme`
- Fonts: DM Sans (Google, `--font-dm-sans`), Geist Sans/Mono (local woff)
- Max content width: `max-w-[1440px]` enforced by `Container`
- Shared card hover effect: `cardElevation` constant in `src/lib/utils.ts`

### Key Libraries

- **Leaflet / react-leaflet** — interactive maps
- **Framer Motion** — animations
- **react-markdown** — markdown rendering
- **Zod** — runtime data validation
- **lucide-react** — icons

### Static Assets

Semua asset disimpan lokal di `public/`. **Tidak menggunakan layanan cloud (Cloudinary, dsb.).**

- `public/images/` — hero, backgrounds, wisata, umkm, peta-tematik
- `public/brand/` — logos
- `public/geodata/` — GeoJSON files for maps

## Workflow Hooks

Aturan yang **WAJIB** diikuti setiap kali generate atau edit komponen UI:

### 1. Post-Generate: Lint & Format

Setelah membuat atau mengedit file `.ts`/`.tsx`, **selalu** jalankan:

```bash
npm run lint -- --fix          # auto-fix lint errors
npm run format                 # auto-fix formatting
```

Atau jalankan validasi lengkap:

```bash
npm run validate
```

Jika ada error, tampilkan **pesan error lengkap** beserta file dan baris yang bermasalah — jangan diam-diam skip.

### 2. Responsive Mobile Check

Setiap komponen UI harus mendukung tampilan mobile-first:

- Gunakan breakpoint Tailwind: `sm:`, `md:`, `lg:`, `xl:`
- Pastikan layout bekerja di lebar **320px** (mobile kecil) hingga **1440px** (desktop)
- Gunakan `flex-col` → `md:flex-row` untuk layout yang berubah antara mobile dan desktop
- Test visual: buka browser DevTools → responsive mode → cek 375px dan 768px

### 3. File yang TIDAK BOLEH Diedit

File-file berikut **dilindungi** dan tidak boleh diubah saat generate UI:

- `.env`, `.env.local`, `.env.production`, `.env.*.local`
- `next.config.mjs` (kecuali ada kebutuhan teknis yang eksplisit)
- `vercel.json`, `netlify.toml` (deployment config)
- `package-lock.json` (hanya berubah via `npm install`)

Script `validate.sh` akan mendeteksi jika file-file ini ter-stage di git.

### 4. Gunakan Komponen Reusable

- **Jangan duplikasi** — cek `src/components/atoms/` dan `molecules/` sebelum membuat komponen baru
- Ikuti pola Atomic Design yang sudah ada (atoms → molecules → organisms)
- Gunakan `cn()` dari `src/lib/utils.ts` untuk menggabungkan class Tailwind
- Semua komponen baru harus menerima `className?` prop untuk fleksibilitas styling
- Gunakan komponen yang sudah ada: `Container`, `Button`, `Heading`, `SectionHeader`, `Tag`, `Price`

### 5. Error Handling

Jika validasi gagal, tampilkan output error dengan format:

```
✘ [NAMA CHECK] — [pesan error]
  File: src/components/...
  Baris: XX
  Detail: [penjelasan singkat]
```

Jangan lanjut ke langkah berikutnya sebelum semua error diperbaiki.
