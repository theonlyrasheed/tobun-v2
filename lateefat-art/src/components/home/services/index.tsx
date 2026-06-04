import { Box, Text } from "@mantine/core";

export function Services() {
  return (
    <Box component="section" className="section cream-2-block">
      <Box className="wrap">
        <Box className="eyebrow-row">
          <Box>
            <Text component="span" className="kicker">
              What I do
            </Text>
            <Text component="h2" className="h-lg" style={{ marginTop: "16px" }}>
              Services &amp; collaboration
            </Text>
          </Box>
          <Text component="p" className="lead" style={{ maxWidth: "34ch" }}>
            Fusing art and digital innovation into immersive experiences — and
            empowering creators through hands-on workshops.
          </Text>
        </Box>
        <Box className="svc">
          <Box className="row" data-reveal>
            <Text component="span" className="num">
              01
            </Text>
            <Text component="span" className="nm">
              Creative Services
            </Text>
            <Text component="span" className="ds">
              Digital illustration, textile &amp; visual art, fashion-tech commissions
              and custom couture pieces.
            </Text>
            <Box component="span" className="chips">
              <Box component="span" className="tag">
                Illustration
              </Box>
              <Box component="span" className="tag">
                Textile
              </Box>
              <Box component="span" className="tag">
                Couture
              </Box>
            </Box>
          </Box>
          <Box className="row" data-reveal>
            <Text component="span" className="num">
              02
            </Text>
            <Text component="span" className="nm">
              Tech &amp; Innovation
            </Text>
            <Text component="span" className="ds">
              Virtual art, AR activations, AI-generated work, media art and
              digital commerce experiences.
            </Text>
            <Box component="span" className="chips">
              <Box component="span" className="tag">
                AR
              </Box>
              <Box component="span" className="tag">
                AI
              </Box>
              <Box component="span" className="tag">
                Digital Commerce
              </Box>
            </Box>
          </Box>
          <Box className="row" data-reveal>
            <Text component="span" className="num">
              03
            </Text>
            <Text component="span" className="nm">
              Learning &amp; Workshops
            </Text>
            <Text component="span" className="ds">
              Printing workshops, fashion-tech bootcamps and mindful art
              sessions for groups and communities.
            </Text>
            <Box component="span" className="chips">
              <Box component="span" className="tag">
                Workshops
              </Box>
              <Box component="span" className="tag">
                Bootcamps
              </Box>
              <Box component="span" className="tag">
                Wellbeing
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
