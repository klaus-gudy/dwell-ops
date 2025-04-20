'use server';

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export async function loginUser(data: z.infer<typeof LoginSchema>) {
    const validatedData = LoginSchema.parse(data);
    if (!validatedData) {
        return { error: "Invalid login data" };
    }
    const { email, password } = validatedData;
    const lowerCasedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findFirst({
        where: { email: lowerCasedEmail },
    });
    if (!existingUser || !existingUser.passwordHash) {
        return { error: "User not found" };
    }

    try {
        await signIn('credentials', {
            email: existingUser.email,
            password,
            redirectTo: '/dashboard',
        })
    } catch (error) {
       if (error instanceof AuthError) {
            switch (error.type){
                case 'CredentialsSignin':
                    return { error: "Invalid credentials" };
                default:
                    return { error: "please confirm your email" };
            }
        }

        throw error;
    }
    return { success: "Login successful", user: existingUser };
}