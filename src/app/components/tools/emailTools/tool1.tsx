import { auth } from '@/auth';
import imports from '../../importsPadrao';
import { MdOutlineEmail } from "react-icons/md";
import validator from 'validator';
import Loading from "../../loading";
import axios from 'axios';
import { any, element } from 'prop-types';
import { SubmitHandler } from 'react-hook-form';
import Image from 'next/image'
import { useSession } from "next-auth/react"

type DatasInput = {
    email: string
}

type Message = {
    IsSensitive: boolean;
    IsVerified: boolean;
    IsFabricated: boolean;
    IsRetired: boolean;
    IsSpamList: boolean;
    IsSubscriptionFree: boolean;
    DataClasses: string[];
    BreachDate: string;
    Title: string;
    LogoPath: string;
    Name: string;
    Description: string;
    Domain: string;
}

export default function Tool1() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    const { register, handleSubmit, formState: { errors } } = useForm<DatasInput>();
    //const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const [showLoading, setShowLoading] = useState(false);
    const [showMessage, setShowMessage] = useState<Message[]>([])
    const [controle, setControle] = useState(0)
    const [submitting, setSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const { data: session, status } = useSession()

    const onSubmit: SubmitHandler<DatasInput> = async (datas) => {
        try {
            setShowLoading(true);

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
                body: JSON.stringify({
                    email: datas.email,
                    apiKey: `${process.env.NEXT_PUBLIC_APIHAVEIBEENPWNED}`
                })
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_FLASKAPI_URL}/api/emailtool1`, options);
            const responseData = await response.json();

            type Breach = { Name: string; BreachDate: string; Domain: string };
            const provedores: Breach[] = [];

            if (responseData.message !== 'No breaches found') {
                responseData.message.forEach((x: Breach) => {
                    provedores.push({ Name: x.Name, BreachDate: x.BreachDate, Domain: x.Domain });
                });

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_URL}/api/services/createEmailBreaches`,
                    {
                        sessionEmail: session?.user?.email,
                        usuEmail: datas.email,
                        provedores: provedores,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                        },
                    }
                );

                await axios.post(
                    `${process.env.NEXT_PUBLIC_URL}/api/services/createToolLogs`,
                    {
                        toolName: 'Verificador de Email',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                        },
                    }
                );

                setShowMessage(responseData.message)
                setControle(1)
            } else {
                setControle(1)
                setShowMessage([])
            }

        } catch (error) {
            setControle(2)
            setShowMessage([])
            console.error(error);
        } finally {
            setShowLoading(false);
            setSubmitting(true);
            setCountdown(5);
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            setTimeout(() => {
                clearInterval(interval);
            }, 5000);
        }
    }

    useEffect(() => {
        if (submitting) {
            const timeout = setTimeout(() => {
                setSubmitting(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [submitting]);

    return (
        <>
            <Container fluid className='textoInicio w-100'>
                <Row className='Anta'>
                    <Col>
                        <h1 className='Anta ms-3 p-1 m-2'>Verificador de Email</h1>
                        <p className='p-1 m-2'>Verifique se seu email foi vazado!! </p>

                        <Row className='mt-2'>
                            <Col sm={12} lg={12} className="d-flex justify-content-center mt-4">
                                <Card className="text-center text-white p-2 rounded card-back" style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '23px' }}>Insira seu email</Card.Title>
                                        <Col className="mt-4">
                                            <Form.Control
                                                className={(errors?.email && "border-danger p-2") || "p-2"}
                                                type="email"
                                                id="email"
                                                placeholder="Continuar com E-mail"
                                                {...register("email", { required: true, validate: (value) => validator.isEmail(value) })}
                                                name='email'
                                            />
                                            {errors?.email?.type === 'required' && <p className="pt-2 text-danger fw-bold">Preencha este campo</p>}
                                            {errors?.email?.type === 'validate' && <p className="pt-2 text-danger fw-bold">E-mail Inválido</p>}
                                        </Col>
                                        <Col className="pt-1 pb-2 mt-3">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="botaoHIBP Anta"
                                                onClick={() => handleSubmit(onSubmit)()}
                                                disabled={submitting}
                                            >
                                                {submitting ? 'Esperando...' : 'Enviar'}
                                            </motion.button>
                                            {submitting && countdown > 0 && (
                                                <p className="text-white mt-2">Habilitando em {countdown} segundos...</p>
                                            )}
                                        </Col>
                                        <hr />
                                        <Col className='mt-4'>
                                            {showMessage.length > 0 &&
                                                <div className='p-3 vazamento'>
                                                    <Card.Title style={{ fontSize: '23px' }}>Vazamentos encontrados</Card.Title>
                                                    <p>Se proteja de vazamento de dados, melhore o nível de segurança de sua utilizando nosso gerador de senhas fortes:</p>
                                                    <Link href={{ pathname: './inicio', query: { page: 'securitytool1' } }} target="_blank">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="botaoModal"
                                                            style={{ backdropFilter: 'blur(25px)', fontSize: '16px' }}
                                                        > Acessar</motion.button>
                                                    </Link>
                                                    {showMessage.map((message, index) => (
                                                        <div key={index}>
                                                            <Image
                                                                src={message.LogoPath}
                                                                width={50}
                                                                height={50}
                                                                alt=""
                                                                className="m-4"
                                                            />
                                                            <h2>{message.Title}</h2>
                                                            <p><Link className="linkHIBP" href={{ pathname: 'https://haveibeenpwned.com/FAQs' }} target="_blank"><small>{message.IsSensitive === true && "(sensitive)"}</small></Link></p>
                                                            <p><Link className="linkHIBP" href={{ pathname: 'https://haveibeenpwned.com/FAQs' }} target="_blank"><small>{message.IsVerified === true && "(unverified)"}</small></Link></p>
                                                            <p><Link className="linkHIBP" href={{ pathname: 'https://haveibeenpwned.com/FAQs' }} target="_blank"><small>{message.IsFabricated === true && "(fabricated)"}</small></Link></p>
                                                            <p><Link className="linkHIBP" href={{ pathname: 'https://haveibeenpwned.com/FAQs' }} target="_blank"><small>{message.IsRetired === true && "(retired)"}</small></Link></p>
                                                            <p><Link className="linkHIBP" href={{ pathname: 'https://haveibeenpwned.com/FAQs' }} target="_blank"><small>{message.IsSpamList === true && "(spam list)"}</small></Link></p>
                                                            <p><Link className="linkHIBP" href={{ pathname: 'https://haveibeenpwned.com/FAQs' }} target="_blank"><small>{message.IsSubscriptionFree === true && "(subscription free)"}</small></Link></p>
                                                            <h5>{message.Domain}</h5>
                                                            <p><span className='fw-bold'>Data do Vazamento:</span> {message.BreachDate}</p>
                                                            <p><span className='fw-bold'>Dados comprometidos:</span> {message.DataClasses.map((dataClass, dataIndex) => (
                                                                <span key={dataIndex}>{dataClass}, </span>
                                                            ))}
                                                            </p>
                                                            <p className='linkDescription' dangerouslySetInnerHTML={{ __html: message.Description }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                            {showMessage.length === 0 && controle === 1 &&
                                                <div>
                                                    <Card.Title style={{ fontSize: '23px' }}>O seu email não foi identificado como comprometido.!!</Card.Title>
                                                </div>
                                            }
                                            {showMessage.length === 0 && controle === 2 &&
                                                <div>
                                                    <Card.Title style={{ fontSize: '23px', color: 'red' }}>Ocorreu uma falha na comunicação com nossa API.!!</Card.Title>
                                                </div>
                                            }
                                        </Col>
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Container>
            {showLoading === true && <Loading />}
        </>
    )
}