export enum PAGES {
  HOME = "/",
  ABOUT = "/about",
  SERVICES = "services",
  GALLERY = "/gallery",
  BLOG = "blog",
  FAQS = "faqs",
  CONTACT = "contact",
}

export enum SOCIAL_MEDIA {
  YOUTUBE = "https://www.youtube.com/@lateefatart",
  TIKTOK = "https://www.tiktok.com/@lateefatart",
  LINKEDIN = "https://www.linkedin.com/in/lateefat-art",
  EMAIL = "lateefatart@gmail.com",
  DEFAULT_EMAIL = "booking@lateefat.com",
  NO_REPLY_EMAIL = "noreply@lateefat.com",
  PHONE = "+2348000000000",
  NEWSLETTER = "https://kit.com",
}

export type ServiceType =
  | "visual-art"
  | "illustration"
  | "digital"
  | "custom";

export type GalleryFilter = "all" | "painting" | "sketch" | "digital";
