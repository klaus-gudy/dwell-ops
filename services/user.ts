import { prisma } from "@/lib/prisma";

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error("Unable to fetch user");
    }
}