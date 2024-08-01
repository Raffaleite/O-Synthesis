import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const key = request.headers.get('Authorization');
    try {
        if (key === `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`) {
            const country = await prisma.email_breaches.groupBy({
                by: ['country'],
                _count: {
                    country: true,
                },
                where: {
                    country: {
                        not: {
                            equals: ''
                        }
                    }
                },
                orderBy: {
                    _count: {
                        country: 'desc'
                    }
                },
            });

            const countryTratado = country.map(x => ({
                country: x.country,
                usageCount: x._count.country
            }));
    
            return NextResponse.json(
                countryTratado,
                { status: 200 });
        } else {
            return NextResponse.json({
                error: "Acesso não autorizado. Por favor, forneça uma chave de acesso válida."
            }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Erro interno ao processar a requisição."
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
