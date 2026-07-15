import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { SectionTitle } from "@/components/section-title";
import { MAX_WIDTH } from "@/utils/constants";
import { SOCIAL_MEDIA } from "@/utils/enums";

export function MeetSection() {
  return (
    <Container size="full" maw={MAX_WIDTH} pb={{ base: 30 }}>
      <SectionTitle
        subtitle="THE CEO OF OLUBUKOLA ART"
        title="Meet Olubukola"
      />

      <Flex
        mt={50}
        gap={{ base: 30, md: 80 }}
        align="flex-start"
        direction={{ base: "column", md: "row" }}
      >
        <Box flex={1}>
          <Image
            src="/images/profile.png"
            radius="sm"
            alt="Olubukola"
            h={500}
          />
        </Box>

        <Stack flex={2} gap="xl">
          <Text fz={15} style={{ lineHeight: 1.6 }}>
            I started drawing as a child, first learning to shade with a pencil,
            then sketching everything around me: family members, neighbors, and
            nature, capturing the everyday patterns I noticed everywhere. That
            early curiosity grew into practice, experimenting with new tones,
            color, and collage, and eventually into digital tools that let me
            tell contemporary stories through art.
            <br />
            <br />
            Over the years, I've grown from sketching for fun to creating work
            that impacts lives, from local showcases to international
            exhibitions and brand collaborations. My work focuses on
            portraiture, memory, and everyday symbolism, crafted with archival
            materials built to last.
            <br />
            <br />
            I also love bringing people together through sip-and-paint sessions
            for individuals and companies, showing just how powerful art can be
            for connection, bonding, and easing emotion.
            <br />
            <br />
            Some of my proudest milestones: my very first drawings, early
            community art competitions, mentoring kids in my community and
            online, solo and group exhibitions, commissioned work that's reached
            hundreds of children, and discovering the meaning behind signing my
            own pieces. I was also honored to be nominated Best Voice Artist.
            <br />
            <br />
            Art has shaped how I see life, nature, culture, and the world around
            me, and I'm endlessly grateful for it. Art is health. Art is
            healing. Art is freedom. And most of all, art is love.
          </Text>

          <Button
            component="a"
            href={SOCIAL_MEDIA.LINKEDIN}
            target="_blank"
            rel="noreferrer"
            radius="sm"
            color="dark"
            rightSection={
              // <ThemeIcon variant='filled' color='#8BD0FF' radius={6} size={18}>
              <IconBrandLinkedin size={18} color="#8BD0FF" />
              // </ThemeIcon>
            }
            w="fit-content"
            styles={{ root: { borderWidth: 2 } }}
            className="underline!"
          >
            LinkedIn
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
}
