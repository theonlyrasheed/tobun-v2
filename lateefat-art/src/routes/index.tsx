import { createFileRoute } from "@tanstack/react-router";
import { Container, Title, Text, Button, Group, Stack } from "@mantine/core";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="lg" style={{ minHeight: "60vh", justifyContent: "center" }}>
        <Title order={1} size="h1" className="font-playfair">
          Lateefat Art
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={600}>
          Welcome to the fresh portfolio workspace of Lateefat Art. This project is configured with the theme and configurations of the reference project, ready for visual designs.
        </Text>
        <Group>
          <Button variant="filled" size="md">
            Explore Gallery
          </Button>
          <Button variant="outline" size="md">
            Contact
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
