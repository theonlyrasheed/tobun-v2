import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { MAX_WIDTH } from "@/utils/constants";
import clsx from "clsx";
import { PAGES } from "@/utils/enums";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <Stack gap={0}>
      <Image src="/svgs/about-us-hero.svg" alt="About Hero" />
      <Container size="full" maw={MAX_WIDTH} py={{ base: 30, md: 60 }}>
        {/* Our Little Story */}
        <Box className="relative">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Stack gap={6}>
              <Text
                className="font-playfair"
                fz={{ base: 18, md: 20 }}
                fw={400}
                c="gray.7"
                style={{ letterSpacing: "0.96px" }}
              >
                OUR LITTLE STORY
              </Text>
              <Title
                order={1}
                className="font-segoe"
                fz={{ base: 28, md: 44 }}
                fw={800}
                style={{ letterSpacing: "1.2px" }}
              >
                Why Art and Why Not
              </Title>
            </Stack>

            <Button
              component={Link}
              to="/"
              color="dark"
              radius="sm"
              leftSection={<IconArrowLeft size={16} />}
              className="shrink-0"
            >
              Back
            </Button>
          </Group>

          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            spacing={{ base: 30, md: 60 }}
            mt={30}
          >
            <Box>
              <Image
                src="/images/paint-on-bg.png"
                alt="Paint on background"
                radius="sm"
                w="100%"
              />
            </Box>

            <Stack gap="md">
              <Text fz={14} c="dark.7" style={{ lineHeight: 1.8 }}>
                Do you know that art is more than colors on a canvas or beads on
                a thread. It’s a language of the soul, a mirror of our emotions,
                and a bridge between hearts. It empowers us to see the world
                differently, to process feelings we can’t always put into words,
                and to connect with others in ways that go beyond conversation.
                Engaging with art reshapes every aspect of life, especially in
                the… It sharpens the mind, nurtures creativity, and inspires
                problem-solving. It strengthens relationships, creating intimacy
                through shared experiences. It reduces stress, lifts spirits,
                and builds resilience by giving people the mental clarity and
                confidence to thrive. In short, art doesn’t just decorate life;
                it transforms it.
              </Text>

              <Text fz={14} c="dark.7" style={{ lineHeight: 1.8 }}>
                At Olubukola Art, we believe that everyone deserves to
                experience this power. Our sessions, workshops, and experiences
                are designed to be more than entertainment; they are safe spaces
                where you can explore, express, and grow. Here, you can
                reconnect with yourself, bond with others, and discover the joy
                and healing that only art can bring. With Olubukola Art, you
                don’t just witness creativity{" "}
                <Text component="span" c="red.7" fw={700}>
                  YOU LIVE IT
                </Text>
                . You embrace it. You are empowered by it. And you do so in a
                space where safety, respect, and authenticity are at the heart
                of everything we do. Because true transformation through art
                happens not just in the act of creation, but in the environment
                that nurtures it, and that environment, that safe space, is
                ours.
              </Text>
            </Stack>
          </SimpleGrid>
        </Box>

        <Divider my={{ base: 40, md: 60 }} color="gray.2" />

        {/* Benefits / Core values */}
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing={{ base: 35, md: 70 }}
          id={PAGES.CORE_VALUES}
        >
          <Stack gap="xl">
            <Stack gap={6}>
              <Text
                className="font-playfair"
                fz={{ base: 18, md: 20 }}
                fw={400}
                c="gray.7"
                style={{ letterSpacing: "0.96px" }}
              >
                BENEFIT OF OUR SERVICE
              </Text>
              <Title
                order={2}
                className="font-segoe"
                fz={{ base: 28, md: 44 }}
                fw={800}
                style={{ letterSpacing: "1.2px" }}
              >
                Our Core Values
              </Title>
            </Stack>

            <Text fz={14} c="dark.7" style={{ lineHeight: 1.8, maxWidth: 560 }}>
              We’re honored to have you with us. Our mission is simple: to
              deliver meaningful experiences that foster connection, creativity,
              and well-being. Every session, every moment, is crafted with care
              and quality to ensure you leave feeling inspired, refreshed, and
              connected. Thank you for trusting us to make your experience
              unforgettable. We honor our core values, as well as our esteemed
              customers.
            </Text>

            <Stack gap="lg" pt={{ base: 10, md: 20 }}>
              <Title
                order={3}
                className="font-inter!"
                fz={{ base: 28, md: 40 }}
                fw={900}
              >
                Thank you for choosing us always
              </Title>

              <Box className="flex flex-wrap sm:flex-nowrap items-center justify-center mt-[10px]">
                <StatBadge value="600+" label="Customers" />
                <StatBadge value="18+" label="Countries" />
                <StatBadge value="34+" label="Commissions" />
              </Box>

              <Box className="flex justify-center -mt-8 md:-mt-14">
                <Image
                  src="/svgs/hand-with-love.svg"
                  alt="Hand with love"
                  h={210}
                  w="auto"
                  fit="contain"
                  className="opacity-90"
                />
              </Box>
            </Stack>
          </Stack>

          <Box className="relative">
            {/* Background panel */}
            <Box
              className={clsx(
                "relative sm:ml-auto rounded-2xl overflow-hidden min-h-[360px] p-10 flex justify-end items-center",
                "w-full md:w-[70%]",
              )}
              style={{
                backgroundImage: "url(/images/value-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* light overlay so pills remain readable */}
              <Box className="absolute inset-0 bg-white/30" />

              <Stack
                gap="md"
                className="relative w-full sm:w-[65%] mx-auto md:mx-0 md:w-[70%]"
                style={{ zIndex: 1 }}
              >
                <ValuePill
                  label="Trustworthy"
                  className="bg-[#6d0f44] text-white"
                />
                <ValuePill
                  label="Attention to Details"
                  className="bg-[#d51f2b] text-white"
                />
                <ValuePill
                  label="Integrity"
                  className="bg-[#4c2a7a] text-white"
                />
                <ValuePill
                  label="Top-notch Work"
                  className="bg-[#0b5a86] text-white"
                />
                <ValuePill
                  label="Fast Deliveries"
                  className="bg-[#8b8f14] text-white"
                />
              </Stack>
            </Box>

            {/* Cards (overlay on desktop, stacked on mobile) */}
            <Stack
              gap="lg"
              className={clsx(
                "mt-6 md:mt-0 md:absolute md:left-[28px] md:top-6",
                "w-full md:w-[45%]",
              )}
            >
              <ValueCard
                number="01"
                title="Quality Prints"
                description="Crafted for clarity. Printed with quality"
              />
              <ValueCard
                number="02"
                title="Expertly Created"
                description="Where quality meets every detail"
              />
              <ValueCard
                number="03"
                title="Authenticity"
                description="True to craft. True to quality."
              />
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Stack>
  );
}

