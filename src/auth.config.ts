import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { use } from 'react';

const prisma = new PrismaClient()

export const authConfig = {
    pages: {
        error: '/auth/login',
        signIn: '/auth/login',
        signOut: '/',
        verifyRequest: '/auth/login/verifyrequest',
        newUser: '/auth/newuser'      
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            
            if(user?.email) {
                 const usuarioExistente = await prisma.user.findFirst({
                    where: {
                        email: user?.email,
                    },
                })
                
                if(usuarioExistente){
                    const provedorDoUsuario = await prisma.account.findFirst({
                        where: {
                            userId: usuarioExistente.id
                        }
                    })

                    if(provedorDoUsuario) {
                        if(provedorDoUsuario.provider === account?.provider) {
                            return Promise.resolve(true)
                        } else {
                            await prisma.$disconnect()
                            return false
                        }
                    } else {

                        const usuarioEmail = await prisma.user.findFirst({
                            where: {
                                email: user?.email,
                                emailVerified: {
                                    not: null,
                                },
                            },
                        })

                        if(usuarioEmail) {
                            return Promise.resolve(true)
                        }

                        await prisma.$disconnect()
                        return false
                    }

                    
                }
            }
            await prisma.$disconnect()
            return Promise.resolve(true)
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl)
                ? Promise.resolve(`${process.env.NEXT_PUBLIC_URL}/auth/newuser`)
                : Promise.resolve(baseUrl)
        },
        async jwt({ token, account }: any) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }: any) { 
            session.accessToken = token.accesstoken
        return session; }
    },
    providers: [],
} satisfies NextAuthConfig;