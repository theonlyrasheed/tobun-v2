import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";

export function AboutTeaser() {
  return (
    <Box component="section" className="section wrap" id="about">
      <Box className="about-grid">
        <Box className="about-portrait" data-reveal>
          <Box className="frame" data-cursor="view" data-cursor-label="Meet Lateefat">
            <Box
              component="img"
              src="/assets/img/portrait.png"
              alt="Lateefat Tobun, multidisciplinary artist"
            />
          </Box>
          <Box component="span" className="ptag">
            Lateefat M. Tobun
          </Box>
        </Box>
        <Box data-reveal>
          <Text component="span" className="kicker">
            The maker
          </Text>
          <Text component="h2" className="h-lg" style={{ margin: "18px 0 22px" }}>
            My heart chose <em className="accent-ochre">art</em> — and art chose transformation.
          </Text>
          <Box className="flow lead" style={{ color: "var(--fg-soft)" }}>
            <Text component="p">
              I'm Lateefat Modupeola Tobun, a multidisciplinary visual artist and
              digital couturier. My practice explores the boundary between physical
              creativity and the global digital world — where tradition meets
              innovation.
            </Text>
            <Text component="p">
              I hold a BSc in Economics and two MSc degrees, including Applied
              Artificial Intelligence &amp; Data Analytics. Yet my work lives in
              colour, charcoal and ADIRE indigo — using fabric as both medium and
              message.
            </Text>
          </Box>
          <Anchor
            component={Link}
            to="/about"
            className="link-arrow"
            style={{ marginTop: "26px", display: "inline-flex" }}
          >
            Read the full story
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
      </Box>
    </Box>
  );
}
