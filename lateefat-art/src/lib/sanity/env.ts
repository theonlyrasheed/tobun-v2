// export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'qjs5xtv7'
// export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'

/** Throws at startup if a required env var is missing — mirrors MSSN env pattern */
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}

export const SANITY_PROJECT_ID = assertValue(
  import.meta.env.VITE_SANITY_PROJECT_ID,
  "Missing env var: VITE_SANITY_PROJECT_ID  (copy app/.env.example → app/.env.local)",
);

export const SANITY_DATASET: string =
  import.meta.env.VITE_SANITY_DATASET ?? "production";
