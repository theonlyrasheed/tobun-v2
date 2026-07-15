import { MAX_WIDTH } from "@/utils/constants";
import {
  Group,
  Button,
  Container,
  Text,
  Popover,
  Burger,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { IconPhoneCall } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PAGES } from "@/utils/enums";
import { MakeEnquiryModal } from "@/components/modals/make-enquiry";

export function Header() {
  const navItems: { label: string; to: string; hash?: string }[] = [
    { label: "Home", to: PAGES.HOME },
    { label: "About Us", to: PAGES.ABOUT },
    { label: "Services", to: PAGES.HOME, hash: PAGES.SERVICES },
    { label: "Gallery", to: PAGES.GALLERY },
    { label: "Blog", to: PAGES.HOME, hash: PAGES.BLOG },
    { label: "FAQs", to: PAGES.HOME, hash: PAGES.FAQS },
  ];
  const [opened, setOpened] = useState(false);
  const [enquiryOpened, setEnquiryOpened] = useState(false);

  const toggle = (value?: boolean) => {
    setOpened((prev) => (typeof value === "boolean" ? value : !prev));
  };

  return (
    <header className="bg-black border-b border-gray-700">
      <Container size="full" py="md" maw={MAX_WIDTH}>
        <Group justify="space-between">
          <Text
            className="font-playball"
            fz={24}
            fw={400}
            c="white"
            style={{ letterSpacing: "1.44px" }}
          >
            OlubukolaArt
          </Text>

          {/* Desktop nav */}
          <Group gap="xl" visibleFrom="lg">
            <Group gap="lg" visibleFrom="lg">
              {navItems.map((item) => (
                <Text
                  key={item.label}
                  component={Link}
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  className="font-segoe cursor-pointer hover:text-purple-300 transition-colors"
                  fz={16}
                  fw={400}
                  c="white"
                  style={{ letterSpacing: "1.20px" }}
                >
                  {item.label}
                </Text>
              ))}
            </Group>

            <Button
              color="purple"
              radius="xs"
              rightSection={<IconPhoneCall size={18} />}
              onClick={() => setEnquiryOpened(true)}
            >
              Contact Us
            </Button>
          </Group>

          {/* Mobile nav */}
          <Group hiddenFrom="lg">
            <Popover
              radius="md"
              trapFocus={false}
              transitionProps={{
                transition: "pop-top-left",
              }}
              opened={opened}
              onChange={toggle}
              classNames={{
                dropdown: "bg-white/70! mt-4 left-1/2 border-none!",
              }}
              styles={{
                dropdown: {
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                },
              }}
              position="bottom-end"
              withArrow={false}
            >
              <Popover.Target>
                <Burger
                  hiddenFrom="lg"
                  opened={opened}
                  onClick={() => toggle(!opened)}
                  aria-label="Toggle navigation"
                  transitionDuration={500}
                  className="relative"
                  size="md"
                  color="white"
                />
              </Popover.Target>

              <Popover.Dropdown
                className="rounded-xl shadow-2xl"
                style={{
                  width: "min(75vw,300px)",
                }}
              >
                <Stack py={10}>
                  {navItems.map((item) => (
                    <UnstyledButton
                      key={item.label}
                      component={Link}
                      to={item.to}
                      {...(item.hash ? { hash: item.hash } : {})}
                      onClick={() => toggle(false)}
                      className="px-4 py-3 text-left hover:bg-black/5 transition-colors w-full"
                    >
                      <Text className="font-segoe" fz={16} c="black">
                        {item.label}
                      </Text>
                    </UnstyledButton>
                  ))}

                  <Button
                    onClick={() => {
                      toggle(false);
                      setEnquiryOpened(true);
                    }}
                    className="transition-colors"
                  >
                    <Group justify="space-between" wrap="nowrap" w="100%">
                      <Text className="font-segoe" fz={16} c="white" fw={600}>
                        Contact Us
                      </Text>
                      <IconPhoneCall size={18} />
                    </Group>
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Group>
      </Container>

      <MakeEnquiryModal
        opened={enquiryOpened}
        onClose={() => setEnquiryOpened(false)}
      />
    </header>
  );
}
