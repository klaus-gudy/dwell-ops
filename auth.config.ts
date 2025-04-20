import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedData = LoginSchema.parse(credentials);
                if (!validatedData) {
                    return null;
                }
                const { email, password } = validatedData;
                const lowerCasedEmail = email.toLowerCase();
                const existingUser = await prisma.user.findFirst({
                    where: { email: lowerCasedEmail },
                });
                if (!existingUser || !existingUser.passwordHash || existingUser.email !== lowerCasedEmail) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);
                if (passwordMatch) {
                    return existingUser;
                }
                return null;
            }
        }),
    ]
} satisfies NextAuthConfig;