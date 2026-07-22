import { createFileRoute } from "@tanstack/react-router";
import { Box, Container, Image, SimpleGrid, Stack, Tabs, Text } from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SectionTitle } from "@/components/section-title";
import { SectionTabs } from "@/components/shared/section-tabs";
import { BlogPostCard } from "@/components/blog/post-card";
import { MAX_WIDTH } from "@/utils/constants";
import { usePostsInfinite, usePostsByYearInfinite } from "@/builders/blog/hooks";
import { optimizeImageUrl } from "@/utils/sanity";
import type { AllPostsQueryResult } from "@/builders/sanity.types";
import type { BlogPostProps } from "@/types";

const POSTS_PER_PAGE = 9;
// Year tabs go back this far; adjust if the blog needs older archives.
const EARLIEST_YEAR = 2023;

const transformPostApi = (post: AllPostsQueryResult[0]): BlogPostProps => ({
  id: post._id,
  slug: post.slug,
  title: post.title,
  authorName: post.author?.name ?? undefined,
  authorImage: optimizeImageUrl(post.author?.image?.url, { width: 150 }) ?? undefined,
  excerpt: post.excerpt || "",
  image:
    optimizeImageUrl(post.main_image?.url, { width: 700 }) ??
    `https://picsum.photos/549/622?random=${post._id}`,
  date: post._createdAt,
  readTime: post.readingTime,
});

export const Route = createFileRoute("/blog/")({
  ssr: true,
  component: BlogIndex,
});

function BlogIndex() {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const list: number[] = [];
    for (let y = currentYear; y >= EARLIEST_YEAR; y--) list.push(y);
    return list;
  }, []);

  const tabs = useMemo(
    () => [
      { value: "all", label: "All" },
      ...years.map((y) => ({ value: String(y), label: String(y) })),
    ],
    [years]
  );

  const [activeTab, setActiveTab] = useState("all");
  const isAllTab = activeTab === "all";
  const activeYear = isAllTab ? NaN : Number(activeTab);

  // Both hooks are always called (rules of hooks); whichever tab is inactive
  // is simply disabled internally, so only one ever actually fetches.
  const allInfinite = usePostsInfinite(POSTS_PER_PAGE);
  const yearInfinite = usePostsByYearInfinite(activeYear, POSTS_PER_PAGE);
  const infiniteQuery = isAllTab ? allInfinite : yearInfinite;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    infiniteQuery;

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.data.map(transformPostApi)) ?? [],
    [data]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <Stack gap={0} flex={1}>
      <Image src='/svgs/blog-hero.svg' alt='Blog Hero' loading='eager' />
      <Container
        size='full'
        py={{ base: 30, md: 60 }}
        w='100%'
        maw={MAX_WIDTH}
      >
        <Stack gap={0} mb={20}>
          <SectionTitle
            subtitle='OUR TOPPEST ACHIEVEMENT GIST'
            title='All Blog Posts'
            skeleton={isLoading}
          />
        </Stack>

        <SectionTabs
          value={activeTab}
          onChange={(value) => setActiveTab(value || "all")}
          defaultValue='all'
          tabs={tabs}
          mih={400}
        >
          <Tabs.Panel value={activeTab} pt='xl' className='w-full'>
            {posts.length === 0 && !isLoading ? (
              <Text c='dimmed' ta='center' py={60}>
                {isAllTab
                  ? "No posts yet — check back soon."
                  : `No posts published in ${activeTab} yet.`}
              </Text>
            ) : (
              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing='lg'>
                {posts.map((post, idx) => (
                  <Box
                    key={post.id}
                    data-aos='fade-up'
                    data-aos-delay={Math.min(idx * 70, 420)}
                  >
                    <BlogPostCard post={post} skeleton={isLoading} />
                  </Box>
                ))}
              </SimpleGrid>
            )}

            {hasNextPage && (
              <Box className='flex justify-center py-8' ref={loadMoreRef}>
                <Box className='text-center'>
                  {isFetchingNextPage ? (
                    <Box className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto' />
                  ) : (
                    <p className='text-gray-500'>Loading more...</p>
                  )}
                </Box>
              </Box>
            )}
          </Tabs.Panel>
        </SectionTabs>
      </Container>
    </Stack>
  );
}
