/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/image/**",
      },
      {
        protocol: "https",
        hostname: "sajitkhadka.com",
        port: "",
        pathname: "/api/image/**",
      },
    ],
  },

  async redirects() {
    return [{ source: "/progress", destination: "/apps", permanent: true }];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
          },
        },
      ],
    })

    return config
  },
};

export default nextConfig;
