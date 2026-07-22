import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getAllPosts,
  getPostBySlug,
  getRecentPosts,
  getPostsByCategory,
  getPostsByAuthor,
  getAllAuthors,
  getAuthorBySlug,
  getAllCategories,
  getCategoryBySlug,
  getPostsPaginated,
  getPostsByYearPaginated,
} from "./server-fns";
import { blogPosts, authors, postCategories } from "./placeholder";
import type { AllPostsQueryResult } from "../sanity.types";

// Blog post hooks
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    placeholderData: blogPosts,
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug({ data: slug }),
    enabled: !!slug,
    placeholderData: blogPosts.find((post) => post.slug === slug) || null,
  });
};

export const useRecentPosts = (limit: number = 6) => {
  const recentPosts = blogPosts
    .sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    )
    .slice(0, limit);
  return useQuery({
    queryKey: ["posts", "recent", limit],
    queryFn: () => getRecentPosts({ data: limit }),
    placeholderData: recentPosts,
  });
};

// Types for infinite query responses
interface InfinitePostsResponse {
  data: AllPostsQueryResult;
  hasMore: boolean;
  nextOffset: number;
}

// Infinite-scroll pagination for the /blog page ("All" tab)
export const usePostsInfinite = (limit: number = 9) => {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const data = await getPostsPaginated({
        data: { limit, offset: pageParam },
      });
      return {
        data,
        hasMore: data.length === limit,
        nextOffset: pageParam + limit,
      } as InfinitePostsResponse;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: InfinitePostsResponse) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });
};

// Infinite-scroll pagination for the /blog page (year tabs)
export const usePostsByYearInfinite = (year: number, limit: number = 9) => {
  return useInfiniteQuery({
    queryKey: ["posts", "year", year, "infinite"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const data = await getPostsByYearPaginated({
        data: { year, limit, offset: pageParam },
      });
      return {
        data,
        hasMore: data.length === limit,
        nextOffset: pageParam + limit,
      } as InfinitePostsResponse;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: InfinitePostsResponse) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
    enabled: Number.isFinite(year),
  });
};

export const usePostsByCategory = (categoryId: string) => {
  const categoryPosts = blogPosts.filter((post) =>
    post.categories?.some((cat) => cat._id === categoryId)
  );
  return useQuery({
    queryKey: ["posts", "category", categoryId],
    queryFn: () => getPostsByCategory({ data: categoryId }),
    enabled: !!categoryId,
    placeholderData: categoryPosts,
  });
};

export const usePostsByAuthor = (authorId: string) => {
  const authorPosts = blogPosts.filter((post) => post.author?._id === authorId);
  return useQuery({
    queryKey: ["posts", "author", authorId],
    queryFn: () => getPostsByAuthor({ data: authorId }),
    enabled: !!authorId,
    placeholderData: authorPosts,
  });
};

// Author hooks
export const useAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: getAllAuthors,
    placeholderData: authors,
  });
};

export const useAuthor = (slug: string) => {
  return useQuery({
    queryKey: ["author", slug],
    queryFn: () => getAuthorBySlug({ data: slug }),
    enabled: !!slug,
    placeholderData: authors.find((author) => author.slug === slug) || null,
  });
};

// Post category hooks
export const usePostCategories = () => {
  return useQuery({
    queryKey: ["post-categories"],
    queryFn: getAllCategories,
    placeholderData: postCategories,
  });
};

export const usePostCategory = (slug: string) => {
  return useQuery({
    queryKey: ["post-category", slug],
    queryFn: () => getCategoryBySlug({ data: slug }),
    enabled: !!slug,
    placeholderData:
      postCategories.find((category) => category._id === slug) || null,
  });
};
