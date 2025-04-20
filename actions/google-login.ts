'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function googleAuthenticate() {
    try {
        await signIn('google');
        return { success: "Google authentication successful" };
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Google authentication failed" };
        }
        throw error;
    }
}