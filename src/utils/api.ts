import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { type AppRouter } from "@/server/api/root";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";

  if (process.env.NEXT_PUBLIC_API_URL)
    return `https://${process.env.NEXT_PUBLIC_API_URL}`;
  return `https://nwlhd85eue.execute-api.us-east-1.amazonaws.com/Dell`;
};

export const api = createTRPCNext<AppRouter>({
  config: () => ({
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        transformer: superjson,
      }),
    ],
  }),
  ssr: false,
  transformer: superjson,
});
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
