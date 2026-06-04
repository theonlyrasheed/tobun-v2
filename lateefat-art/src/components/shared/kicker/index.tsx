import * as React from "react";
import { Text, type TextProps } from "@mantine/core";

interface KickerProps extends Omit<TextProps, "children"> {
  children: React.ReactNode;
  noTick?: boolean;
}

export function Kicker({ children, noTick, className, ...props }: KickerProps) {
  return (
    <Text
      component="span"
      className={`kicker${noTick ? " no-tick" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </Text>
  );
}
