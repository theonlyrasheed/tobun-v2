import { createFileRoute } from "@tanstack/react-router";
import { Container, SimpleGrid, Title } from "@mantine/core";

import { BlogPostCard } from "@/components/blog/post-card";
import { usePosts } from "@/builders/blog/hooks";
import type { BlogPostProps } from "@/types";

export const Route = createFileRoute("/blog/")({
  ssr: true,
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts = [] } = usePosts();

  const cards: BlogPostProps[] = posts.map((p, i) => ({
    id: p._id,
    slug: p.slug,
    title: p.title,
    authorName: p.author?.name ?? "",
    authorImage: p.author?.image?.url ?? "",
    excerpt: p.excerpt,
    image:
      p.main_image?.url ?? `https://picsum.photos/549/622?random=${i + 100}`,
    date: p._createdAt,
    readTime: p.readingTime,
  }));

  return (
    <Container size='full' maw={1200} py={60}>
      <Title order={2} mb='lg'>
        Blog
      </Title>
      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing='lg'>
        {cards.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
