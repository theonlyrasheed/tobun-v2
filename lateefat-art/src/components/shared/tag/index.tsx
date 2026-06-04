import * as React from "react";
import { Badge, type BadgeProps } from "@mantine/core";

interface TagProps extends Omit<BadgeProps, "children"> {
  children: React.ReactNode;
}

export function Tag({ children, className, style, ...props }: TagProps) {
  return (
    <Badge
      variant="outline"
      className={`tag${className ? ` ${className}` : ""}`}
      style={{
        fontFamily: "var(--mono)",
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontWeight: 700,
        padding: "5px 11px",
        borderRadius: "100px",
        border: "1px solid var(--sand-line)",
        color: "var(--ink-soft)",
        background: "transparent",
        height: "auto",
        lineHeight: 1.4,
        ...style,
      }}
      {...props}
    >
      {children}
    </Badge>
  );
}
