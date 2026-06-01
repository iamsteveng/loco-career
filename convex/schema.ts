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
    deadline: v.string(),
    overview: v.string(),
    responsibilities: v.array(v.string()),
    requirements: v.array(v.string()),
    published: v.boolean(),
  }).index("by_slug", ["slug"]),
});
