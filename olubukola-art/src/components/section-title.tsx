import { Stack, Text, Title } from "@mantine/core";

interface SectionTitleProps {
  subtitle: string;
  title: string;
  align?: "left" | "center" | "right";
  id?: string;
}

export function SectionTitle({
  subtitle,
  title,
  align = "left",
  id,
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
        className='font-playfair'
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
        className='font-segoe'
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
