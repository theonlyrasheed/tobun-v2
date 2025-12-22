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

export function MeetSection() {
  return (
    <Container size='full' maw={MAX_WIDTH} pb={{ base: 30 }}>
      <SectionTitle
        subtitle='THE CEO OF OLUBUKOLA ART'
        title='Meet Olubukola'
      />

      <Flex
        mt={50}
        gap={{ base: 30, md: 80 }}
        align='flex-start'
        direction={{ base: "column", md: "row" }}
      >
        <Box flex={1}>
          <Image
            src='/images/profile.png'
            radius='sm'
            alt='Olubukola'
            h={500}
          />
        </Box>

        <Stack flex={2} gap='xl'>
          <Text fz={15} style={{ lineHeight: 1.6 }}>
            I started drawing as a child, I would take my pencil to learn how to
            shade, sooner I started sketching my family members, neighbors, and
            natures, literally every pattern around me. I wanted to practice
            more, the curiosity, the fun experimenting new tones every time I
            sketch, the color, the collage, then digital tools to tell
            contemporary stories through art.
            <br />
            <br />
            Over the years, I've grown from sketching for fun, to impacting
            lives with art, from local showcases to international exhibitions'
            and brand collaborations. My work focuses on portraiture , memory,
            and everyday symbolism crafted with archival materials for
            longevity.
            <br />
            <br />
            I enjoy organizing a sip and paint session for individuals and
            companies to show how impactful art is in human life, allowing
            people to have fun, bonds, connection and most especially ease of
            emotions.
            <br />
            <br />
            I have had some great milestones from childhood, first drawings,
            community art competitors, early mentorship to kids around my
            community and online, I have also performed in solo and group
            exhibitions, commissions, reached hundred of kids with art,
            developed the important of my signature in an art peace. I was also
            pleased to be nominated as the best voice artist.
            <br />
            <br />
            In all, i'm grateful for the significant of art, in our lives,
            nature, culture and environment in whole. Art is health, healing,
            freedom and most especially love.
          </Text>

          <Button
            component='a'
            href='https://www.linkedin.com/in/olubukola-tobun-27747a318/'
            target='_blank'
            rel='noreferrer'
            radius='sm'
            color='dark'
            rightSection={
              // <ThemeIcon variant='filled' color='#8BD0FF' radius={6} size={18}>
              <IconBrandLinkedin size={18} color='#8BD0FF' />
              // </ThemeIcon>
            }
            w='fit-content'
            styles={{ root: { borderWidth: 2 } }}
            className='underline!'
          >
            LinkedIn
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
}
