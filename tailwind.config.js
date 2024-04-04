/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,jsx,tsx,vue}", 
    "./components/**/*.{html,js,jsx,tsx,vue}", 
  ],
  theme: {
    extend: {
    },

    // colors: {
    //   normal: "#A8A77A",
    //   fire: "#eaab7e",
    //   water: "#95b7ff",
    //   grass: "#7AC74C",
    //   electric: "#F7D02C",
    //   ice: "#96D9D6",
    //   fighting: "#C22E28",
    //   poison: "#A33EA1",
    //   ground: "#E2BF65",
    //   flying: "#A98FF3",
    //   psychic: "#F95587",
    //   bug: "#A6B91A",
    //   rock: "#B6A136",
    //   ghost: "#735797",
    //   dark: "#705746",
    //   dragon: "#6F35FC",
    //   steel: "#B7B7CE",
    //   fairy: "#D685AD",
    // },
  },
  plugins: [],
  rules: {
    'at-rule-no-unknown': [
        true,
        {
            ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
        }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null
  }
}