import VideoPlayer from '../VideoPlayer';
import imports from '../importsPadrao';
import { FaFile } from "react-icons/fa";

export default function WebTools() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    return (
        <>
        <Container fluid className='textoInicio'>
          <Row className='Anta'>
          <Col>
            <h1 className='Anta ms-3 p-1 m-2'>Ferramenta de Arquivos</h1>
            <p className='p-1 m-2'>Bem-vindo às Ferramentas de Arquivos! Aqui você pode encontrar várias ferramentas úteis para analisar e identficar informaçoes valiosas em arquivos. Escolha uma ferramenta abaixo e comece a melhorar a segurança e a eficiência dos seus e-mails.</p>

                <Row className='mt-4'>
                    <Col lg={4} className='mt-3'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <VideoPlayer src="/Media/Metadados.mp4" type=""/>
                    </div>
                        <div className='mt-3 text-center'>
                            <h4 style={{height: '60px'}}>Extrator de Metadados</h4>
                            <p style={{height: '100px'}}>Extraia os metadados de diversos tipos de arquivos!</p>
                            <Link href={{ pathname: './inicio', query: {page: 'filetool1'} }}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="botao"
                                style={{ backdropFilter: 'blur(25px)', fontSize: '18px' }}
                            > Acessar</motion.button>
                            </Link>
                        </div>
                    </Col>

                    <Col lg={4} className='mt-3'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <VideoPlayer src="/Media/Hash.mp4" type=""/>
                    </div>
                        <div className='mt-3 text-center'>
                            <h4 style={{height: '60px'}}>Calculadora de Hash</h4>
                            <p style={{height: '100px'}}>Calcule a hash de seus arquivos para comprovar sua veracidade!</p>
                            <Link href={{ pathname: './inicio', query: {page: 'filetool2'} }}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="botao"
                                style={{ backdropFilter: 'blur(25px)', fontSize: '18px' }}
                            > Acessar</motion.button>
                            </Link>
                        </div>
                    </Col>

                    <Col lg={4} className='mt-3'>
                        <div className='d-flex justify-content-center align-items-center'>
                        <VideoPlayer src="/Media/Imagem.mp4" type=""/>
                        </div>
                        <div className='mt-3 text-center'>
                            <h4 style={{height: '60px'}}>Processamento e Análise de Imagens</h4>
                            <p style={{height: '100px'}}>Análise forense em imagens, identificar manipulações em imagens.</p>
                            <Link href={{ pathname: './inicio', query: {page: 'filetool3'} }}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="botao"
                                style={{ backdropFilter: 'blur(25px)', fontSize: '18px' }}
                            > Acessar</motion.button>
                            </Link>
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
