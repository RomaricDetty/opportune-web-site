import type { NextConfig } from "next";

/**
 * Extrait l'origine (protocole + host + port) d'une URL API.
 * @param url - URL complète (ex. http://host:6981/api)
 */
function originFromUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return null;
  }
}

const apiOrigin =
  originFromUrl(process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "http://127.0.0.1:3000";

/** Origines API autorisées en CSP (local + prod Contabo + env). */
const apiOrigins = Array.from(
  new Set([
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://5.182.17.192:6981",
    apiOrigin,
  ]),
);

const connectSrc = [
  "'self'",
  ...apiOrigins,
  "https://api.iconify.design",
  "https:",
].join(" ");

const imgSrc = ["'self'", "data:", "blob:", "https:", ...apiOrigins].join(" ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      `img-src ${imgSrc}`,
      "font-src 'self' data: https://fonts.gstatic.com",
      `connect-src ${connectSrc}`,
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

/**
 * Patterns d'images distantes pour next/image (API + Unsplash).
 */
function buildRemotePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "picsum.photos",
      port: "",
      pathname: "/**",
    },
  ];

  for (const origin of apiOrigins) {
    try {
      const { protocol, hostname, port } = new URL(origin);
      patterns.push({
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        port: port || "",
        pathname: "/**",
      });
    } catch {
      // ignore
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ["**/node_modules/**", "**/.next/**", "**/.git/**"],
      };
    }
    return config;
  },
  images: {
    remotePatterns: buildRemotePatterns(),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
