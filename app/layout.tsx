import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mobile Mania",
	description: "",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<body>{children}</body>
		</html>
	);
}
