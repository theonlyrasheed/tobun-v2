import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconBrandTiktok,
  IconBrandYoutube,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";
import { SectionTitle } from "@/components/section-title";
import { Link } from "@tanstack/react-router";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES, SOCIAL_MEDIA } from "@/utils/enums";

export function ContactSection() {
  return (
    <Container
      size='full'
      maw={MAX_WIDTH}
      pt={{
        base: 30,
        md: 100,
      }}
    >
      <SectionTitle
        id={PAGES.CONTACT}
        subtitle='HAVE ENQUIRY, COMPLAIN, COMMISSION, SUGGESTION'
        title='Contact Us'
      />

      <Flex
        mt={50}
        gap={{ base: 14, md: 10 }}
        align='flex-start'
        direction={{ base: "column", md: "row" }}
      >
        <Paper
          p='lg'
          w='100%'
          flex={1.3}
          radius='lg'
          withBorder
          styles={{
            root: {
              backgroundImage:
                "linear-gradient(90deg, rgb(10, 41, 78), rgba(10, 41, 78, 0.748)), url('/images/contact-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(10, 41, 78, 1)",
              borderColor: "transparent",
            },
          }}
        >
          <Stack gap='xl' mih={300}>
            <Stack>
              <Title
                order={3}
                className='font-playfair!'
                fz={24}
                fw={600}
                c='white'
              >
                Work with Olubukola Art
              </Title>
              <Text fz={15} c='rgba(255, 255, 255, 0.75)' maw={520}>
                For exhibitions, Brand Collaborations, and commissions, send a
                note with your time and reference. Please note that we respond
                within 2–3 business days.
              </Text>
            </Stack>

            <Group gap='sm' align='center'>
              <IconMail size={18} color='white' />
              <Text className='font-playfair' fz={16} fw={600} c='white'>
                Email:
              </Text>
              <Box
                component={Link}
                to={`mailto:${SOCIAL_MEDIA.EMAIL}`}
                target='_blank'
                rel='noreferrer'
                px={14}
                py={4}
                style={{
                  borderRadius: 999,
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <Text className='font-playfair' fz={16} fw={600} c='white'>
                  OlubukolaArt@gmail.com
                </Text>
              </Box>
            </Group>

            <Group gap='xs'>
              <IconMapPin size={18} color='white' />
              <Group gap='xs'>
                <Text className='font-playfair' fz={16} fw={600} c='white'>
                  Lagos
                </Text>
                <Box
                  w={8}
                  h={8}
                  style={{ borderRadius: "50%", backgroundColor: "#fff" }}
                />
                <Text className='font-playfair' fz={16} fw={600} c='white'>
                  Abuja
                </Text>
                <Box
                  w={8}
                  h={8}
                  style={{ borderRadius: "50%", backgroundColor: "#fff" }}
                />
                <Text className='font-playfair' fz={16} fw={600} c='white'>
                  Porthacourt
                </Text>
              </Group>
            </Group>

            <Group gap='sm' mt='auto'>
              <a href={SOCIAL_MEDIA.TIKTOK} target='_blank'>
                <IconBrandTiktok size={20} color='white' />
              </a>
              <a href={SOCIAL_MEDIA.YOUTUBE} target='_blank'>
                <IconBrandYoutube size={20} color='white' />
              </a>
            </Group>
          </Stack>
        </Paper>

        <Paper flex={0.75} p='lg' radius='lg' withBorder bg='black' w='100%'>
          <Stack gap='xl' mih={300}>
            <Stack>
              <Title
                order={3}
                className='font-playfair'
                fz={24}
                fw={600}
                c='white'
              >
                Join 200+ Subscribers
              </Title>
              <Text fz={15} c='rgba(255, 255, 255, 0.70)'>
                Sign up to receive email updates on latest loops, available art
                prints and more.
              </Text>
            </Stack>

            <Group gap={0} wrap='nowrap' align='stretch' mt='md' maw={400}>
              <TextInput
                placeholder='Enter email address'
                size='md'
                radius={0}
                styles={{
                  root: { flex: 1 },
                  input: {
                    backgroundColor: "rgba(255, 255, 255, 0.28)",
                    borderColor: "rgba(255, 255, 255, 0.25)",
                    color: "white",
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                  },
                }}
              />

              <Button
                size='md'
                radius={0}
                color='#0B3359'
                className='font-playfair!'
                styles={{
                  root: {
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  },
                }}
              >
                Subscribe
              </Button>
            </Group>

            <Group gap='sm' mt='auto'>
              <a href={SOCIAL_MEDIA.TIKTOK} target='_blank'>
                <IconBrandTiktok size={20} color='white' />
              </a>
              <a href={SOCIAL_MEDIA.YOUTUBE} target='_blank'>
                <IconBrandYoutube size={20} color='white' />
              </a>
            </Group>
          </Stack>
        </Paper>
      </Flex>
    </Container>
  );
}
