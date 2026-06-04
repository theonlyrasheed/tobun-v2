import { Box, Text } from "@mantine/core";

export function FAQ() {
  return (
    <Box component="section" className="section cream-2-block">
      <Box className="wrap faq-wrap">
        <Box className="faq-head">
          <Text component="span" className="kicker">Good to know</Text>
          <Text component="h2" className="h-lg" style={{ marginTop: "16px" }}>
            Frequently <em className="accent-ochre">asked</em>
          </Text>
          <Text component="p" className="lead">
            Commissions, workshops and collaborations — the things people ask before
            we begin.
          </Text>
        </Box>
        <Box className="faq-list" data-reveal>
          <Box component="details" className="faq" open>
            <Box component="summary">
              Do you take on commissions?
              <Box component="span" className="ic" />
            </Box>
            <Box className="faq-a">
              Yes — I take a limited number of couture, textile, mural and digital
              commissions each year. Share your idea, timeline and space, and I'll
              tell you honestly whether it's a fit.
            </Box>
          </Box>
          <Box component="details" className="faq">
            <Box component="summary">
              Can you run a workshop for my group?
              <Box component="span" className="ic" />
            </Box>
            <Box className="faq-a">
              Absolutely. I run printing workshops, fashion-tech bootcamps and
              mindful art sessions for schools, companies and communities — in
              person across the UK and remotely worldwide.
            </Box>
          </Box>
          <Box component="details" className="faq">
            <Box component="summary">
              How does AI fit into your practice?
              <Box component="span" className="ic" />
            </Box>
            <Box className="faq-a">
              As a collaborator, never a shortcut. I use AI and data tools to extend
              hand-made work into sustainable, digital wearable art — the concept,
              craft and cultural story always lead.
            </Box>
          </Box>
          <Box component="details" className="faq">
            <Box component="summary">
              Where are you based, and do you ship?
              <Box component="span" className="ic" />
            </Box>
            <Box className="faq-a">
              I'm based in Bradford, United Kingdom, and work internationally.
              Original pieces and prints ship worldwide; bespoke and large-scale works
              are arranged case by case.
            </Box>
          </Box>
          <Box component="details" className="faq">
            <Box component="summary">
              What's the timeline for a project?
              <Box component="span" className="ic" />
            </Box>
            <Box className="faq-a">
              It depends on scope — a print can be a couple of weeks, while couture or
              murals run one to three months. We'll map clear milestones before any
              work starts.
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
