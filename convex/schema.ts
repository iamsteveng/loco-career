import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  jobs: defineTable({
    slug: v.string(),
    title: v.string(),
    department: v.string(),
    location: v.string(),
    type: v.string(),
    deadline: v.optional(v.string()),
    overview: v.optional(v.string()),
    salary: v.optional(v.string()),
    benefits: v.optional(v.string()),
    responsibilities: v.array(v.string()),
    requirements: v.array(v.string()),
    published: v.boolean(),
    applyUrl: v.optional(v.string()),
  }).index("by_slug", ["slug"]),
});
