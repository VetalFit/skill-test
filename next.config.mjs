/** @type {import('next').NextConfig} */
const nextConfig = {
	serverRuntimeConfig: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
	publicRuntimeConfig: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
};

export default nextConfig;
