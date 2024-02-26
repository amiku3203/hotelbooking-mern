/** @type {import('tailwindcss').Config} */
export default {
  // file type
  content: ["./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {},
    //we can also add more style 
    container:{
       padding:{
        md:"10rem",
       }
    }
  },
  plugins: [],
}

