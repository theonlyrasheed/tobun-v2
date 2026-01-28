"use client";

import clsx from "clsx";
import dayjs from "dayjs";

import { BlogPostCard } from "./post-card";

import { BreadCrumbs } from "@/components/shared/bread-crumbs";
import { Markdown } from "@/components/blog/markdown";
import { Avatar, Badge, Box, Button, Flex } from "@mantine/core";

import { urlFor } from "@/utils/sanity";
import { PortableText } from "@portabletext/react";
import {
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import { PAGES } from "@/utils/enums";
import { Link } from "@tanstack/react-router";
import type {
  Block_content,
  SanityImageAssetReference,
} from "@/builders/sanity.types";
import type { BlogPostProps } from "@/types";

interface BlogPostContentProps {
  data: {
    title: string;
    author: string;
    authorImage?: string;
    excerpt?: string;
    readingTime: number;
    mainImage?:
      | string
      | {
          asset?: SanityImageAssetReference;
          hotspot?: unknown;
          crop?: unknown;
          _type?: "image";
        };
    body: Block_content;
    mainImageHeight?: number;
    publishedAt: string;
    relatedPosts?: BlogPostProps[];
    tags?: string[];
    featured?: boolean;
    category?: string;
  };
  shareUrl: string;
}

export function BlogPostContent({ data, shareUrl }: BlogPostContentProps) {
  const {
    title,
    author,
    authorImage,
    excerpt,
    readingTime,
    mainImage,
    body,
    mainImageHeight,
    publishedAt,
    relatedPosts,
    featured,
    category,
  } = data;

  const hasRelatedPosts = (relatedPosts?.length ?? 0) > 0;

  const imageUrl =
    typeof mainImage === "string"
      ? mainImage
      : mainImage
        ? urlFor(mainImage)
        : "";

  // WhatsApp supports lightweight formatting: *bold* _italic_ ~strike~ ```mono```
  const shareText = [
    `*${title}*`,
    excerpt?.trim(),
    "",
    `Read here: ${shareUrl}`,
    "",
    `_Olubukola Art_`,
  ]
    .filter(Boolean)
    .join("\n");

  const encodedShareText = encodeURIComponent(shareText);
  const encodedShareUrl = encodeURIComponent(shareUrl);

  return (
    <section>
      <div
        className={clsx(
          "relative flex max-h-[45vh] justify-center overflow-hidden bg-[slategray]",
        )}
      >
        {mainImage && (
          <>
            <img
              alt='blurry background'
              src={imageUrl}
              className='absolute inset-0 h-full w-full scale-110 object-cover opacity-50'
              style={{
                filter: "blur(45px)",
                WebkitFilter: "blur(45px)",
              }}
              loading='eager'
              decoding='async'
            />
            <img
              alt={title}
              src={imageUrl}
              className='relative mx-auto !w-full max-w-screen-xl object-contain'
              style={{ maxHeight: mainImageHeight ?? undefined }}
              loading='eager'
              decoding='async'
            />
          </>
        )}
      </div>

      <article
        className={clsx(
          "mx-auto w-full max-w-screen-2xl gap-5 px-4 pb-10 lg:px-0 flex flex-col",
          hasRelatedPosts
            ? "lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"
            : "lg:items-center",
        )}
      >
        <div
          className={clsx(
            "border-t-0 p-5 md:border md:px-16 md:py-8 border-gray-2",
            !hasRelatedPosts && "w-full max-w-4xl",
          )}
        >
          <BreadCrumbs
            trail={[
              { title: "Home", to: PAGES.HOME },
              { title: "Articles", to: PAGES.HOME, hash: PAGES.BLOG },
              { title: title },
            ]}
          />
          <p className='space-x-2 pt-4'>
            <span className='font-medium text-red-5'>Reading time:</span>
            <span>{readingTime} min read</span>
          </p>
          <Box mb={10}>
            {featured ? (
              <Badge
                color={"accent"}
                variant='filled'
                size='sm'
                radius='sm'
                style={{ zIndex: 2, fontWeight: 500 }}
              >
                Editor's Pick
              </Badge>
            ) : category ? (
              <Badge
                color={"violet"}
                size='sm'
                radius='sm'
                style={{ fontWeight: 500, textTransform: "uppercase" }}
              >
                {category}
              </Badge>
            ) : (
              <Badge
                c='gray.8'
                bg='gray.2'
                size='sm'
                radius='sm'
                style={{ fontWeight: 500, textTransform: "uppercase" }}
              >
                {"Uncategorized"}
              </Badge>
            )}
          </Box>

          {/* {tags && tags.length > 0 && (
            <Group gap={4} align='center'>
              {tags.slice(0, 5).map((tag: string) => (
                <Badge
                  key={tag}
                  size='md'
                  radius='sm'
                  style={{ fontWeight: 500, textTransform: "capitalize" }}
                  variant='light'
                >
                  #{tag}
                </Badge>
              ))}
            </Group>
          )} */}

          <h2 className='pb-4 text-3xl font-playfair font-semibold sm:text-4xl mt-3'>
            {title}
          </h2>

          <div className='mb-4 flex items-center gap-3 border-b border-gray-2 pb-4'>
            <Avatar
              name={author}
              src={authorImage}
              size='40'
              radius='xl'
              color='purple'
              classNames={{
                placeholder: "font-semibold",
              }}
            />
            <div className='flex flex-col'>
              <h3 className='text-sm font-medium text-gray-12'>{author}</h3>
              <span className='text-sm'>
                {dayjs(publishedAt).format("MMMM DD, YYYY")}
              </span>
            </div>
          </div>

          <div className='min-w-0'>
            <PortableText value={body} components={Markdown} />

            <div className='mt-6 flex items-center gap-3'>
              <p className='text-lg font-medium text-red-5'>Share via:</p>
              <a
                href={`whatsapp://send?text=${encodedShareText}`}
                data-action='share/whatsapp/share'
                target='_blank'
                rel='noreferrer noopener'
              >
                <IconBrandWhatsapp size={24} color='#25D366' />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}&quote=${encodedShareText}`}
                target='_blank'
                rel='noreferrer noopener'
              >
                <IconBrandFacebook size={24} color='#316FF6' />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedShareText}`}
                target='_blank'
                rel='noreferrer noopener'
              >
                <IconBrandX size={24} />
              </a>
            </div>
          </div>
        </div>

        {hasRelatedPosts ? (
          <aside className='lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-auto'>
            <h3 className='my-8 text-xl font-semibold'>Read more posts:</h3>
            <div className='flex flex-col gap-6'>
              {(relatedPosts ?? []).slice(0, 4).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </aside>
        ) : null}
      </article>

      <Flex justify='center'>
        <Button
          className='mx-auto w-fit mb-8 mt-3 bg-secondary-5 text-white'
          size='md'
          component={Link}
          to={"/blog"}
        >
          View all articles
        </Button>
      </Flex>
    </section>
  );
}
