import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        if (params.flow !== "signIn") {
          throw new Error("Registration is disabled");
        }
        const username = String(params.username ?? "").trim().toLowerCase();
        if (!/^[a-z0-9_]{3,32}$/.test(username)) {
          throw new Error("Invalid credentials");
        }
        return { email: `${username}@loco.admin` };
      },
    }),
  ],
});
