import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/db";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: {
		strategy: "jwt",
	},
	adapter: PrismaAdapter(prisma),
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
		GitHub,
	],
	callbacks: {
		signIn: async ({ user, account }) => {
			if (account?.provider === "github") {
				try {
					const { email, image, name } = user;
					let isUser = await prisma.user.findFirst({
						where: {
							email: email!,
						},
					});
					if (!isUser) {
						const newUser = await prisma.user.create({
							data: {
								email: email!,
								name: name!,
								profileImage: image!,
							},
						});
						isUser = newUser;
					}
					user.id = isUser.id;
					user.email = isUser.email;
					user.name = isUser.name;
					//@ts-ignore
					user.admin = isUser.admin;
					//@ts-ignore
					user.profileImage = isUser.profileImage;
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			}
			return true;
		},
		jwt: async ({ user, token, trigger, session }) => {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				//@ts-ignore
				token.admin = user.admin;
				//@ts-ignore
				token.profileImage = user.profileImage;
			}
			if (trigger === "update" && session) {
				token.name = session.user.name;
				token.email = session.user.email;
				token.profileImage = session.user.profileImage;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email!;
				session.user.name = token.name;
				//@ts-ignore
				session.user.admin = token.admin;
				//@ts-ignore
				session.user.profileImage = token.profileImage;
			}
			return session;
		},
	},
});
