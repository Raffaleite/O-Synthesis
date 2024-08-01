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
         
            return NextResponse.json({
                usuImage: user?.image,
                usuName: user?.name,
                usuEmail: user?.email,
                usuNacionality: user?.nacionality,
                usuProfession: user?.profession,
                usuValidateUser: user?.validadeUser
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