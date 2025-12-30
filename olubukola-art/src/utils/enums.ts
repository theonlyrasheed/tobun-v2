export enum PAGES {
  HOME = "/",
  ABOUT = "/about",
  SERVICES = "services",
  GALLERY = "/gallery",
  BLOG = "blog",
  FAQS = "faqs",
}

export type ServiceType =
  | "visual-art"
  | "face-painting"
  | "sip-paint"
  | "digital"
  | "illustration"
  | "bead"
  | "gift-box"
  | "food";

export type GalleryFilter = "all" | "photography" | "exhibition" | "tutorials";

export type YearRange =
  | "2026-2025"
  | "2024-2023"
  | "2022-2021"
  | "2020-2019"
  | "2018-2017"
  | "2016-2010";

export type EventMonth = "december" | "august" | "march" | "january";
