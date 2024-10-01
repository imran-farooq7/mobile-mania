import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
const DEFAULT_PROFILE_IMAGE = "https://avatar.iran.liara.run/public/boy";
export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
		}),
	],
});
