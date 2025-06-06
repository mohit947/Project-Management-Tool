import NextAuth from "next-auth";
import { cache } from "react";

import { authOptions } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authOptions);
export { authOptions };
const auth = uncachedAuth;

export { auth, handlers, signIn, signOut };
