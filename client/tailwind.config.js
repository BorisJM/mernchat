/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        formBack: "hsl(218deg 50% 91%)",
        loginRegister: "#f1f7fe",
        formBtn: "#3e4684",
        sidebar: "#F0F0F0",
        name: "#4399FF",
        message: "#959595",
        navbg: "#F0F0F0",
      },
    },
  },
  plugins: [],
};
