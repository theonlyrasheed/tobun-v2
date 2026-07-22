import { createServerFn } from "@tanstack/react-start";
import { blogApi, authorApi, postCategoryApi } from "./api";

// Blog server functions
export const getAllPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    return await blogApi.getAllPosts();
  }
);

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return (await blogApi.getPostBySlug(slug)) as any;
  });

export const getPostsPaginated = createServerFn({ method: "GET" })
  .inputValidator((params: { limit?: number; offset?: number } = {}) => ({
    limit: params.limit || 9,
    offset: params.offset || 0,
  }))
  .handler(async ({ data: { limit, offset } }) => {
    return await blogApi.getPostsPaginated(limit, offset);
  });

export const getPostsByYearPaginated = createServerFn({ method: "GET" })
  .inputValidator(
    (params: { year: number; limit?: number; offset?: number }) => ({
      year: params.year,
      limit: params.limit || 9,
      offset: params.offset || 0,
    })
  )
  .handler(async ({ data: { year, limit, offset } }) => {
    return await blogApi.getPostsByYearPaginated(year, limit, offset);
  });

export const getRecentPosts = createServerFn({ method: "GET" })
  .inputValidator((limit?: number) => limit || 6)
  .handler(async ({ data: limit }) => {
    return await blogApi.getRecentPosts(limit);
  });

export const getPostsByCategory = createServerFn({ method: "GET" })
  .inputValidator((categoryId: string) => categoryId)
  .handler(async ({ data: categoryId }) => {
    return await blogApi.getPostsByCategory(categoryId);
  });

export const getPostsByAuthor = createServerFn({ method: "GET" })
  .inputValidator((authorId: string) => authorId)
  .handler(async ({ data: authorId }) => {
    return await blogApi.getPostsByAuthor(authorId);
  });

// Author server functions
export const getAllAuthors = createServerFn({ method: "GET" }).handler(
  async () => {
    return await authorApi.getAllAuthors();
  }
);

export const getAuthorBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return await authorApi.getAuthorBySlug(slug);
  });

// Post Category server functions
export const getAllCategories = createServerFn({ method: "GET" }).handler(
  async () => {
    return await postCategoryApi.getAllCategories();
  }
);

export const getCategoryBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return await postCategoryApi.getCategoryBySlug(slug);
  });
