// @ts-nocheck
import prose from "@tailwindcss/typography";

import {
  animation,
  borderWidth,
  colors,
  container,
  files,
  fontFamily,
  gridset,
  keyframes,
  rotating,
  scrollbar,
  skeleton,
  typography,
} from "./src/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files,
  },
  theme: {
    colors,
    container,
    typography,
    borderWidth,
    extend: {
      fontFamily,
      keyframes,
      animation,
    },
  },
  plugins: [scrollbar, prose, gridset, skeleton, rotating],
};
