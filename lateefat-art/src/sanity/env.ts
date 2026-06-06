function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}

export const SANITY_PROJECT_ID = assertValue(
  import.meta.env.VITE_SANITY_PROJECT_ID,
  "Missing env var: VITE_SANITY_PROJECT_ID  (copy .env.example → .env.local)",
);

export const SANITY_DATASET: string =
  import.meta.env.VITE_SANITY_DATASET ?? "production";
