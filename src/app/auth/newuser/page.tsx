import { auth } from '@/auth';
import { redirect } from 'next/navigation'
import PagNewuser from '../../components/pagnewuser'
import Navs from '../../components/navbar'
import axios from 'axios'


interface SessionData {
    image: string;
    email: string;
    name: string;
  }
  
export default async function newuser() {
    const session = await auth();

    if(!session) {
        redirect('/auth/login')
    }

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/services/getUser`,
        {
          usuEmail: session.user?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      if (response.data.usuValidateUser === true) {
        redirect('./inicio')
      }

    return(
        <>
            <Navs />
            <video id="background-video" autoPlay loop muted>
            <source src='/Media/background.mp4' type="video/mp4" />
            </video>            
            <PagNewuser SessionData={session?.user as SessionData} />
        </>
    )
}