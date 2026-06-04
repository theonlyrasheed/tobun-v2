import * as React from "react";
import { Anchor, type AnchorProps } from "@mantine/core";
import { Link } from "@tanstack/react-router";

interface LinkArrowProps extends Omit<AnchorProps, "href"> {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}

export function LinkArrow({ href, children, external, className, ...props }: LinkArrowProps) {
  const classes = `link-arrow${className ? ` ${className}` : ""}`;

  if (external) {
    return (
      <Anchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={{ color: "inherit" }}
        {...props}
      >
        {children} <ArrowIcon />
      </Anchor>
    );
  }

  return (
    <Anchor
      component={Link}
      to={href}
      className={classes}
      style={{ color: "inherit" }}
      {...props}
    >
      {children} <ArrowIcon />
    </Anchor>
  );
}
