'use server'
import  { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/dist/server/api-utils'
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient()

export async function PUT(request: Request) {
    try {
        const data = await request.json()
        const key = request.headers.get('Authorization')
    
        if(key === process.env.API_KEY) {

            const updateUser = await prisma.user.update({
            where: {
                email: data.usuEmail,
              },
              data: {
                name: data.usuName,
                image: data.usuImage,
                profession: data.usuProfession,
                nacionality: data.usuNacionality,
                validadeUser: true
              },
            })

            return NextResponse.json({
                message: "Foi"
            }, { status: 200 });
        }else
            return NextResponse.json({
                error: "Acesso não autorizado. Por favor, forneça uma chave de acesso."
            }, { status: 401 });
        
    } catch (error) {
        return NextResponse.json({
            error: "Erro no servidor ao processar a solicitação."
        }, { status: 500 });
    }
  
}