import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { Link } from "@tanstack/react-router";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES } from "@/utils/enums";

export function ValuesSection() {
  return (
    <Container
      size='full'
      maw={MAX_WIDTH}
      pt={{
        base: 30,
        md: 100,
      }}
      pb={{
        base: 30,
      }}
    >
      <SectionTitle
        subtitle='PURPOSE AND PRACTICE'
        title='Our Values at Olubukola Art'
      />

      <Flex
        mt={30}
        gap={{
          base: 40,
          md: 100,
        }}
        align='flex-start'
        direction={{ base: "column", md: "row" }}
      >
        <Box flex={1}>
          <Image src='/svgs/value-bg.svg' alt='Values' radius='sm' />
        </Box>

        <Stack flex={2} gap='xl'>
          <Text fz={15} style={{ lineHeight: 1.6 }}>
            At Olubukola's Art, we believe that art and design are more than
            expressions of creativity, they are powerful tools for connection,
            innovation, and transformation. From vibrant paintings to immersive
            sip-and-paint experiences, from handcrafted beadwork to
            groundbreaking digital products, our work is rooted in one vision:
            to inspire, empower, stimulate people's mental health and bring
            people together.
            <br />
            <br />
            We create visual art that speaks to the soul, blending traditional
            forms like painting and beadwork with modern approaches that
            celebrate beauty, culture, and emotion. Our sip-and-paint sessions
            for companies, retreats, and private groups go beyond entertainment,
            because they foster bonding, creativity, and well-being in
            unforgettable ways.
            <br />
            <br />
            On the digital side, we design human-centered products and
            experiences that make a global impact. From health apps to financial
            tools and E-commerce platforms, our solutions combine creativity and
            strategy to solve real-world problems while staying intuitive,
            inclusive, and accessible.
            <br />
            <br />
            Every project, whether on a canvas or a screen, reflects our belief
            that creativity is universal. We merge art and technology to craft
            meaningful experiences that inspire growth, celebrate individuality,
            and nurture connection.
            <br />
            <br />
            With every brushstroke, bead, and pixel, we are not just creating,
            we are building bridges between people, ideas, and possibilities.
          </Text>

          <Group gap='lg' maw={400}>
            <Button
              size='md'
              color='gray.9'
              radius='sm'
              flex={1}
              component={Link}
              to={PAGES.GALLERY}
            >
              View Gallery
            </Button>
            <Button
              size='md'
              variant='outline'
              color='gray.9'
              radius='sm'
              flex={1}
              component={Link}
              to={PAGES.ABOUT}
            >
              About Us
            </Button>
          </Group>
        </Stack>
      </Flex>
    </Container>
  );
}
