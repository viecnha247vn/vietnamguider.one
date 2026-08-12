import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import RouteComparisonCard from "@/components/RouteComparisonCard";
import HotelRecommendationCard from "@/components/HotelRecommendationCard";

// This file is required by @next/mdx. Anything returned here is available
// inside every .mdx article WITHOUT importing it — so writers can just drop
// <RouteComparisonCard ... /> straight into a post.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // CRO building blocks — available in every article
    RouteComparisonCard,
    HotelRecommendationCard,

    // Internal links use Next's <Link>; external links open in a new tab
    a: ({ href = "", children, ...props }) => {
      const external = href.startsWith("http");
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener" {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    },

    ...components,
  };
}
