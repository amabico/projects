/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00205B"
      },
      transitionProperty: {
        "w": "width"
      }
    },
  },
  plugins: [],
};
