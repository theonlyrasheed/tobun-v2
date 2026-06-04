import { createFileRoute } from "@tanstack/react-router";
import { Box, Container, Title, Text } from "@mantine/core";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <Container size="md" py="xl">
      <Title order={1} className="font-playfair">Contact</Title>
      <Text>Contact page is loading...</Text>
    </Container>
  );
}
