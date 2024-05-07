/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: "/recruiter/dashboard",
        destination: "/recruiter/jobs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
