'use client'
import imports from './importsPadrao';
import SideBarDesktop from './sideBarDesktop';
import SideBarMobile from './sideBarMobile';
import { usePathname, useSearchParams } from 'next/navigation'
import { BsArrowRightSquare } from "react-icons/bs";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { IoClose } from "react-icons/io5";

import dynamic from 'next/dynamic'
const Dashboard = dynamic(() => import('./tools/dashboard'))
const EmailTools = dynamic(() => import('./tools/emailtools'))
const EmailTool1 = dynamic(() => import('./tools/emailTools/tool1'))
const FileTools = dynamic(() => import('./tools/filetools'))
const FileTool1 = dynamic(() => import('./tools/fileTools/tool1'))
const FileTool2 = dynamic(() => import('./tools/fileTools/tool2'))
const FileTool3 = dynamic(() => import('./tools/fileTools/tool3'))
const SecurityTools = dynamic(() => import('./tools/securitytools'))
const SecurityTool1 = dynamic(() => import('./tools/securityTools/tool1'))
const Perfil = dynamic(() => import('./tools/perfil'))


const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "-15%" },
}

export interface UserDatas {
  usuImage: string,
  usuEmail: string;
  usuName: string
  usuNacionality: string,
  usuProfession: string,
  url: string
}

interface PagLogadoProps {
  userDatas: UserDatas;
}

export default function PagLogado({ userDatas }: PagLogadoProps) {
  const { React, useEffect, motion,  Row, Col, useState, } = imports;
  const [isOpen, setIsOpen] = useState(false);
  const [tamanhoTela, setTamanhoTela] = useState(0);
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [newUrl, setNewUrl] = useState('')
  const [tamanhoNav, setTamanhoNav] = useState<number[]>([4,3,3])
  const [tamanhoContent, setTamanhoContent] = useState<number[]>([8,9,9])
  const [botaoMobile, setBotaoMobile] = useState(false)
  const [controle, setControle] = useState(false)

  const navOnNav = [5,4,3,3]
  const navOnContent = [7,8,9,9]

  const navOffNav = [1,1,1,1]
  const navOffContent = [11,11,11,11]

  const closeNav = () => {
    setIsOpen(false)
    setBotaoMobile(false)
    setTamanhoNav(navOffNav)
    setTamanhoContent(navOffContent)
    localStorage.setItem('mobile', 'off')
  }

  const openNav = () => {
    setIsOpen(true)
    setBotaoMobile(true)
    setTamanhoNav(navOnNav)
    setTamanhoContent(navOnContent)
    localStorage.setItem('mobile', 'on')
  }


  useEffect(() => {
    const handleResize = () => {
      setTamanhoTela(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setTamanhoTela(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };

  }, []);

  useEffect(() => {

    if(localStorage.getItem('mobile') === 'off') {
      closeNav()
      setControle(true)
    } else if(localStorage.getItem('mobile') === 'on'){
      openNav()
      setControle(true)
    }
    if (tamanhoTela < 768) {
      closeNav()
      setControle(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tamanhoTela]);

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    setNewUrl(url)
    userDatas.url = url
  }, [pathname, searchParams, userDatas])

  return (
    <>
      <Row className=''>
        <Col xs={2} sm={2} md={tamanhoNav[0]} lg={tamanhoNav[1]} xl={tamanhoNav[2]} xxl={tamanhoNav[3]}>
        <motion.nav className="text-light" style={isOpen === true && { width: '365px', position: "fixed" } || { width: '140px', position: "fixed" }}
          animate={isOpen ? "open" : "closed"}
          variants={variants}>

          {botaoMobile === true &&
          <div className='d-flex flex-row-reverse mt-1'>
            <OverlayTrigger
                            placement='right'
                            overlay={
                                <Tooltip>
                                    Fechar
                                </Tooltip>
                            }
                        >
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}  style={{cursor: 'pointer', marginInlineEnd: '27px'}}>
          <IoClose   style={{fontSize: '30px'}} onClick={closeNav}/>
          </motion.div>
          </OverlayTrigger>
          </div>
          }

          {(botaoMobile === false && controle === true) &&
          <div className='d-flex justify-content-center mt-1'>
            <OverlayTrigger
                            placement='right'
                            overlay={
                                <Tooltip>
                                    Abrir
                                </Tooltip>
                            }
                        >
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}  style={{cursor: 'pointer', marginInlineEnd: '23px'}}>
          <BsArrowRightSquare style={{fontSize: '30px'}} onClick={openNav}/>
          </motion.div>
          </OverlayTrigger>
          </div>
          }
          
     

          {isOpen === true && <SideBarDesktop userData={userDatas} />}
          {isOpen === false && <SideBarMobile userData={userDatas} tamanhoTela={tamanhoTela} />}

        </motion.nav>
      </Col>
        <Col className='mt-4' xs={10} sm={10} md={tamanhoContent[0]} lg={tamanhoContent[1]} xl={tamanhoContent[2]} xxl={tamanhoContent[3]}>
        {newUrl === '/auth/inicio?' && <Dashboard/>}
        {newUrl === '/auth/inicio?page=email-tools' && <EmailTools/>}
        {newUrl === '/auth/inicio?page=emailtool1' && <EmailTool1/>}
        {newUrl === '/auth/inicio?page=file-tools' && <FileTools/>}
        {newUrl === '/auth/inicio?page=filetool1' && <FileTool1/>}
        {newUrl === '/auth/inicio?page=filetool2' && <FileTool2/>}
        {newUrl === '/auth/inicio?page=filetool3' && <FileTool3/>}
        {newUrl === '/auth/inicio?page=security-tools' && <SecurityTools/>}
        {newUrl === '/auth/inicio?page=securitytool1' && <SecurityTool1/>}
        {newUrl === '/auth/inicio?page=perfil' && <Perfil userData={userDatas}/>}
        </Col> 
      </Row>
     
    </>
  )
}