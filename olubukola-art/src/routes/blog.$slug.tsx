import { createFileRoute } from "@tanstack/react-router";
import { Center, Loader, Text } from "@mantine/core";

import { BlogPostContent } from "@/components/blog/post-content";
import { usePost, usePosts } from "@/builders/blog/hooks";
import type { BlogPostProps } from "@/types";
import { getPostBySlug } from "@/builders/blog/server-fns";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/blog/$slug")({
  ssr: true,
  loader: async ({ params }) => {
    return await getPostBySlug({ data: params.slug });
  },
  head: ({ loaderData, params }) => {
    const post = loaderData as any;
    const title = post?.title
      ? `${loaderData.title} | Olubukola Art`
      : "Blog | Olubukola Art";
    const description = post?.excerpt || undefined;
    const image = post?.main_image?.url || undefined;

    return {
      meta: [
        ...seo({
          title,
          description,
          image,
          keywords: post?.categories?.map((c: any) => c.title).filter(Boolean).join(", "),
        }),
        { name: "og:url", content: `/blog/${params.slug}` },
        { name: "og:type", content: "article" },
      ],
    };
  },
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { slug } = Route.useParams();
  const { data, isLoading, isPlaceholderData } = usePost(slug);
  const { data: allPosts = [] } = usePosts();

  // With placeholderData, React Query can report isPlaceholderData=true while data is null
  // (e.g. slug not found in placeholders yet). Guard before accessing data.*.
  if (isLoading || (isPlaceholderData && !data)) {
    return (
      <Center py={80}>
        <Loader />
      </Center>
    );
  }

  if (!data) {
    return (
      <Center py={80}>
        <Text c='dimmed'>Post not found.</Text>
      </Center>
    );
  }

  const shareUrl =
    typeof window === "undefined" ? `/blog/${slug}` : window.location.href;

  const relatedPosts: BlogPostProps[] = (() => {
    const currentSlug = data.slug ?? slug;
    const currentCategoryId = data.categories?.[0]?._id;

    const candidates = allPosts
      .filter((p) => p.slug !== currentSlug)
      .sort(
        (a, b) =>
          new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
      );

    const sameCategory = currentCategoryId
      ? candidates.filter((p) =>
          p.categories?.some((c) => c._id === currentCategoryId),
        )
      : [];

    const picked = (sameCategory.length ? sameCategory : candidates).slice(
      0,
      4,
    );

    return picked.map((p, i) => ({
      id: p._id,
      slug: p.slug,
      title: p.title,
      authorName: p.author?.name ?? undefined,
      authorImage: p.author?.image?.url ?? undefined,
      excerpt: p.excerpt || "",
      image:
        p.main_image?.url ?? `https://picsum.photos/549/622?random=${i + 200}`,
      date: p._createdAt,
      readTime: (p as any).readingTime ?? 1,
    }));
  })();

  return (
    <BlogPostContent
      shareUrl={shareUrl}
      data={{
        title: data.title,
        author: data.author?.name ?? "Olubukola Art",
        authorImage: data.author?.image?.url,
        excerpt: data.excerpt || "",
        readingTime: data.readingTime,
        mainImage: data.main_image?.url,
        body: data.body,
        publishedAt: data._createdAt,
        category: data.categories?.[0]?.title,
        tags: data.categories
          ?.map((c: { title: string | "" }) => c.title)
          .filter((t: string | ""): t is string => Boolean(t)),
        relatedPosts,
      }}
    />
  );
}
