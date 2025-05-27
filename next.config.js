/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: "/api/trpc/:path*",
        destination:
          "https://nwlhd85eue.execute-api.us-east-1.amazonaws.com/Dell/api/trpc/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination:
          "https://nwlhd85eue.execute-api.us-east-1.amazonaws.com/Dell/api/auth/:path*",
      },
    ];
  },
};

export default config;
