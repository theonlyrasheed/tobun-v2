export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

export const formatPrice = (price: number): string => {
  return `N${price.toLocaleString()}`;
};

export const formatDimensions = (height: number, width: number): string => {
  return `H ${height}cm X W ${width}cm`;
};

export const formatReadTime = (minutes: number): string => {
  return `${minutes} min read`;
};
