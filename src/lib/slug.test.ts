import assert from "node:assert/strict";
import { test } from "node:test";
import { matchRoutes } from "react-router";
import { decodeJobSlug, jobPath } from "./slug.ts";

const routes = [{ path: "/jobs/*" }];
const patrol = "(全職/兼職)單車巡邏員_職位申請表";

function resolvedSlug(pathname: string): string {
  const matches = matchRoutes(routes, pathname);
  assert.ok(matches, pathname);
  const splat = matches.at(-1)?.params["*"] ?? "";
  return decodeJobSlug(splat);
}

test("percent-encoded slash round-trips through the router", () => {
  assert.equal(resolvedSlug(jobPath(patrol)), patrol);
});

test("a raw slash in the path still resolves to the stored slug", () => {
  assert.equal(resolvedSlug(`/jobs/${patrol}`), patrol);
});

test("a slug without reserved characters is unchanged", () => {
  assert.equal(resolvedSlug(jobPath("rd-engineer")), "rd-engineer");
});