function ValuePill({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <Box
      className={[
        "rounded-tl-xl rounded-br-xl px-5 py-3 text-center font-segoe font-bold shadow-sm",
        className ?? "",
      ].join(" ")}
      style={{ letterSpacing: "0.6px" }}
    >
      {label}
    </Box>
  );
}

function ValueCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Paper radius="md" p="lg" withBorder shadow="xs" className="bg-white">
      <Group align="flex-start" wrap="nowrap" gap="md">
        <Text
          className="font-segoe"
          fz={22}
          fw={800}
          c="gray.6"
          style={{ lineHeight: 1 }}
        >
          {number}
        </Text>
        <Stack gap={6}>
          <Text className="font-segoe" fw={800} fz={18} c="dark.8">
            {title}
          </Text>
          <Text fz={13} c="gray.7" style={{ lineHeight: 1.5 }}>
            {description}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}

// function StatBadge({ value, label }: { value: string; label: string }) {
//   const id = `stat-path-${label.toLowerCase().replace(/\s+/g, "-")}-${value.replace(
//     /\W+/g,
//     "",
//   )}`;

//   // const ringText = `${label}  ${label}  ${label}  ${label}  ${label}  ${label}`;
//   const gap = "        "; // 8 spaces — tweak this to widen/narrow the gap
//   const ringText = `${label}${gap}${label}${gap}${label}${gap}`;

//   return (
//     <Box className="relative w-[220px] h-[220px] md:w-[240px] md:h-[240px]">
//       <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">
//         {/* outer ring */}
//         <circle cx="100" cy="100" r="78" fill="#B9C1C4" />
//         {/* inner cutout */}
//         <circle cx="100" cy="100" r="54" fill="white" />

//         <defs>
//           <path
//             id={id}
//             d="M 100,100 m -64,0 a 64,64 0 1,1 128,0 a 64,64 0 1,1 -128,0"
//           />
//         </defs>

//         <text
//           fill="#111827"
//           fontSize="12"
//           className="rotating"
//           style={
//             {
//               // letterSpacing: "6px",
//             }
//           }
//         >
//           <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
//             {ringText}
//           </textPath>
//         </text>
//       </svg>

//       <Box className="absolute inset-0 flex items-center justify-center">
//         <Text
//           className="font-segoe"
//           fw={900}
//           fz={{ base: 24, md: 32 }}
//           c="dark.9"
//         >
//           {value}
//         </Text>
//       </Box>
//     </Box>
//   );
// }
function StatBadge({ value, label }: { value: string; label: string }) {
  const id = `stat-path-${label.toLowerCase().replace(/\s+/g, "-")}-${value.replace(
    /\W+/g,
    "",
  )}`;

  const offsets = ["16.667%", "50%", "83.333%"];

  return (
    <Box className="relative w-[220px] h-[220px] md:w-[240px] md:h-[240px]">
      <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">
        <circle cx="100" cy="100" r="78" fill="#B9C1C4" />
        <circle cx="100" cy="100" r="54" fill="white" />

        <defs>
          <path
            id={id}
            d="M 100,100 m -64,0 a 64,64 0 1,1 128,0 a 64,64 0 1,1 -128,0"
          />
        </defs>

        <g>
          <text
            fill="#111827"
            fontSize="14"
            letterSpacing="3px"
            className="rotating"
          >
            {offsets.map((offset) => (
              <textPath
                key={offset}
                href={`#${id}`}
                startOffset={offset}
                textAnchor="middle"
              >
                {label}
              </textPath>
            ))}
          </text>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="8s"
            repeatCount="indefinite"
          />
        </g>
      </svg>

      <Box className="absolute inset-0 flex items-center justify-center">
        <Text
          className="font-segoe"
          fw={900}
          fz={{ base: 24, md: 32 }}
          c="dark.9"
        >
          {value}
        </Text>
      </Box>
    </Box>
  );
}
