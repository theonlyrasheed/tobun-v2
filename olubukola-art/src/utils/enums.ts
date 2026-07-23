export enum PAGES {
  HOME = "/",
  ABOUT = "/about",
  SERVICES = "services",
  GALLERY = "/gallery",
  BLOG = "/blog",
  FAQS = "faqs",
  CONTACT = "contact",
  CORE_VALUES = "core-values",
  ADS = "ads",
}

export enum SOCIAL_MEDIA {
  YOUTUBE = "https://www.youtube.com/@olubukolaart",
  TIKTOK = "https://www.tiktok.com/@olubukolaart",
  LINKEDIN = "https://www.linkedin.com/in/olubukola-tobun-27747a318",
  EMAIL = "olubukolaart@gmail.com",
  DEFAULT_EMAIL = "booking@olubukola.com",
  NO_REPLY_EMAIL = "noreply@olubukola.com",
  // PHONE = "+2348148148813",
  PHONE = "+2349061678333",
  WHATSAPP = "+2348158148813",
  // WHATSAPP = "https://wa.me/2348091792326",
  NEWSLETTER = "https://kit.com",
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
