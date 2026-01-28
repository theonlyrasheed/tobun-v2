"use client";

import {
  Anchor,
  Box,
  Breadcrumbs as IBreadcrumbs,
  BreadcrumbsProps as IBreadcrumbsProps,
} from "@mantine/core";
import { ReactNode } from "react";

import { BreadCrumbsArrowIcon } from "./bread-crumbs-arrow-icon";
import { BreadCrumbsHomeIcon } from "./bread-crumbs-home-icon";

import { Link } from "@tanstack/react-router";

export type Trail = {
  title: ReactNode;
  to?: string;
  hash?: string;
};

export interface BreadCrumbsProps extends Omit<IBreadcrumbsProps, "children"> {
  trail: Trail[];
  color?: string;
}

export function BreadCrumbs({ trail, color }: BreadCrumbsProps) {
  return (
    <IBreadcrumbs
      c='gray.4'
      separatorMargin={4}
      separator={<BreadCrumbsArrowIcon />}
    >
      {trail.map(({ title, to, hash }, index) => {
        return to ? (
          <Anchor
            key={index}
            component={Link}
            to={to}
            hash={hash}
            fz='sm'
            truncate
            maw={135}
            className={`text-primary-text-caption ${color}`}
          >
            {title === "Home" ? <BreadCrumbsHomeIcon width={18} /> : title}
          </Anchor>
        ) : (
          <Box
            key={index}
            fz={14}
            maw={{ base: 135, xl: "70%" }}
            // px={12}
            py={4}
            className={`font-medium rounded-sm truncate text-primary-text-subtle ${color}`}
          >
            {title}
          </Box>
        );
      })}
    </IBreadcrumbs>
  );
}
