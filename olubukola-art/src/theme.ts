import { createTheme, rem } from "@mantine/core";

const theme = createTheme({
  primaryColor: "purple",
  colors: {
    purple: [
      "#f3e5ff",
      "#dfc2ff",
      "#c89eff",
      "#b17aff",
      "#9a56ff",
      "#692792",
      "#5a2179",
      "#4b1b60",
      "#3c1547",
      "#2d0f2e",
    ],
    accent: [
      "#ffe5e0",
      "#ffccc2",
      "#ffb3a3",
      "#ff9985",
      "#ff8066",
      "#D1410C",
      "#b2370a",
      "#932d08",
      "#742306",
      "#551904",
    ],
  },
  fontFamily: "Inter, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    fontFamily: "Playfair, serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: rem(64), lineHeight: "1.2" },
      h2: { fontSize: rem(48), lineHeight: "1.3" },
      h3: { fontSize: rem(36), lineHeight: "1.4" },
      h4: { fontSize: rem(24), lineHeight: "1.45" },
      h5: { fontSize: rem(20), lineHeight: "1.5" },
      h6: { fontSize: rem(18), lineHeight: "1.5" },
    },
  },
  defaultRadius: "sm",
  black: "#000000",
  white: "#FFFFFF",
});

export default theme;
