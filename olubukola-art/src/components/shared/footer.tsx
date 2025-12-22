import { Container, Group, Stack, Text, Divider } from "@mantine/core";
import { IconBrandTiktok, IconBrandYoutube } from "@tabler/icons-react";
import { MAX_WIDTH } from "@/utils/constants";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className='sm:sticky bottom-0 mt-auto'>
      <div className='bg-white text-black border-t border-gray-200'>
        <Container size='full' maw={MAX_WIDTH} py={50}>
          <div className='flex items-start justify-between gap-10'>
            {/* 4-column grid that actually spans the available width */}
            <div className='grid flex-1 grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              <Stack gap='sm'>
                <Text fz={18} fw={400} className='font-poppins' c='black'>
                  Help & Support
                </Text>
                <Stack gap={7}>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    Customer Care Support
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    How to Customize Art
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    How do I partner with you
                  </Text>
                </Stack>
              </Stack>

              <Stack gap='sm'>
                <Text fz={18} fw={400} className='font-poppins' c='black'>
                  Features
                </Text>
                <Stack gap={7}>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    Art
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    Blog
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    Services
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    Advertisement
                  </Text>
                </Stack>
              </Stack>

              <Stack gap='sm'>
                <Text fz={18} fw={400} className='font-poppins' c='black'>
                  Company
                </Text>
                <Stack gap={7}>
                  <Text
                    fz={14}
                    c='dimmed'
                    className='font-poppins'
                    component={Link}
                    to='/about'
                  >
                    About Us
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    Our Values
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    What we do
                  </Text>
                </Stack>
              </Stack>

              <Stack gap='sm'>
                <Text fz={18} fw={400} className='font-poppins' c='black'>
                  Contact us
                </Text>
                <Stack gap={7}>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    Olubukolaart@gmail.com
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    +2348148148813
                  </Text>
                  <Text fz={14} c='dimmed' className='font-poppins'>
                    Lagos, Abuja, Porthacourt
                  </Text>
                </Stack>
              </Stack>
            </div>

            {/* Social icons top-right (matches screenshot vibe) */}
            <Stack gap={10} align='flex-end'>
              <Group gap='md'>
                <IconBrandYoutube size={20} />
                <IconBrandTiktok size={20} />
              </Group>
              <Divider w={64} color='gray.3' />
            </Stack>
          </div>
        </Container>
      </div>

      {/* Bottom strip (black) */}
      <div className='bg-black text-white'>
        <Container size='full' maw={MAX_WIDTH} py={18}>
          <div className='relative flex flex-col items-center gap-4 sm:block'>
            <Text
              className='font-playball sm:text-left text-center'
              fz={18}
              fw={400}
              style={{ letterSpacing: "1.44px" }}
            >
              Olubukola's
              <br />
              Art Gallery
            </Text>

            <Text
              fz={14}
              c='rgba(255, 255, 255, 0.7)'
              className='font-poppins sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-center'
            >
              Olubukola art © {new Date().getFullYear()}. All Rights Reserved.
            </Text>
          </div>
        </Container>
      </div>
    </footer>
  );
}
