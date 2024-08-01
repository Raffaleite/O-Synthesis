'use client'
import imports from './importsPadrao';
import { FaSearch } from "react-icons/fa";
import { BsBarChart } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";
import { FaFile } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { useSession, signOut } from "next-auth/react"
import { RiLogoutBoxLine } from "react-icons/ri";
import Image from 'next/image'
import { UserDatas } from './paginaInicio'
import { FaUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { IoClose } from "react-icons/io5";


interface SideBarDesktopProps {
    userData: UserDatas;
}

export default function SideBarDesktop({ userData }: SideBarDesktopProps) {
    const { React, motion, Container, Row, Col, Link, Form } = imports;

    return (
        <>
            <Container fluid className='d-flex flex-column vh-100'>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    <Link href={{ pathname: './inicio' }} className="fs-5 text-decoration-none text-white">
                        <h2 className="text-left NicoMoji pt-2 ps-4 mt-2" style={{ fontSize: '23px' }}>O-Synthesis</h2>
                    </Link>
                </motion.div>

                <Form.Group className="mt-4 p-2 ms-2 mb-4" controlId="formSearch" style={{ width: '300px' }}>
                    <motion.div className="position-relative" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                        <Form.Control type="text" placeholder="Pesquisar" className="p-3" spellCheck="false" data-ms-editor="false" />
                        <Link href={'#'}><FaSearch className="position-absolute top-50 translate-middle-y text-white"
                            style={{ marginLeft: '240px', fontSize: '20px' }} /></Link>
                    </motion.div>
                </Form.Group>

                <Row className="flex-grow-1 ms-4 Anta">
                    <Col className='d-flex flex-column justify-content-center'>
                        <Col className='mt-1 d-flex'>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            ><Link href={{ pathname: './inicio' }} className="fs-5 text-decoration-none text-white"> <MdSpaceDashboard className='mb-1 h4' /> DashBoard
                                    {userData.url === '/auth/inicio?' && <Badge bg="transparent" className='pt-2'> <SlArrowRight style={{ fontSize: '18px', marginBottom: '3px' }} /> </Badge>}</Link>
                            </motion.div>
                        </Col>
                        <Col className='d-flex'>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            ><Link href={{ pathname: './inicio', query: { page: 'email-tools' } }} className="fs-5 text-decoration-none text-white"> <MdOutlineEmail className='mb-1 h4' /> E-Mail
                                    {userData.url === '/auth/inicio?page=email-tools' && <Badge bg="transparent" className='pt-2'> <SlArrowRight style={{ fontSize: '18px', marginBottom: '3px' }} /> </Badge>}
                                </Link></motion.div>
                        </Col>
                        <Col className='d-flex'>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            ><Link href={{ pathname: './inicio', query: { page: 'file-tools' } }} className="fs-5 text-decoration-none text-white"> <FaFile className='mb-1 h4' /> Arquivos
                                    {userData.url === '/auth/inicio?page=file-tools' && <Badge bg="transparent" className='pt-2'> <SlArrowRight style={{ fontSize: '18px', marginBottom: '3px' }} /> </Badge>}
                                </Link></motion.div>
                        </Col>
                        <Col className='d-flex'>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            ><Link href={{ pathname: './inicio', query: { page: 'security-tools' } }} className="fs-5 text-decoration-none text-white"> <MdOutlineSecurity className='mb-1 h4' /> Proteção
                                    {userData.url === '/auth/inicio?page=security-tools' && <Badge bg="transparent" className='pt-2'> <SlArrowRight style={{ fontSize: '18px', marginBottom: '3px' }} /> </Badge>}
                                </Link></motion.div>
                        </Col>
                        <Col className='d-flex'>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            ><Link href={{ pathname: './inicio', query: { page: 'perfil' } }} className="fs-5 text-decoration-none text-white"> <FaUser className='mb-1 h4' /> Perfil
                                    {userData.url === '/auth/inicio?page=perfil' && <Badge bg="transparent" className='pt-2'> <SlArrowRight style={{ fontSize: '18px', marginBottom: '3px' }} /> </Badge>}
                                </Link></motion.div>
                        </Col>
                    </Col>
                </Row>
                <Row className='p-1 ms-1 mb-5'>
                    <Col sm={2} className='d-flex align-items-center' >
                        <Image
                            src={userData.usuImage ?? "/Media/logoTeste2.svg"}
                            width={50}
                            height={50}
                            alt=""
                            className="rounded-circle mb-3"
                        />{''}
                    </Col>
                    <Col sm={6} className='d-flex flex-column align-items-start justify-content-center ms-2'>
                        <p className='nomeMaximo fs-6' style={{ marginBottom: '-2px' }}>{userData.usuName ?? 'Usuario'}
                        </p>
                        <p className='nomeMaximo' style={{ fontSize: "13px" }}> {userData.usuEmail ?? 'E-mail'}</p>
                    </Col>
                    <Col sm={2} className='d-flex align-items-center justify-content-center'>
                        <OverlayTrigger
                            placement='right'
                            overlay={
                                <Tooltip>
                                    Sair
                                </Tooltip>
                            }
                        >
                            <Link href='#'
                                className="Anta text-white"
                                onClick={() => signOut()}
                            >
                                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                    <RiLogoutBoxLine style={{ fontSize: "32px" }} /></motion.div>
                            </Link>
                        </OverlayTrigger>
                    </Col>
                </Row>
            </Container>
            <video id="background-video-nav" autoPlay loop muted>
                <source src='/' type="video/mp4" />
            </video>

        </>
    )
}