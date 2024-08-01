"use client"
import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from 'framer-motion'
import Image from 'next/image'


export default function Navs() {
    return (
        <>
        <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
          <Navbar key='xl' expand='xl' fixed="top" className="bg-black bg-opacity-75 Anta" style={{zIndex: 1}}>
                <Container fluid className="p-1">            
                    <Navbar.Brand href="/" className="fw-bold text-white m-2 NicoMoji">
                    <Image
                    src="/Media/logoTeste2.svg"
                    width={50}
                    height={50}
                    alt=""
                    className="me-2"
                    />
                    O-Synthesis
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='offcanvasNavbar-expand-xl'><AiOutlineMenu className="text-light h2" /></Navbar.Toggle>
                    <Navbar.Offcanvas
                        id='offcanvasNavbar-expand-xl}'
                        aria-labelledby='offcanvasNavbarLabel-expand-xl'
                        placement="start"
                    ><Offcanvas.Header closeButton>
                            <Offcanvas.Title id='offcanvasNavbarLabel-expand-xl'>
                                <span className="" style={{marginRight: '220px'}}>Navegação</span>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="me-auto mb-2 mb-lg-0 justify-content-end col-12">
                                <Nav.Item>
                                    <Nav.Link  href="/" className="linkNav" aria-current="page">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/contato" className="linkNav">Contato</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/sobre" className="linkNav">Sobre</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/auth/login"  className="linkNav loginNav ">Login</Nav.Link>
                                </Nav.Item>
                            </Nav>                    
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>               
                </Container>
            </Navbar>
            </motion.div>
            </>
    );
  }
  
