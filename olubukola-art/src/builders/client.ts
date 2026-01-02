import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "qjs5xtv7",
  dataset: "production",
  apiVersion: new Date().toISOString().split("T")[0],
  useCdn: true,
});
