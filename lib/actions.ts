"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/db";
import { hash } from "bcryptjs";

export const createUser = async ({
	name,
	email,
	password,
}: {
	name: string;
	email: string;
	password: string;
}) => {
	const hashedPassword = await hash(password, 10);
	const DEFAULT_PROFILE_IMAGE = "https://avatar.iran.liara.run/public/boy";

	try {
		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				profileImage: DEFAULT_PROFILE_IMAGE,
				name,
			},
		});
		if (newUser) {
			return {
				status: "success",
				message: "User created successfully",
			};
		}
	} catch (error: any) {
		if (error.code === "P2002") {
			return {
				status: "error",
				message: "user already exists",
			};
		}
		return {
			status: "error",
			message: "User creation failed",
		};
	}
};
