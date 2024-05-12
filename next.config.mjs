/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "swipply-resume.s3.amazonaws.com",
      "swipply-profile-pictures.s3.amazonaws.com",
    ],
  },
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
