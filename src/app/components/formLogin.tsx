'use client';
import imports from './importsPadrao';
import { SubmitHandler } from "react-hook-form"
import validator from 'validator';
import { useSession, signIn, signOut } from 'next-auth/react';
import { BsGoogle } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import Loading from "./loading";

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)'
    },
    content: {
        maxWidth: '430px',
        minWidth: '300px',
        width: 'auto',
        maxHeight: '250px',
        minHeight: '240px',
        height: 'auto',
        margin: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.925)',
        border: '4px solid black',
        borderRadius: '8px',
        color: "white"
    }
};


type DatasInput = {
    email: string,
    password: string,
    conectado: boolean
}

export default function FormLogin() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    const { register, handleSubmit, formState: { errors } } = useForm<DatasInput>();
    const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const router = useRouter()
    const [showLoading, setShowLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const session = useSession();
    const [erroLinkAccount, setErroLinkAccount] = useState(false);

    useEffect(() => {
        if (window.location.href === `${process.env.NEXT_PUBLIC_URL}/auth/login?error=AccessDenied`) {
            setErroLinkAccount(true)
        }

        if (session.status === "authenticated") {
            openModal();
        }
        document.title = "Login";
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
        router.push('./newuser')
    };

    const onSubmit: SubmitHandler<DatasInput> = async (datas) => {
        try {
            setShowLoading(true);
            localStorage.setItem('email', "EmailEnviado")
            await signIn('nodemailer', {
                email: datas.email,
                callbackUrl: `${window.location.origin}/newuser`
            })
        } catch (error) {
            console.log(error)
        } finally {
            setShowLoading(false);
        }

    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Container style={{ marginTop: '150px' }} className='Anta d-flex flex-column'>
                    <Col className="d-flex justify-content-center mt-4 p-4">
                        <Card className="text-center text-white card-back p-3 rounded" style={{ width: "430px" }}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: '23px' }}>Faça Login ou Registre-se</Card.Title>

                                <Col className="mt-4">
                                    <Form.Control
                                        className={(credenciaisErradas === 1 && "border-danger p-2") || (errors?.email && "border-danger p-2") || "p-2"}
                                        type="email"
                                        id="email"
                                        placeholder="Continuar com E-mail"
                                        {...register("email", { required: true, validate: (value) => validator.isEmail(value) })}
                                        name='email'
                                    />
                                    {errors?.email?.type === 'required' && <p className="pt-2 text-danger fw-bold">Preencha este campo</p>}
                                    {errors?.email?.type === 'validate' && <p className="pt-2 text-danger fw-bold">E-mail Inválido</p>}
                                    {credenciaisErradas === 1 && <p className="pt-2 text-danger fw-bold">E-mail ou Senha inválidos</p>}
                                    {erroLinkAccount === true && <p className="pt-2 text-danger fw-bold">E-mail Já Cadastrado Por Outro Provedor</p>}
                                </Col>

                                <Col className="pt-1 pb-2 mt-3">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="botao Anta"
                                        onClick={() => handleSubmit(onSubmit)()}
                                    >
                                        Continuar
                                    </motion.button>
                                </Col>

                                <div className='or p-3'>
                                    OU
                                </div>
                                <Row>
                                    <Col className="p-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="botaoIcon"
                                            onClick={() => signIn('google', { redirectTo: "/auth/newuser" })}
                                        >
                                            <BsGoogle style={{ fontSize: "25px" }} />
                                        </motion.button>
                                    </Col>

                                    <Col className="p-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="botaoIcon"
                                            onClick={() => signIn('github', { redirectTo: "/auth/newuser" })}
                                        >
                                            <BsGithub style={{ fontSize: "25px" }} />
                                        </motion.button>
                                    </Col>

                                    {/*<Col className="p-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="botaoIcon"
                                            onClick={() => signIn('discord', { redirectTo: "/auth/newuser" })}
                                        >
                                            <BsDiscord style={{ fontSize: "25px" }} />
                                        </motion.button>
                                    </Col> */}
                                </Row>
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
            {showLoading === true && <Loading />}
        </>
    )
}

