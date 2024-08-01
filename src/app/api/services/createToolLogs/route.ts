'use server'
import  { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const data  = await request.json()
        const key = request.headers.get('Authorization')

        if(key === process.env.API_KEY) {

            const today = new Date();
        
            const password = await prisma.tool_logs.create({
                data: {
                    toolName: data.toolName,
                    useDate: today.toISOString().slice(0, 7)
              }
            })
            
            return NextResponse.json({
                
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