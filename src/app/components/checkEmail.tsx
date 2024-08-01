'use client';
import imports from './importsPadrao';
import { useSession, signIn, signOut } from 'next-auth/react';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)'
    },
    content: {
        maxWidth: '400px',
        minWidth: '300px',
        width: 'auto',
        maxHeight: '280px',
        minHeight: '240px',
        height: 'auto',
        margin: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.925)',
        border: '4px solid black',
        borderRadius: '8px', // 
        color: "white"
    }
};


type DatasInput = {
    email: string,
    password: string,
    conectado: boolean
}

export default function CheckEmail() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    const { register, handleSubmit, formState: { errors } } = useForm<DatasInput>();
    const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const router = useRouter()
    const [showLoading, setShowLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const session = useSession();

    useEffect(() => {
        if(localStorage.getItem("email") != "EmailEnviado")
            {
                router.replace('/auth/login')
            }

        if (session.status === "authenticated") {
            openModal();
          }

        document.title = "Cheque seu E-mail";
        return () => {
            document.title = "O-Synthesis";
        };
    }, [session, router]);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        signOut()
        setIsOpen(false);
    };
    const saveConnected = () => {
        router.push('/auth/inicio')
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
            <Container style={{ marginTop: '150px' }} className='Anta'>
                <Col className="d-flex justify-content-center mt-4 p-4">
                    <Card className="text-white card-back p-3 rounded" style={{ width: "430px" }}>
                        <Card.Body className="text-center">
                            <Card.Title className="p-3" style={{ fontSize: '23px' }}>Cheque seu E-mail</Card.Title>
                                <p>Um e-mail foi enviado para a sua caixa de entrada com instruções para fazer login em nosso site.</p>
                                <small>Ao clicar no botão de login, uma nova aba será aberta para facilitar seu acesso.</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>

            <Container className='justify-content-center align-items-center'>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    shouldCloseOnOverlayClick={false}
                    ariaHideApp={false}
                >
                    <Container fluid className='Anta'>
                        <Col className='text-center'>
                            <h4>Você ja está logado</h4>
                        </Col>
                        <Col className='text-center'>
                            <h5>Deseja manter-se conectado?</h5>
                        </Col>
                        <Col className='d-flex justify-content-center mt-4'>
                            <Row>
                                <Col sm={12} className="text-center p-1">
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        className="botaoModal"
                                        onClick={saveConnected}
                                    >
                                        Sim
                                    </motion.button>
                                </Col>
                                <Col sm={12} className="text-center p-1">
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        className="botaoModal"
                                        onClick={closeModal}
                                    >
                                        Não
                                    </motion.button>
                                </Col>
                            </Row>
                        </Col>
                    </Container>
                </Modal>
            </Container>
            </motion.div>
        </>
    )
}