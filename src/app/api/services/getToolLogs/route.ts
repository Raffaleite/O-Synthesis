import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const key = request.headers.get('Authorization');

    try {
        if (key === `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`) {
            const toolLogCounts = await prisma.tool_logs.groupBy({
                by: ['toolName', 'useDate'],
                _count: {
                    useDate: true,
                },
                where: {
                    useDate: {
                        not: {
                            equals: ''
                        }
                    }
                },
                orderBy: {
                    _count: {
                        useDate: 'desc'
                    }
                },
                take: 6
            });

            const toolLogTratados = toolLogCounts.map(x => ({
                toolName: x.toolName,
                useDate: x.useDate,
                qtd: x._count.useDate
            }));

            return NextResponse.json(toolLogTratados, { status: 200 });
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
