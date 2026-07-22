"use client";

import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBookmark, IconHeart } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import type { BlogPostProps } from "@/types";
import { formatReadTime } from "@/utils/formatters";
import clsx from "clsx";

export interface BlogPostCardProps {
  post: BlogPostProps;
  skeleton?: boolean;
}

export function BlogPostCard({ post, skeleton }: BlogPostCardProps) {
  const slug = post.slug ?? post.id;
  const to = `/blog/${slug}`;
  const dateLabel =
    typeof post.date === "string" && post.date.includes("T")
      ? new Date(post.date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      : post.date;

  return (
    <Card withBorder shadow='none' padding='lg' radius='sm'>
      <Card.Section inheritPadding pt='lg'>
        <Box
          className={clsx({ skeleton })}
          style={{
            height: 250,
            backgroundColor: "#f0f0f0",
            position: "relative",
          }}
        >
          <Image
            src={post.image}
            h={250}
            w='100%'
            maw={520}
            mx='auto'
            alt={post.title}
            fit='cover'
            radius='sm'
            loading='lazy'
          />
          <ActionIcon
            variant='transparent'
            color='white'
            radius='xl'
            size='lg'
            style={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
            aria-label='Save post'
          >
            <IconHeart size={18} />
          </ActionIcon>
        </Box>
      </Card.Section>

      <Stack gap={3} mt='md' h='100%'>
        <Title
          order={4}
          className={clsx("font-playfair", { skeleton })}
          fz={24}
          fw={600}
        >
          {post.title}
        </Title>

        <Text fz={15} c='gray.6' lineClamp={2} className={clsx({ skeleton })}>
          {post.excerpt}
        </Text>

        <Group gap='xs' my='sm' className={clsx({ skeleton })}>
          <Text fz={14} c='red.6'>
            {dateLabel}
          </Text>
          <Box
            w={6}
            h={6}
            style={{
              borderRadius: "50%",
              backgroundColor: "#D1410C",
            }}
          />
          <Text fz={14} c='red.6'>
            {formatReadTime(post.readTime)}
          </Text>
        </Group>

        <Button
          component={Link}
          to={to}
          variant='light'
          color='gray'
          radius='lg'
          w='fit-content'
          leftSection={<IconBookmark size={18} />}
          mt='auto'
          className={clsx({ skeleton })}
        >
          Read Post
        </Button>
      </Stack>
    </Card>
  );
}
