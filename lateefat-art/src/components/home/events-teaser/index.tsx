import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";

export function EventsTeaser() {
  return (
    <Box component="section" className="section wrap">
      <Box className="eyebrow-row">
        <Box>
          <Text component="span" className="kicker">
            On now &amp; next
          </Text>
          <Text component="h2" className="h-lg" style={{ marginTop: "16px" }}>
            Events &amp; <em className="accent-ochre">exhibitions</em>
          </Text>
        </Box>
        <Anchor component={Link} to="/events" className="link-arrow">
          All events
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M3 12L12 3M5 3h7v7" />
          </svg>
        </Anchor>
      </Box>
      <Box className="mini-row">
        <Anchor component={Link} to="/events" className="mini" data-reveal>
          <Box className="mimg" data-cursor="view">
            <Box
              component="img"
              src="https://picsum.photos/seed/ltpocket/640/440"
              alt="The Pocket Stories"
            />
          </Box>
          <Box>
            <Box component="span" className="tag" style={{ marginBottom: "10px" }}>
              2026 · UK
            </Box>
            <Box className="mt">The Pocket Stories</Box>
            <Text component="p" className="md">
              Collecting memories, weaving stories — a free community gathering.
            </Text>
          </Box>
        </Anchor>
        <Anchor component={Link} to="/exhibitions" className="mini" data-reveal>
          <Box className="mimg" data-cursor="view">
            <Box
              component="img"
              src="https://picsum.photos/seed/ltvalentine/640/440"
              alt="Valentine Series"
            />
          </Box>
          <Box>
            <Box component="span" className="tag" style={{ marginBottom: "10px" }}>
              2025 · Nigeria
            </Box>
            <Box className="mt">Valentine Series</Box>
            <Text component="p" className="md">A curated exhibition of colour, contrast and form.</Text>
          </Box>
        </Anchor>
        <Anchor component={Link} to="/events" className="mini" data-reveal>
          <Box className="mimg" data-cursor="view">
            <Box
              component="img"
              src="https://picsum.photos/seed/ltheritage/640/440"
              alt="Elevating Heritage"
            />
          </Box>
          <Box>
            <Box component="span" className="tag" style={{ marginBottom: "10px" }}>
              2024 · Ghana
            </Box>
            <Box className="mt">Elevating Heritage</Box>
            <Text component="p" className="md">
              A hands-on printing workshop reconnecting craft and identity.
            </Text>
          </Box>
        </Anchor>
      </Box>
    </Box>
  );
}
