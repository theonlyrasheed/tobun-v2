import {
  createTheme,
  DefaultMantineColor,
  MantineColorsTuple,
  CSSVariablesResolver,
} from "@mantine/core";

import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { components } from "./components";
import { headings } from "./headings";
import { shadows } from "./shadows";

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    "--mantine-color-body": "var(--bg)",
  },
  light: {
    "--mantine-color-body": "var(--bg)",
  },
  dark: {
    "--mantine-color-body": "var(--bg)",
  },
});

export const mantineTheme = createTheme({
  components,
  primaryColor: "clay",
  colors: {
    ...colors,
    clay: [
      "var(--clay-1)",
      "var(--clay-2)",
      "var(--clay-3)",
      "var(--clay-4)",
      "var(--clay-5)",
      "var(--clay-6)",
      "var(--clay-7)",
      "var(--clay-8)",
      "var(--clay-9)",
      "var(--clay-10)",
      "var(--clay-11)",
      "var(--clay-12)",
    ] as unknown as MantineColorsTuple,
    cobalt: [
      "var(--cobalt-1)",
      "var(--cobalt-2)",
      "var(--cobalt-3)",
      "var(--cobalt-4)",
      "var(--cobalt-5)",
      "var(--cobalt-6)",
      "var(--cobalt-7)",
      "var(--cobalt-8)",
      "var(--cobalt-9)",
      "var(--cobalt-10)",
      "var(--cobalt-11)",
      "var(--cobalt-12)",
    ] as unknown as MantineColorsTuple,
    "gold-brand": [
      "var(--gold-brand-1)",
      "var(--gold-brand-2)",
      "var(--gold-brand-3)",
      "var(--gold-brand-4)",
      "var(--gold-brand-5)",
      "var(--gold-brand-6)",
      "var(--gold-brand-7)",
      "var(--gold-brand-8)",
      "var(--gold-brand-9)",
      "var(--gold-brand-10)",
      "var(--gold-brand-11)",
      "var(--gold-brand-12)",
    ] as unknown as MantineColorsTuple,
  },
  white: "var(--white)",
  black: "var(--black)",
  respectReducedMotion: true,
  breakpoints,
  headings: {
    ...headings,
    fontFamily: "var(--display)",
  },
  shadows,
  defaultRadius: "3px",
  fontFamily: "var(--body)",
});


type ExtendedCustomColors =
  | "accent"
  | "clay"
  | "cobalt"
  | "gold-brand"
  | "amber"
  | "sky"
  | "purple"
  | "plum"
  | "bronze"
  | "gold"
  | "grass"
  | "crimson"
  | "tomato"
  | "mint"
  | "overlay";

export type MantineColors = DefaultMantineColor | ExtendedCustomColors;
