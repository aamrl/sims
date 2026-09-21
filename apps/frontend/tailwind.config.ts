import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Design Tokens: design-system-revisi-warna.md §2.1 ───────────────────
      // Emas sedikit lebih terang dari dokumen asli (permintaan user)
      colors: {
        primary: {
          50:  "#EDF5F0",
          100: "#D3E7DC",
          200: "#A8D0B9",
          500: "#2F7F5C",
          600: "#1E6146",  // brand default: tombol, link, nav aktif
          700: "#164A35",  // hover/pressed tombol
          900: "#0A2419",
        },
        // Emas tua — lebih terang (accent-400: #CF9B35 vs asli #C2902F)
        accent: {
          50:  "#FBF3E3",
          300: "#E0B85A",  // border badge, ikon  (+brighter dari #D9AC4D)
          400: "#CF9B35",  // fill solid          (+brighter dari #C2902F)
          600: "#8A6520",  // semua teks emas     (+brighter dari #77571C)
        },
        neutral: {
          0:   "#FFFFFF",
          25:  "#FAF8F4",
          100: "#F0EDE6",
          200: "#E1DCD1",
          300: "#CFC8B9",
          400: "#A69D89",
          450: "#8F8672",
          500: "#766E5D",
          600: "#635C4C",
          900: "#1E1A14",
        },
        // Semantic
        success: {
          fill: "#1E6146",
          bg:   "#EDF5F0",
          border:"#A8D0B9",
          text: "#164A35",
        },
        warning: {
          fill: "#C1560F",
          bg:   "#FBEBDD",
          border:"#F0C9A8",
          text: "#7A360A",
        },
        danger: {
          fill: "#B3261E",
          bg:   "#FBEAE9",
          border:"#EFB9B5",
          text: "#7A1913",
        },
        info: {
          fill: "#2B6CA3",
          bg:   "#E7F0F8",
          border:"#B7D1E6",
          text: "#1D4C73",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
