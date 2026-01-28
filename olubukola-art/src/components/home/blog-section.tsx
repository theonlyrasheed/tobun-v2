import { Container, SimpleGrid, Tabs, Text } from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { SectionTabs } from "@/components/shared/section-tabs";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES } from "@/utils/enums";
import { BlogPostCard } from "@/components/blog/post-card";
import { usePostCategories, usePosts } from "@/builders/blog/hooks";
import type { BlogPostProps } from "@/types";

export function BlogSection() {
  const { data: posts = [], isPlaceholderData } = usePosts();
  const { data: categories = [] } = usePostCategories();

  const toCard = (p: any, i: number): BlogPostProps => ({
    id: p._id,
    slug: p.slug,
    title: p.title,
    authorName: p.author?.name ?? undefined,
    authorImage: p.author?.image?.url ?? undefined,
    excerpt: p.excerpt || "",
    image:
      p.main_image?.url ?? `https://picsum.photos/549/622?random=${i + 10}`,
    date: p._createdAt,
    readTime: (p as any).readingTime ?? 1,
  });

  const categoryTabs = categories
    .filter((cat) =>
      posts.some((p) => p.categories?.some((pc) => pc._id === cat._id)),
    )
    .map((cat) => ({
      value: cat._id,
      label: cat.title || "Category",
    }));

  const tabs = [{ value: "all", label: "All" }, ...categoryTabs];

  const getCardsForCategory = (categoryId: string) => {
    const filtered =
      categoryId === "all"
        ? posts
        : posts.filter((p) =>
            p.categories?.some((pc) => pc._id === categoryId),
          );
    return filtered.map(toCard);
  };

  return (
    <Container size='full' maw={MAX_WIDTH} py={100}>
      <SectionTitle
        subtitle='OUR TOPPEST ACHIEVEMENT GIST'
        title='Blog'
        id={PAGES.BLOG}
      />

      <SectionTabs defaultValue='all' mt={30} tabs={tabs}>
        {tabs.map((tab) => {
          const categoryCards = getCardsForCategory(tab.value);
          return (
            <Tabs.Panel key={tab.value} value={tab.value} pt='xl'>
              {categoryCards.length ? (
                <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing='lg'>
                  {categoryCards.map((post) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      skeleton={isPlaceholderData}
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <Text c='dimmed'>No posts in this category yet.</Text>
              )}
            </Tabs.Panel>
          );
        })}
      </SectionTabs>
    </Container>
  );
}
