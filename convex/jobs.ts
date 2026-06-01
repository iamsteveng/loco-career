import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return ctx.db
      .query("jobs")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});
