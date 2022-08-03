module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
  ],
  // theme: {
  //   extend: {
  //     transitionProperty: {
  //       width: "width",
  //       spacing: "margin, padding",
  //     },
  //     maxWidth: {
  //       "8xl": "100rem",
  //     },
  //     screens: {
  //       "2xsmall": "320px",
  //       xsmall: "512px",
  //       small: "1024px",
  //       medium: "1280px",
  //       large: "1440px",
  //       xlarge: "1680px",
  //       "2xlarge": "1920px",
  //     },
  //     fontFamily: {
  //       sans: [
  //         "Inter",
  //         "-apple-system",
  //         "BlinkMacSystemFont",
  //         "Segoe UI",
  //         "Roboto",
  //         "Helvetica Neue",
  //         "Ubuntu",
  //         "sans-serif",
  //       ],
  //     },
  //   },
  // },
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      serif: ["Inter", "sans-serif"],
      DejaVu: ["DejaVu Sans", "Arial", "sans-serif"],
    },
    extend: {
      height: {
        header: "560px",
      },
      backgroundImage: {
        "page-header": "url('/page-header-bg.jpg')",
        "contact-header": "url('/page-header-bg-2.jpg')",
        subscribe: "url('/subscribe-bg.jpg')",
        "app-download": "url('/app-download.jpg')",
        cta: "url('/cta-bg.png')",
        "cta-1": "url('/cta/cta-bg-1.png')",
        "cta-2": "url('/cta/cta-bg-2.png')",
        "cta-3": "url('/cta/cta-bg-3.png')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
}
