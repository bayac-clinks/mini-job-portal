/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
      ],
    theme: {
      extend: {
        colors: {
            customOrange: "#FEBE69", // カスタムのオレンジ色
            customGray: "#374151",   // カスタムのダークグレー色
          },
      },
    },
    plugins: [],
  };