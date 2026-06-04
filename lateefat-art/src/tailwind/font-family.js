import defaultTheme from "tailwindcss/defaultTheme";

export const fontFamily = {
  sans: ['"ClashGrotesk"', ...defaultTheme.fontFamily.sans],
  display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
  body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
  serif: ['"Newsreader"', 'Georgia', 'serif'],
  mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
};
