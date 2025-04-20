'use server';

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { RegisterSchema } from "@/schemas";

export async function registerUser(data: z.infer<typeof RegisterSchema>) {
    try{
        const validatedData = RegisterSchema.parse(data);
        if(!validatedData) {
            return { error: "Invalid register data" };
        }
        const { name, email, password } = validatedData;
        const hashedPassword = await hash(password, 12);
        
        const ExistingUser = await prisma.user.findFirst({
            where: { email }
        })
        if(ExistingUser) {
            return { error: "User already exists" };
        }
        const lowerCasedEmail = email.toLowerCase();

        const user = await prisma.user.create({
            data: {
                name,
                email: lowerCasedEmail,
                passwordHash: hashedPassword,
            }
        })

        return { success: 'User created successfully', user };
    }catch (error) {
        console.log("Error creating user:", error);
        return { error: "An error occured in registering user" };

    }
}