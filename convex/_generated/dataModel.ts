/* eslint-disable */
/**
 * Stub — overwritten by `npx convex dev` / `npx convex deploy`.
 * Do not edit manually.
 */
/* prettier-ignore */
export type Id<_T extends string> = string & { readonly __tableName: unique symbol };
export type Doc<_T extends string> = Record<string, unknown> & {
  _id: Id<_T>;
  _creationTime: number;
};
