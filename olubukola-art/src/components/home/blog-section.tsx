import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconBookmark, IconHeart } from "@tabler/icons-react";
import { SectionTitle } from "@/components/section-title";
import { formatReadTime } from "@/utils/formatters";
import { SectionTabs } from "@/components/shared/section-tabs";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES } from "@/utils/enums";
import { usePosts } from "@/builders";
import type { BlogPostProps } from "@/types";
import type { AllPostsQueryResult } from "@/builders/sanity.types";

const transformPostApi = (post: AllPostsQueryResult[0]): BlogPostProps => ({
  id: post?._id || "",
  title: post?.title || "",
  excerpt: post?.excerpt || "Read more about this post...",
  image: post?.main_image?.url
    ? post.main_image.url
    : "/images/blog/default.jpg",
  date: post?._createdAt
    ? new Date(post._createdAt).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date not available",
  readTime: 5,
});

export function BlogSection() {
  const { data: posts, isPlaceholderData } = usePosts();
  const blogPosts = posts?.map(transformPostApi) || [];

  return (
    <Container
      size='full'
      maw={MAX_WIDTH}
      py={100}
      hidden={!isPlaceholderData && !posts?.length}
    >
      <SectionTitle
        subtitle='OUR TOPPEST ACHIEVEMENT GIST'
        title='Blog'
        id={PAGES.BLOG}
        skeleton={isPlaceholderData}
      />

      <SectionTabs
        defaultValue='all'
        mt={50}
        tabs={[
          { value: "all", label: "All" },
          { value: "2026-2025", label: "2026-2025" },
          { value: "2024-2023", label: "2024-2023" },
          { value: "2022-2021", label: "2022-2021" },
          { value: "2018-2017", label: "2018-2017" },
          { value: "2016-2010", label: "2016-2010" },
        ]}
      >
        <Tabs.Panel value='all' pt='xl'>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing='lg'>
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                shadow='none'
                padding='lg'
                radius='sm'
                withBorder
              >
                <Card.Section inheritPadding pt='lg'>
                  <Box
                    style={{
                      height: 250,
                      backgroundColor: "#f0f0f0",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={post.image}
                      h={250}
                      w='100%'
                      maw={520}
                      mx='auto'
                      alt={post.title}
                      fit='cover'
                      radius='sm'
                    />
                    <ActionIcon
                      variant='transparent'
                      color='white'
                      radius='xl'
                      size='lg'
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                      aria-label='Save post'
                    >
                      <IconHeart size={18} />
                    </ActionIcon>
                  </Box>
                </Card.Section>

                <Stack gap='md' mt='md' h='100%'>
                  <Title order={4} className='font-playfair' fz={24} fw={600}>
                    {post.title}
                  </Title>
                  <Text fz={15} c='gray.6'>
                    {post.excerpt}
                  </Text>
                  <Group gap='xs'>
                    <Text fz={14} c='red.6'>
                      {post.date}
                    </Text>
                    <Box
                      w={6}
                      h={6}
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "#D1410C",
                      }}
                    />
                    <Text fz={14} c='red.6'>
                      {formatReadTime(post.readTime)}
                    </Text>
                  </Group>
                  <Button
                    variant='light'
                    color='gray'
                    radius='lg'
                    w='fit-content'
                    leftSection={<IconBookmark size={18} />}
                    mt='auto'
                  >
                    Read Post
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Tabs.Panel>
      </SectionTabs>
    </Container>
  );
}
