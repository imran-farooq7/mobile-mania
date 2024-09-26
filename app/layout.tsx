import AppProvider from "@/providers/AppProvider";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});

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
			<body className={poppins.className}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
