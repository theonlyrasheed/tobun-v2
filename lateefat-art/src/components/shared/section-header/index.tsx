import * as React from "react";
import { Stack, Title, Text, type StackProps } from "@mantine/core";
import { Kicker } from "@/components/shared/kicker";

interface SectionHeaderProps extends Omit<StackProps, "children"> {
  kicker?: string;
  heading: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  headingSize?: "display" | "h-xl" | "h-lg" | "h-md";
  noTick?: boolean;
}

export function SectionHeader({
  kicker,
  heading,
  lead,
  align = "left",
  headingSize = "h-lg",
  noTick,
  style,
  ...rest
}: SectionHeaderProps) {
  return (
    <Stack
      gap={16}
      align={align === "center" ? "center" : "flex-start"}
      style={{
        maxWidth: align === "center" ? "52ch" : undefined,
        margin: align === "center" ? "0 auto" : undefined,
        textAlign: align,
        ...style,
      }}
      {...rest}
    >
      {kicker && <Kicker noTick={noTick}>{kicker}</Kicker>}
      <Title
        order={2}
        className={headingSize}
        data-reveal
        style={{ fontFamily: "var(--display)" }}
      >
        {heading}
      </Title>
      {lead && (
        <Text className="lead" data-reveal>
          {lead}
        </Text>
      )}
    </Stack>
  );
}
