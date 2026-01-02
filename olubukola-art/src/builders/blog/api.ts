import { sanityClient } from "../client";
import {
  AllAuthorsQueryResult,
  AllPostCategoriesQueryResult,
  AllPostsQueryResult,
  AuthorBySlugQueryResult,
  PostBySlugQueryResult,
  PostCategoryBySlugQueryResult,
  PostsByAuthorQueryResult,
  PostsByCategoryQueryResult,
  RecentPostsQueryResult,
} from "../sanity.types";
import {
  allPostsQuery,
  postBySlugQuery,
  allPostCategoriesQuery,
  postCategoryBySlugQuery,
  allAuthorsQuery,
  authorBySlugQuery,
  recentPostsQuery,
  postsByCategoryQuery,
  postsByAuthorQuery,
} from "./queries";

export const blogApi = {
  async getAllPosts(): Promise<AllPostsQueryResult> {
    try {
      const posts = await sanityClient.fetch(allPostsQuery);
      return posts;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw new Error("Failed to fetch blog posts");
    }
  },

  async getPostBySlug(slug: string): Promise<PostBySlugQueryResult> {
    try {
      const post = await sanityClient.fetch(postBySlugQuery, {
        slug,
      });
      return post;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw new Error("Failed to fetch blog post");
    }
  },

  async getRecentPosts(limit: number = 6): Promise<RecentPostsQueryResult> {
    try {
      const posts = await sanityClient.fetch(recentPostsQuery, {
        limit,
      });
      return posts;
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      throw new Error("Failed to fetch recent posts");
    }
  },

  async getPostsByCategory(
    categoryId: string
  ): Promise<PostsByCategoryQueryResult> {
    try {
      const posts = await sanityClient.fetch(postsByCategoryQuery, {
        categoryId,
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      throw new Error("Failed to fetch posts by category");
    }
  },

  async getPostsByAuthor(authorId: string): Promise<PostsByAuthorQueryResult> {
    try {
      const posts = await sanityClient.fetch(postsByAuthorQuery, {
        authorId,
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts by author:", error);
      throw new Error("Failed to fetch posts by author");
    }
  },
};

export const authorApi = {
  async getAllAuthors(): Promise<AllAuthorsQueryResult> {
    try {
      const authors = await sanityClient.fetch(allAuthorsQuery);
      return authors;
    } catch (error) {
      console.error("Error fetching authors:", error);
      throw new Error("Failed to fetch authors");
    }
  },

  async getAuthorBySlug(slug: string): Promise<AuthorBySlugQueryResult> {
    try {
      const author = await sanityClient.fetch(authorBySlugQuery, {
        slug,
      });
      return author;
    } catch (error) {
      console.error("Error fetching author by slug:", error);
      throw new Error("Failed to fetch author");
    }
  },
};

export const postCategoryApi = {
  async getAllCategories(): Promise<AllPostCategoriesQueryResult> {
    try {
      const categories = await sanityClient.fetch(allPostCategoriesQuery);
      return categories;
    } catch (error) {
      console.error("Error fetching post categories:", error);
      throw new Error("Failed to fetch post categories");
    }
  },

  async getCategoryBySlug(
    slug: string
  ): Promise<PostCategoryBySlugQueryResult | null> {
    try {
      const category = await sanityClient.fetch(postCategoryBySlugQuery, {
        slug,
      });
      return category;
    } catch (error) {
      console.error("Error fetching post category by slug:", error);
      throw new Error("Failed to fetch post category");
    }
  },
};
