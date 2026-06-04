import * as React from "react";
import { Box, type BoxProps } from "@mantine/core";

interface ImagePlaceholderProps extends Omit<BoxProps, "children"> {
  label?: string;
  src?: string;
  alt?: string;
  variant?: "default" | "light" | "ochre";
  bloom?: boolean;
  dataCursor?: string;
  aspectRatio?: string;
}

export function ImagePlaceholder({
  label,
  src,
  alt = "",
  variant = "default",
  bloom,
  style,
  className,
  dataCursor,
  aspectRatio,
  ...rest
}: ImagePlaceholderProps) {
  const classes = [
    "ph",
    variant !== "default" ? variant : "",
    bloom ? "bloom" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box
      className={classes}
      data-label={src ? undefined : label}
      data-cursor={dataCursor}
      style={{ ...(aspectRatio ? { aspectRatio } : {}), ...style }}
      {...rest}
    >
      {src && <img src={src} alt={alt} loading="lazy" />}
    </Box>
  );
}
