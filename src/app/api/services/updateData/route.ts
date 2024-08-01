'use server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/dist/server/api-utils'
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient()

export async function PUT(request: Request) {
    try {
        const formData = await request.formData()
        const key = request.headers.get('Authorization')


        if (key === process.env.API_KEY) {
            

            const data: { [key: string]: any } = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            if (data.usuImage !== '' && data.usuImage !== null && data.usuImage !== undefined && data.usuImage !== 'undefined') {
                

                const image = data.usuImage
                let extensao = image.type.split('/')[1]
                if (extensao === 'svg+xml')
                    extensao = extensao.split('+')[0]
                const uploadDir = path.join(process.cwd(), 'public/Media/uploads');
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const filename = `image-${uniqueSuffix}.${extensao}`;
                const imagePath = path.join(uploadDir, filename);
                const imagePathBanco = path.join(uploadDir.split('public')[1], filename).replace(/\\/g, '/');;

                const fileBuffer = await image.arrayBuffer();
                await fs.promises.mkdir(uploadDir, { recursive: true });
                await fs.promises.writeFile(imagePath, Buffer.from(fileBuffer));

                const updateUser = await prisma.user.update({
                    where: {
                        email: data.usuEmail,
                    },
                    data: {
                        name: data.usuName,
                        image: imagePathBanco,
                        profession: data.usuProfession,
                        nacionality: data.usuNacionality,
                        validadeUser: true
                    },
                })

                return NextResponse.json({
                    message: "Foi"
                }, { status: 200 });

            } else {
                const updateUser = await prisma.user.update({
                    where: {
                        email: data.usuEmail,
                    },
                    data: {
                        name: data.usuName,
                        profession: data.usuProfession,
                        nacionality: data.usuNacionality,
                        validadeUser: true
                    },
                })

                return NextResponse.json({
                    message: "Foi"
                }, { status: 200 });
            }
        } else
            return NextResponse.json({
                error: "Acesso não autorizado. Por favor, forneça uma chave de acesso."
            }, { status: 401 });

    } catch (error) {
        return NextResponse.json({
            error: "Erro no servidor ao processar a solicitação."
        }, { status: 500 });
    }

}