import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer"
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  images: {
    domains: ['drive.google.com', 'cdn.sanity.io', 'scontent.cdninstagram.com'],
  }
};

export default bundleAnalyzer(withNextIntl(nextConfig));
