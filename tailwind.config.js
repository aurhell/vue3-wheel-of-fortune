/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": [
          "Inter",
          "sans-serif",
        ],
      },
      animation: {
        "pulse-custom": "pulse 1s infinite",
      },
      boxShadow: {
        "custom": "0 10px 30px rgba(0, 0, 0, 0.2)",
        "button": "0 4px 15px rgba(238, 90, 82, 0.4)",
        "button-hover": "0 6px 20px rgba(238, 90, 82, 0.6)",
        "wheel": "0 10px 20px rgba(0, 0, 0, 0.3)",
        "pointer": "0 2px 4px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        "wheel": {
          "primary": "#667eea",
          "secondary": "#764ba2",
          "red": "#ff4757",
          "red-hover": "#ff3742",
          "red-dark": "#ee5a52",
        },
      },
      transitionTimingFunction: {
        "wheel": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
}
