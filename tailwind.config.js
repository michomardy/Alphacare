/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* =========================
           PHYSIO THEME PALETTE
           - Nested tokens (preferred)
           - Flat aliases (compatibility)
        ========================= */

        "physio-blue": {
          DEFAULT: "#0284C7", // Primary Brand (Sky 600)
          dark: "#0369A1", // Hover/Active (Sky 700)
          light: "#BAE6FD", // Backgrounds (Sky 200)
          bg: "#F0F9FF", // Very light bg (Sky 50)
        },
        "physio-teal": {
          DEFAULT: "#06B6D4", // Secondary/Accent (Cyan 500)
          dark: "#0891B2", // Hover (Cyan 600)
          light: "#CCFBF1", // Accents (Teal 100)
        },
        "physio-green": {
          DEFAULT: "#10B981", // Success/Safe (Emerald 500)
          dark: "#059669", // Emerald 600
        },
        "physio-neutral": {
          50: "#F8FAFC", // Slate 50 (Off-white bg)
          100: "#F1F5F9", // Slate 100 (Light gray bg)
          200: "#E2E8F0", // Slate 200 (Borders)
          300: "#CBD5E1", // Slate 300
          800: "#1E293B", // Slate 800 (Dark text)
          900: "#0F172A", // Slate 900 (Darkest text)
        },

        // ✅ Flat aliases (so older JSX classnames always work)
        "physio-blue-dark": "#0369A1",
        "physio-blue-light": "#BAE6FD",
        "physio-blue-bg": "#F0F9FF",

        "physio-teal-dark": "#0891B2",
        "physio-teal-light": "#CCFBF1",

        /* =========================
           SHADCN / CSS VAR COLORS
           (keep as-is if you use tailwindcss-animate / shadcn)
        ========================= */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      backgroundImage: {
        "physio-gradient":
          "linear-gradient(135deg, #0369A1 0%, #0284C7 50%, #06B6D4 100%)",
        "physio-gradient-hover":
          "linear-gradient(135deg, #0284C7 0%, #06B6D4 50%, #14B8A6 100%)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1E293B',
            lineHeight: '1.75',
            a: {
              color: '#0284C7',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#0369A1',
              },
            },
            h2: {
              color: '#0369A1',
              fontWeight: '700',
              fontSize: '1.875rem',
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
              lineHeight: '1.3',
            },
            h3: {
              color: '#0369A1',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: '1.4',
            },
            h4: {
              color: '#0369A1',
              fontWeight: '600',
              fontSize: '1.25rem',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              color: '#475569',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.75rem',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.75rem',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              paddingLeft: '0.375rem',
              color: '#475569',
              '&::marker': {
                color: '#06B6D4',
                fontWeight: '600',
              },
            },
            'ul ul, ul ol, ol ul, ol ol': {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
            },
            strong: {
              color: '#0F172A',
              fontWeight: '600',
            },
            blockquote: {
              fontWeight: '400',
              fontStyle: 'italic',
              color: '#475569',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#06B6D4',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6rem',
              marginBottom: '1.6rem',
              paddingLeft: '1rem',
            },
            code: {
              color: '#0369A1',
              fontWeight: '500',
              fontSize: '0.875em',
              backgroundColor: '#F0F9FF',
              borderRadius: '0.25rem',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75',
            p: {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            h2: {
              fontSize: '2.25rem',
              marginTop: '2.75rem',
              marginBottom: '1.5rem',
            },
            h3: {
              fontSize: '1.75rem',
              marginTop: '2.25rem',
              marginBottom: '1.25rem',
            },
            ul: {
              paddingLeft: '2rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            ol: {
              paddingLeft: '2rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            li: {
              marginTop: '0.625rem',
              marginBottom: '0.625rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};