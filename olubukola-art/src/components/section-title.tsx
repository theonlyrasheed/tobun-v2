import { Stack, Text, Title } from "@mantine/core";
import clsx from "clsx";

interface SectionTitleProps {
  subtitle: string;
  title: string;
  align?: "left" | "center" | "right";
  id?: string;
  skeleton?: boolean;
}

export function SectionTitle({
  subtitle,
  title,
  align = "left",
  id,
  skeleton = false,
}: SectionTitleProps) {
  return (
    <Stack
      gap='xs'
      align={
        align === "center"
          ? "center"
          : align === "right"
            ? "flex-end"
            : "flex-start"
      }
      id={id}
    >
      <Text
        className={clsx("font-playfair", { skeleton })}
        fz={{
          base: 20,
          md: 24,
        }}
        fw={400}
        c='gray.7'
        style={{ letterSpacing: "0.96px" }}
      >
        {subtitle}
      </Text>
      <Title
        order={2}
        className={clsx("font-segoe", { skeleton })}
        fz={{
          base: 24,
          md: 36,
        }}
        fw={700}
        style={{ letterSpacing: "1.44px" }}
      >
        {title}
      </Title>
    </Stack>
  );
}
