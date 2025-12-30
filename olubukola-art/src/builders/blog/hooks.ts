import { useQuery } from "@tanstack/react-query";
import { blogApi, authorApi, postCategoryApi } from "./api";

// Blog post hooks
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: blogApi.getAllPosts,
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => blogApi.getPostBySlug(slug),
    enabled: !!slug,
  });
};

export const useRecentPosts = (limit: number = 6) => {
  return useQuery({
    queryKey: ["posts", "recent", limit],
    queryFn: () => blogApi.getRecentPosts(limit),
  });
};

export const usePostsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["posts", "category", categoryId],
    queryFn: () => blogApi.getPostsByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const usePostsByAuthor = (authorId: string) => {
  return useQuery({
    queryKey: ["posts", "author", authorId],
    queryFn: () => blogApi.getPostsByAuthor(authorId),
    enabled: !!authorId,
  });
};

// Author hooks
export const useAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: authorApi.getAllAuthors,
  });
};

export const useAuthor = (slug: string) => {
  return useQuery({
    queryKey: ["author", slug],
    queryFn: () => authorApi.getAuthorBySlug(slug),
    enabled: !!slug,
  });
};

// Post category hooks
export const usePostCategories = () => {
  return useQuery({
    queryKey: ["post-categories"],
    queryFn: postCategoryApi.getAllCategories,
  });
};

export const usePostCategory = (slug: string) => {
  return useQuery({
    queryKey: ["post-category", slug],
    queryFn: () => postCategoryApi.getCategoryBySlug(slug),
    enabled: !!slug,
  });
};
