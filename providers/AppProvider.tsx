"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();

	return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
};

export default AppProvider;
