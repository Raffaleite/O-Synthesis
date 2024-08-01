import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const key = request.headers.get('Authorization');

    try {
        if (key === `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`) {
            const domains = await prisma.email_breaches.groupBy({
                by: ['domain'],
                _count: {
                    domain: true,
                },
                where: {
                    domain: {
                        not: {
                            equals: ''
                        }
                    }
                },
                orderBy: {
                    _count: {
                        domain: 'desc'
                    }
                },
                take: 6
            });

            const dominiosTratados = domains.map(x => ({
                domain: x.domain,
                qtd: x._count.domain
            }));

            return NextResponse.json(dominiosTratados, { status: 200 });
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
