'use server'
import  { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const data  = await request.json()
        const key = request.headers.get('Authorization')

        if(key === process.env.API_KEY) {

            const user = await prisma.user.findUnique({
                where: {
                    email: data.usuEmail,
                },
            })

            const password = await prisma.passwordLogs.findMany({
                where: {
                    userId: user?.id,
                },
                orderBy: {
                    id: 'desc',
                },
                take: 5,
            })

            const allPasswords = password.map(x => ({
                password: x.password
            }));
         
            return NextResponse.json({
                allPasswords
            }, { status: 200 });
        }else
            return NextResponse.json({
                error: "Acesso não autorizado. Por favor, forneça uma chave de acesso."
            }, { status: 401 });
        
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 });
    }
  
}