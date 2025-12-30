import {
  sanityClient,
  type Post,
  type Author,
  type Post_category,
} from "../client";
import { BLOG_QUERIES } from "./queries";

// Blog API functions
export const blogApi = {
  /**
   * Get all blog posts
   */
  async getAllPosts(): Promise<Post[]> {
    try {
      const posts = await sanityClient.fetch(BLOG_QUERIES.ALL_POSTS);
      return posts;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw new Error("Failed to fetch blog posts");
    }
  },

  /**
   * Get post by slug
   */
  async getPostBySlug(slug: string): Promise<Post | null> {
    try {
      const post = await sanityClient.fetch(BLOG_QUERIES.POST_BY_SLUG, {
        slug,
      });
      return post;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw new Error("Failed to fetch blog post");
    }
  },

  /**
   * Get recent posts (limited)
   */
  async getRecentPosts(limit: number = 6): Promise<Post[]> {
    try {
      const posts = await sanityClient.fetch(
        `*[_type == "post"] | order(_createdAt desc) [0...${limit}] {
          _id,
          _type,
          title,
          slug,
          excerpt,
          _createdAt,
          author->{
            _id,
            name,
            slug,
            image {
              asset->{
                _id,
                url
              }
            }
          },
          categories[]->{
            _id,
            title,
            slug
          },
          main_image {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt,
            hotspot,
            crop
          }
        }`
      );
      return posts;
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      throw new Error("Failed to fetch recent posts");
    }
  },

  /**
   * Get posts by category
   */
  async getPostsByCategory(categoryId: string): Promise<Post[]> {
    try {
      const posts = await sanityClient.fetch(
        `*[_type == "post" && $categoryId in categories[]._ref] | order(_createdAt desc) {
          _id,
          _type,
          title,
          slug,
          excerpt,
          _createdAt,
          author->{
            _id,
            name,
            slug,
            image {
              asset->{
                _id,
                url
              }
            }
          },
          categories[]->{
            _id,
            title,
            slug
          },
          main_image {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt,
            hotspot,
            crop
          }
        }`,
        { categoryId }
      );
      return posts;
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      throw new Error("Failed to fetch posts by category");
    }
  },

  /**
   * Get posts by author
   */
  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    try {
      const posts = await sanityClient.fetch(
        `*[_type == "post" && author._ref == $authorId] | order(_createdAt desc) {
          _id,
          _type,
          title,
          slug,
          excerpt,
          _createdAt,
          author->{
            _id,
            name,
            slug,
            image {
              asset->{
                _id,
                url
              }
            }
          },
          categories[]->{
            _id,
            title,
            slug
          },
          main_image {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt,
            hotspot,
            crop
          }
        }`,
        { authorId }
      );
      return posts;
    } catch (error) {
      console.error("Error fetching posts by author:", error);
      throw new Error("Failed to fetch posts by author");
    }
  },
};

// Author API functions
export const authorApi = {
  /**
   * Get all authors
   */
  async getAllAuthors(): Promise<Author[]> {
    try {
      const authors = await sanityClient.fetch(BLOG_QUERIES.ALL_AUTHORS);
      return authors;
    } catch (error) {
      console.error("Error fetching authors:", error);
      throw new Error("Failed to fetch authors");
    }
  },

  /**
   * Get author by slug
   */
  async getAuthorBySlug(slug: string): Promise<Author | null> {
    try {
      const author = await sanityClient.fetch(BLOG_QUERIES.AUTHOR_BY_SLUG, {
        slug,
      });
      return author;
    } catch (error) {
      console.error("Error fetching author by slug:", error);
      throw new Error("Failed to fetch author");
    }
  },
};

// Post Category API functions
export const postCategoryApi = {
  /**
   * Get all post categories
   */
  async getAllCategories(): Promise<Post_category[]> {
    try {
      const categories = await sanityClient.fetch(
        BLOG_QUERIES.ALL_POST_CATEGORIES
      );
      return categories;
    } catch (error) {
      console.error("Error fetching post categories:", error);
      throw new Error("Failed to fetch post categories");
    }
  },

  /**
   * Get post category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Post_category | null> {
    try {
      const category = await sanityClient.fetch(
        BLOG_QUERIES.POST_CATEGORY_BY_SLUG,
        { slug }
      );
      return category;
    } catch (error) {
      console.error("Error fetching post category by slug:", error);
      throw new Error("Failed to fetch post category");
    }
  },
};
