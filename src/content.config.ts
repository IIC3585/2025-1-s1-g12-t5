import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});

const movies = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/movies", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tmdbURL: z.string().optional(),

      author: z.string(),
      tags: z.array(z.string()).optional(),
      year: z.number().optional(),
      director: z.string().optional(),
      summary: z.string().optional(),
    }),
});

export const collections = { blog, movies };
