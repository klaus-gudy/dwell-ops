import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import authConfig from './auth.config';
import { getAccountByUserId } from './services/accounts';
import { getUserById } from './services/user';

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
    callbacks:{
        // async signIn({ user, account }) {
        //     if (account?.provider === 'credentials') {
        //         return true;
        //     }
        //     const existingUser =  await getUserById(user.id ?? '');
        //     if (!existingUser?.emailVerified){
        //         return false;
        //     }
        //     return true;
        // },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }

            const existingAccount = token.sub ? await getAccountByUserId(token.sub) : null;
            if (existingAccount) {
                token.isOauth = !!existingAccount;
            }
            
            console.log('JWT Callback:', token);
            return token;
        },
        async session({ session, token }) {
            if (token.sub) {
                session.user.id = token.sub;
            }
            console.log('Session Callback:', token);
            return session;
        }
    }
})