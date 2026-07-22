import { Button, Container, SimpleGrid, Stack } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { SectionTitle } from "@/components/section-title";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES } from "@/utils/enums";
import { BlogPostCard } from "@/components/blog/post-card";
import { useRecentPosts } from "@/builders/blog/hooks";
import type { BlogPostProps } from "@/types";
import { optimizeImageUrl } from "@/utils/sanity";

const LATEST_POSTS_COUNT = 3;

export function BlogSection() {
  const { data: posts = [], isPlaceholderData } = useRecentPosts(
    LATEST_POSTS_COUNT
  );

  const cards: BlogPostProps[] = posts.map((p: any) => ({
    id: p._id,
    slug: p.slug,
    title: p.title,
    authorName: p.author?.name ?? undefined,
    authorImage: optimizeImageUrl(p.author?.image?.url, { width: 150 }) ?? undefined,
    excerpt: p.excerpt || "",
    image:
      optimizeImageUrl(p.main_image?.url, { width: 700 }) ??
      `https://picsum.photos/549/622?random=${p._id}`,
    date: p._createdAt,
    readTime: p.readingTime ?? 1,
  }));

  return (
    <Container size='full' maw={MAX_WIDTH} py={100}>
      <SectionTitle
        subtitle='OUR TOPPEST ACHIEVEMENT GIST'
        title='Blog'
        id={PAGES.BLOG}
      />

      <Stack mt={30} gap={40} align='center'>
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing='lg' w='100%'>
          {cards.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              skeleton={isPlaceholderData}
            />
          ))}
        </SimpleGrid>

        <Button
          component={Link}
          to='/blog'
          size='md'
          color='dark'
          radius='sm'
        >
          View All Posts
        </Button>
      </Stack>
    </Container>
  );
}
