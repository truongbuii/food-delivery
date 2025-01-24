import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        cardItem: {
          DEFAULT: "hsl(var(--cart-item))",
          foreground: "hsl(var(--cart-item))",
        },
        ratingBadge: {
          DEFAULT: "hsl(var(--rating-badge))",
          foreground: "hsl(var(--rating-badge))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        lightGray: "hsl(var(--light-gray))",
        tag: "hsl(var(--tag))",
        overlay: "hsl(var(--overlay))",
      },
      boxShadow: {
        foodShadow: "5px 15px 25px -2px var(--food-shadow)",
        socialBtnShadow: "10px 10px 30px -10px rgba(0, 0, 0, 0.12)",
        primaryBtnShadow: "0px 10px 30px 0px rgba(254, 114, 76, 0.5)",
        cardItemShadow: "15px 15px 30px 0px rgba(211, 209, 216, 0.25)",
        badgeNumShadow: "0px 5px 10px 0px rgba(255, 197, 41, 0.5)",
        ratingBadgeShadow: "0px 5px 10px 0px rgba(254, 114, 76, 0.1)",
        avatarShadow: "0px 15px 40px 0px rgba(255, 197, 41, 0.3)",
      },
      animation: {
        scale: "scaleUp 1.25s ease-in-out infinite",
        shiny: "shiny 1.5s ease-in-out infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        scaleUp: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.25)",
          },
        },
        shiny: {
          "0%": {
            transform: "scale(0) rotate(45deg)",
            opacity: "0",
          },
          "80%": {
            transform: "scale(0) rotate(45deg)",
            opacity: "0.5",
          },
          "81%": {
            transform: "scale(4) rotate(45deg)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(50) rotate(45deg)",
            opacity: "0",
          },
        },
        pulse: {
          "50%": {
            opacity: "0.5",
          },
        },
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
