import { auth } from '@/auth';
import { redirect } from 'next/navigation'
import PagLogado from '../../components/paginaInicio'
import axios from 'axios';

export default async function Logado() {
    const session = await auth();

    if (!session) {
        redirect('/auth/login')
    }
    
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/services/getUser`,
            {
                usuEmail: session.user?.email,
            },
            {
                headers: {
                    'Authorization': `${process.env.API_KEY}`
                }
            });

            return (
                <>
                <div id='bgLogado'>
                    <PagLogado userDatas={response.data} />      
                </div>
                </>
            )
    } catch (error) {
        return (
            <>
                <h1>Erro ao retornar dados do usuário</h1>
            </>
        )
    }
}