'use client'
import imports from './importsPadrao';
import { FaSearch } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";
import { FaFile } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci";
import { UserDatas } from './paginaInicio'
import { FaUser } from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



interface SideBarMobileProps {
    userData: UserDatas;
    tamanhoTela: number
}

export default function SideBarMobile({ userData, tamanhoTela }: SideBarMobileProps) {
    const { React, motion, Container, Row, Col, Link } = imports;


    return (
        <>
            <Container fluid className='d-flex flex-column vh-100'>

                <Row className="flex-grow-1 ms-4 Anta">
                    <Col className='d-flex flex-column justify-content-start'>
                        <Col className='d-flex flex-column align-items-end justify-content-center me-2 mb-3 mt-2'>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                <Link href={{ pathname: './inicio' }} className="fs-5 text-decoration-none text-white">
                                    <Image
                                        src={"/Media/logoTeste2.svg"}
                                        width={50}
                                        height={50}
                                        alt=""
                                        className="rounded p-1 mt-2"
                                    />{''}
                                </Link>
                            </motion.div>
                        </Col>
                        <Col className='mt-1'>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                <Link href={{ pathname: './inicio' }} className="fs-5 text-decoration-none text-white">
                                    <FaSearch style={{ fontSize: "25px" }} />
                                </Link>
                            </motion.div>
                        </Col>
                        <Col className=''>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                {tamanhoTela > 767 && <OverlayTrigger
                                    placement='right'
                                    overlay={
                                        <Tooltip>
                                            Dashboard
                                        </Tooltip>
                                    }
                                >
                                    <Link href={{ pathname: './inicio' }} className="fs-5 text-decoration-none text-white">
                                        <MdSpaceDashboard style={{ fontSize: "25px" }} />
                                    </Link>
                                </OverlayTrigger>}
                                {tamanhoTela <= 767 && <Link href={{ pathname: './inicio' }} className="fs-5 text-decoration-none text-white">
                                    <MdSpaceDashboard style={{ fontSize: "25px" }} />
                                </Link>}
                            </motion.div>
                        </Col>
                        <Col className=''>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                {tamanhoTela > 767 && <OverlayTrigger
                                    placement='right'
                                    overlay={
                                        <Tooltip>
                                            Email Tools
                                        </Tooltip>
                                    }
                                >
                                    <Link href={{ pathname: './inicio', query: { page: 'email-tools' } }} className="fs-5 text-decoration-none text-white">
                                        <MdOutlineEmail style={{ fontSize: "25px" }} />
                                    </Link>
                                </OverlayTrigger>}
                                {tamanhoTela <= 767 && <Link href={{ pathname: './inicio', query: { page: 'email-tools' } }} className="fs-5 text-decoration-none text-white">
                                    <MdOutlineEmail style={{ fontSize: "25px" }} />
                                </Link>}
                            </motion.div>
                        </Col>
                        <Col className=''>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                {tamanhoTela > 767 && <OverlayTrigger
                                    placement='right'
                                    overlay={
                                        <Tooltip>
                                            File Tools
                                        </Tooltip>
                                    }
                                >
                                    <Link href={{ pathname: './inicio', query: { page: 'file-tools' } }} className="fs-5 text-decoration-none text-white">
                                        <FaFile style={{ fontSize: "25px" }} />
                                    </Link>
                                </OverlayTrigger>}

                                {tamanhoTela <= 767 && <Link href={{ pathname: './inicio', query: { page: 'file-tools' } }} className="fs-5 text-decoration-none text-white">
                                    <FaFile style={{ fontSize: "25px" }} />
                                </Link>}
                            </motion.div>
                        </Col>
                        <Col className=''>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                {tamanhoTela > 767 && <OverlayTrigger
                                    placement='right'
                                    overlay={
                                        <Tooltip>
                                            Security Tools
                                        </Tooltip>
                                    }
                                >
                                    <Link href={{ pathname: './inicio', query: { page: 'security-tools' } }} className="fs-5 text-decoration-none text-white">
                                        <MdOutlineSecurity style={{ fontSize: "25px" }} />
                                    </Link>
                                </OverlayTrigger>}

                                {tamanhoTela <= 767 && <Link href={{ pathname: './inicio', query: { page: 'security-tools' } }} className="fs-5 text-decoration-none text-white">
                                    <MdOutlineSecurity style={{ fontSize: "25px" }} />
                                </Link>}
                            </motion.div>
                        </Col>
                        <Col className=''>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                {tamanhoTela > 767 && <OverlayTrigger
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
                                        <CiLogout className='d-flex' style={{ fontSize: "25px" }} />
                                    </Link>
                                </OverlayTrigger>}

                                {tamanhoTela <= 767 && <Link href='#'
                                    className="Anta text-white"
                                    onClick={() => signOut()}
                                >
                                    <CiLogout className='d-flex' style={{ fontSize: "25px" }} />
                                </Link>}
                            </motion.div>
                        </Col>
                        <Col className='d-flex flex-column align-items-end justify-content-start me-2 mb-3'>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                {tamanhoTela > 767 && <OverlayTrigger
                                    placement='right'
                                    overlay={
                                        <Tooltip>
                                            Perfil
                                        </Tooltip>
                                    }
                                >
                                    <Link href={{ pathname: './inicio', query: { page: 'perfil' } }} className="fs-5 text-decoration-none text-white">
                                        <Image
                                            src={userData.usuImage ?? "/Media/logoTeste2.svg"}
                                            width={50}
                                            height={50}
                                            alt=""
                                            className="rounded-circle"

                                        />{''}
                                    </Link>
                                </OverlayTrigger>}

                                {tamanhoTela <= 767 && <Link href={{ pathname: './inicio', query: { page: 'perfil' } }} className="fs-5 text-decoration-none text-white">
                                    <Image
                                        src={userData.usuImage ?? "/Media/logoTeste2.svg"}
                                        width={50}
                                        height={50}
                                        alt=""
                                        className="rounded-circle"

                                    />{''}
                                </Link>}
                            </motion.div>
                        </Col>
                    </Col>
                </Row>
            </Container>
            <video id="background-video-nav-mobile" autoPlay loop muted>
                <source src='/' type="video/mp4" />
            </video>

        </>
    )
}