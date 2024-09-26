"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	return <NextUIProvider>{children}</NextUIProvider>;
};

export default AppProvider;
