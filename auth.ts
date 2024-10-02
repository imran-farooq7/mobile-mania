import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/db";
import { compare } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async ({ email, password }) => {
				const user = await prisma.user.findFirst({
					where: {
						email: email as string,
					},
				});
				if (!user) {
					throw new Error("User does not exist");
				} else {
					const isPasswordCorrect = await compare(
						password as string,
						user.password!
					);
					if (!isPasswordCorrect) {
						throw new Error("Password is incorrect");
					}
				}
				return user;
			},
		}),
	],
});
