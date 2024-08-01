import VideoPlayer from '../VideoPlayer';
import imports from '../importsPadrao';
import { MdOutlineEmail } from "react-icons/md";

export default function EmailTools() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    return (
        <>
        <Container fluid className='textoInicio'>
          <Row className='Anta'>
          <Col>
            <h1 className='Anta ms-3 p-1 m-2'>Ferramentas de E-mail</h1>
            <p className='p-1 m-2'>Bem-vindo às Ferramentas de E-mail! Aqui você pode encontrar várias ferramentas úteis para gerenciar e proteger suas contas de e-mail. Escolha uma ferramenta abaixo e comece a melhorar a segurança e a eficiência dos seus e-mails.</p>


                <Row className='mt-4'>
                    <Col lg={4} className='mt-3'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <VideoPlayer src="/Media/Email.mp4" type=""/>
                    </div>
                        <div className='mt-3 text-center'>
                            <h4 style={{height: '60px'}}>Verificador de Email</h4>
                            <p style={{height: '100px'}}>Verifique se seu endereço de e-mail foi comprometido em alguma violação de dados conhecida.</p>
                            <Link href={{ pathname: './inicio', query: {page: 'emailtool1'} }}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="botao"
                                style={{ backdropFilter: 'blur(25px)', fontSize: '16px' }}
                            > Acessar</motion.button>
                            </Link>
                        </div>
                    </Col>

                    <Col lg={4} className='mt-3'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <VideoPlayer src="/Media/background5.mp4" type=""/>
                        </div>
                        <div className='mt-3 text-center'>
                            <h4 style={{height: '60px'}}>Coming soon</h4>
                            <p style={{height: '100px'}}>No description</p>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="botao"
                                style={{ backdropFilter: 'blur(25px)', fontSize: '16px' }}
                            > Acessar</motion.button>
                        </div>
                    </Col>

                    <Col lg={4} className='mt-3'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <VideoPlayer src="/Media/background5.mp4" type=""/>
                        </div>
                        <div className='mt-3 text-center'>
                            <h4 style={{height: '60px'}}>Coming soon</h4>
                            <p style={{height: '100px'}}>No description</p>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="botao"
                                style={{ backdropFilter: 'blur(25px)', fontSize: '16px' }}
                            > Acessar</motion.button>
                        </div>
                    </Col>
                </Row>
                <br/>
            </Col>
            </Row>
            </Container>
        </>
    )
}
