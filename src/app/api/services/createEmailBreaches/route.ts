'use server'
import  { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { element } from 'prop-types'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const data  = await request.json()
        const key = request.headers.get('Authorization')

        if(key === process.env.API_KEY) {

        const user = await prisma.user.findUnique({
            where: {
                email: data.sessionEmail
            }
        })
        
        const vazamentos = await prisma.email_breaches.findMany({
            where: {
                userEmail: data.usuEmail,
            },
        })

        if(vazamentos.length > 0) {
        data.provedores.forEach(async (element: {Name: string; BreachDate: string; Domain: string}) => {
            vazamentos.forEach(async (vazamentos) => {
            if(vazamentos.userEmail !== data.usuEmail && vazamentos.company !== element.Name && vazamentos.breach_date !== new Date(element.BreachDate) && element.Domain === vazamentos.domain ) {
            await prisma.email_breaches.create({
                data: {
                      userEmail: data.usuEmail,
                      domain: element.Domain,
                      company: element.Name,
                      breach_date: new Date(element.BreachDate),
                      country: user?.nacionality??'Brasil'
                }
                });
            }
            }) 
        });
        } else {
            data.provedores.forEach(async (element: {Name: string; BreachDate: string; Domain: string}) => {
                await prisma.email_breaches.create({
                    data: {
                          userEmail: data.usuEmail,
                          domain: element.Domain,
                          company: element.Name,
                          breach_date: new Date(element.BreachDate),
                          country: user?.nacionality??'Brasil'
                    }
                });
            });
        }

         
            return NextResponse.json({
                message: 'Concluído'
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