import { internalAction, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { createAccount, getAuthUserId } from "@convex-dev/auth/server";

const jobFields = {
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
};

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return ctx.db.query("jobs").collect();
  },
});

export const getById = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return ctx.db.get(id);
  },
});

export const create = mutation({
  args: jobFields,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return ctx.db.insert("jobs", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("jobs"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    department: v.optional(v.string()),
    location: v.optional(v.string()),
    type: v.optional(v.string()),
    deadline: v.optional(v.string()),
    overview: v.optional(v.string()),
    responsibilities: v.optional(v.array(v.string())),
    requirements: v.optional(v.array(v.string())),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...fields }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.delete(id);
  },
});

export const togglePublished = mutation({
  args: { id: v.id("jobs"), published: v.boolean() },
  handler: async (ctx, { id, published }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.patch(id, { published });
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const existing = await ctx.db.query("jobs").collect();
    if (existing.length > 0) return { inserted: 0, message: "Already seeded" };

    const SEED_JOBS = [
      {
        slug: "rd-engineer",
        title: "R&D Engineer",
        department: "Engineering",
        location: "香港",
        type: "全職",
        deadline: "31/07/2026",
        published: true,
        overview:
          "LocoBike is seeking an R&D Engineer with strong full-stack capabilities and a solid understanding of mobile application systems (iOS & Android) to support our smart-mobility platform and applied research initiatives. This role is for engineers who use AI coding agents as a force multiplier, not a substitute for thinking — you will design systems, make architectural decisions, and take full ownership of code quality while leveraging AI tools to deliver high-quality, maintainable, and well-reasoned solutions.",
        responsibilities: [
          "Design and develop end-to-end systems across mobile applications (iOS & Android), backend services, APIs, and data layers.",
          "Take ownership of system architecture, including component boundaries, data flow, and client–server responsibilities.",
          "Collaborate with cross-functional teams to translate real-world operational and research requirements into scalable technical solutions.",
          "Build and maintain backend services and integrations supporting LocoBike's core mobility and operations platforms.",
          "Work closely with mobile apps, understanding performance, latency, reliability, and real-world usage constraints.",
          "Use Python to support R&D activities including data processing and analysis, algorithm prototyping and experimentation, and research validation.",
          "Leverage AI coding agents to accelerate development — clearly defining problems, critically reviewing generated code, and ensuring correctness, performance, and maintainability.",
          "Review AI-assisted outputs with a strong verification mindset, considering edge cases, failure modes, and long-term implications.",
          "Continuously improve system design, code quality, and development workflows.",
        ],
        requirements: [
          "Bachelor's degree or above in Computer Science, Engineering, Data Science, or a related discipline; Master's degree or PhD preferred.",
          "Strong understanding of full-stack system architecture, including mobile frontend, backend services, and data layers.",
          "Hands-on experience with iOS and/or Android applications — native or cross-platform frameworks such as Flutter or React Native are acceptable.",
          "Backend development experience (e.g. Node.js, PHP, Python, or equivalent).",
          "Experience designing and consuming RESTful APIs and working with databases.",
          "Familiarity with AI coding agents and a demonstrated ability to frame problems clearly, evaluate AI-assisted outputs, and use AI to improve quality rather than just speed.",
          "Strong architectural thinking with the ability to reason about trade-offs, constraints, and system boundaries.",
          "High sense of ownership, accountability, and responsibility for production-quality systems.",
        ],
      },
      {
        slug: "frontend-engineer",
        title: "Frontend Engineer",
        department: "Engineering",
        location: "遠端 — 東南亞",
        type: "全職",
        deadline: "15/07/2026",
        published: true,
        overview:
          "Join our engineering team as a Frontend Engineer and help build fast, accessible, and beautifully crafted web experiences. You'll work in a modern React stack, collaborating with designers and backend engineers to ship features that make a real difference for our users.",
        responsibilities: [
          "Build and maintain responsive web application features using React and TypeScript.",
          "Collaborate with designers to implement pixel-perfect UI components.",
          "Optimize application performance and ensure cross-browser compatibility.",
          "Write clean, well-tested, and maintainable code.",
          "Participate in code reviews and contribute to improving engineering standards.",
          "Help evolve the frontend architecture as the product grows.",
        ],
        requirements: [
          "3+ years of experience building production web applications.",
          "Strong proficiency in React, TypeScript, and modern CSS.",
          "Experience with component libraries and design systems.",
          "Familiarity with testing frameworks (Jest, Vitest, Playwright).",
          "Good understanding of web performance, accessibility, and SEO fundamentals.",
          "A collaborative mindset and clear written communication.",
        ],
      },
      {
        slug: "product-manager",
        title: "Product Manager",
        department: "Product",
        location: "胡志明市，越南",
        type: "全職",
        deadline: "01/08/2026",
        published: true,
        overview:
          "We're looking for an experienced Product Manager to drive the strategy and execution of one of our core product lines. You'll work at the intersection of user needs, business goals, and technical constraints — defining what we build and why, and rallying the team to ship meaningful impact.",
        responsibilities: [
          "Own the product roadmap for your area, balancing user needs, business priorities, and technical feasibility.",
          "Define clear problem statements, success metrics, and feature specifications.",
          "Work daily with design, engineering, and data teams to ship high-quality products.",
          "Gather and synthesize user feedback, market research, and analytics to inform decisions.",
          "Communicate product strategy and progress to leadership and stakeholders.",
          "Champion a culture of experimentation, learning, and continuous improvement.",
        ],
        requirements: [
          "4+ years of product management experience, ideally in a B2C or SaaS product.",
          "Demonstrated ability to define and execute a product strategy from 0 to 1 and beyond.",
          "Strong analytical skills — comfortable with data, A/B testing, and product metrics.",
          "Excellent written and verbal communication skills.",
          "Experience working in fast-paced, cross-functional agile teams.",
          "Empathy for users and a genuine passion for building great products.",
        ],
      },
      {
        slug: "data-analyst",
        title: "Data Analyst",
        department: "Data",
        location: "遠端 — 亞太區",
        type: "全職",
        deadline: "31/07/2026",
        published: true,
        overview:
          "As a Data Analyst, you'll turn raw data into clear, actionable insights that guide product decisions and business strategy. You'll work with product managers, marketers, and engineers to understand user behavior, track key metrics, and help us build more effectively.",
        responsibilities: [
          "Analyze product and business data to surface insights and trends.",
          "Build and maintain dashboards and reports for stakeholders across the company.",
          "Partner with product teams to define metrics, design experiments, and interpret results.",
          "Develop and maintain data pipelines and analytical models.",
          "Present findings in a clear, compelling way to both technical and non-technical audiences.",
          "Contribute to improving data quality and data literacy across the organization.",
        ],
        requirements: [
          "2+ years of experience in a data analysis or business intelligence role.",
          "Proficiency in SQL and at least one analytics language (Python or R).",
          "Experience with BI tools such as Looker, Tableau, or Metabase.",
          "Strong grasp of statistical concepts and experimental design.",
          "Ability to communicate complex findings simply and clearly.",
          "Attention to detail and a rigorous approach to data accuracy.",
        ],
      },
    ];

    for (const job of SEED_JOBS) {
      await ctx.db.insert("jobs", job);
    }

    return { inserted: SEED_JOBS.length };
  },
});

// Run once from the Convex dashboard to create the initial admin account.
// username: admin  password: admin123
export const seedAdmin = internalAction({
  args: {},
  handler: async (ctx) => {
    try {
      await createAccount(ctx, {
        provider: "password",
        account: { id: "admin@loco.admin", secret: "admin123" },
        profile: { email: "admin@loco.admin" },
      });
      return { status: "created" as const };
    } catch (e) {
      if (e instanceof Error && /already exists/i.test(e.message)) {
        return { status: "already_exists" as const };
      }
      throw e;
    }
  },
});
