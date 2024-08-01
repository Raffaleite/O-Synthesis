import imports from '../../importsPadrao';
import { MdOutlineEmail } from "react-icons/md";
import validator from 'validator';
import Loading from "../../loading";
import axios from 'axios';
import { any } from 'prop-types';
import { SubmitHandler } from 'react-hook-form';
import { useSession } from "next-auth/react"

type DatasInput = {
    senha: string,
    maiusculas: boolean,
    minusculas: boolean,
    digitos: boolean,
    caracteres_especiais: boolean,
    tamanho_maximo: number,
    tamanho_minimo: number
}

type Dados = {
    password: string,
}

export default function Tool1() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DatasInput>();
    const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const [showLoading, setShowLoading] = useState(false);
    const [showMessage, setShowMessage] = useState('')
    const { data: session } = useSession()
    const [pass, setPass] = useState<Dados[]>([])

    const getPass = async () => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_URL}/api/services/getGeneratedPasswords`,
            {
                usuEmail: session?.user?.email,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
            }
        );

        const data = response.data
        setPass(data.allPasswords);
    }

    const onSubmit: SubmitHandler<DatasInput> = async (datas) => {
        try {
            setShowLoading(true);
            const max = parseInt(datas.tamanho_maximo.toString());
            const min = parseInt(datas.tamanho_minimo.toString());

            if (max < min) {
                setShowMessage("O tamanho máximo não pode ser menor que o tamanho mínimo");
                return;
            } else {
                setShowMessage("");
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
                body: JSON.stringify({
                    tamanho_minimo: datas.tamanho_minimo,
                    tamanho_maximo: datas.tamanho_maximo,
                    maiusculas: datas.maiusculas,
                    minusculas: datas.minusculas,
                    digitos: datas.digitos,
                    caracteres_especiais: datas.caracteres_especiais
                })
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_FLASKAPI_URL}/api/securitytool1`, options);
            const responseData = await response.json();
            if (responseData) {
                setValue("senha", responseData.message);

                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_URL}/api/services/createGeneratedPassword`,
                        {
                            usuEmail: session?.user?.email,
                            generatedPassword: responseData.message
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
                            toolName: 'Gerador de Senha',
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                            },
                        }
                    );

                    getPass()
                } catch (e) {
                    console.log(e)
                }
            }

        } catch (error) {
            console.error(error);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        getPass()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Container fluid className='textoInicio w-100'>
                <Row className='Anta'>
                    <Col>
                        <h1 className='Anta ms-3 p-1 m-2'>Gerador de senha</h1>
                        <p className='p-1 m-2'>Gere uma senha forte e segura com as suas preferências!! </p>
                        <Row className='mt-2'>
                            <Col sm={12} lg={7} className="justify-content-center mt-4 mb-4">
                                <Card className="text-center text-white p-4 rounded card-back canvasH">
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '23px' }}>Defina suas preferências</Card.Title>
                                        <small style={{ color: 'rgb(170, 13, 13)', fontWeight: 'bold' }}>Selecione pelo menos uma das opções abaixo!!!</small>
                                        <Col sm={12} className='mt-4'>
                                            <Row>
                                                <Col sm={12} lg={6}>
                                                    <Form.Check
                                                        type='checkbox'
                                                        label='Maiúsculas'
                                                        id='maiuscula'
                                                        {...register("maiusculas", { required: false })}
                                                    />
                                                </Col>
                                                <Col sm={12} lg={6}>
                                                    <Form.Check
                                                        type='checkbox'
                                                        label='Minúsculas'
                                                        id='minuscula'
                                                        {...register("minusculas", { required: false })}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} className='mt-4'>
                                            <Row>
                                                <Col sm={12} lg={6}>
                                                    <Form.Check
                                                        type='checkbox'
                                                        label='Digitos numéricos'
                                                        id='digitos'
                                                        {...register("digitos", { required: false })}
                                                    />
                                                </Col>
                                                <Col sm={12} lg={6}>
                                                    <Form.Check
                                                        type='checkbox'
                                                        label='Caracteres Especiais'
                                                        id='caracteres_especiais'
                                                        {...register("caracteres_especiais", { required: false })}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} className='mt-4'>
                                            <Row>
                                                <Col sm={12} lg={6}>
                                                    <Form.Control
                                                        type='number'
                                                        max={15}
                                                        min={0}
                                                        placeholder='Tamanho Mínimo'
                                                        className={(credenciaisErradas === 1 && "border-danger m-2") || (errors?.tamanho_minimo && "border-danger m-2") || "m-2"}
                                                        {...register("tamanho_minimo", {
                                                            required: true,
                                                            min: {
                                                                value: 0,
                                                                message: "O valor deve ser no mínimo 0"
                                                            },
                                                            max: {
                                                                value: 15,
                                                                message: "O valor deve ser no máximo 15"
                                                            },
                                                            validate: value => Number.isInteger(Number(value)) || "O valor deve ser um número inteiro"
                                                        })}
                                                    />
                                                </Col>
                                                <Col sm={12} lg={6}>
                                                    <Form.Control
                                                        type='number'
                                                        max={15}
                                                        min={0}
                                                        placeholder='Tamanho Máximo'
                                                        className={(credenciaisErradas === 1 && "border-danger m-2") || (errors?.tamanho_maximo && "border-danger m-2") || "m-2"}
                                                        {...register("tamanho_maximo", {
                                                            required: true,
                                                            min: {
                                                                value: 0,
                                                                message: "O valor deve ser no mínimo 0"
                                                            },
                                                            max: {
                                                                value: 15,
                                                                message: "O valor deve ser no máximo 15"
                                                            },
                                                            validate: value => Number.isInteger(Number(value)) || "O valor deve ser um número inteiro"
                                                        })}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        {(errors.tamanho_minimo || errors.tamanho_maximo) && <p className="text-danger fw-bold">{errors?.tamanho_minimo?.message || errors?.tamanho_maximo?.message}</p>}
                                        {(errors.tamanho_minimo?.type === 'required' || errors.tamanho_maximo?.type === 'required') && <p className="text-danger fw-bold">Os campos de tamanho são obrigatório</p>}
                                        {showMessage !== '' && <p className="text-danger fw-bold">{showMessage}</p>}

                                        <Col className="pt-1 pb-2 mt-3">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="botaoModal Anta"
                                                onClick={() => handleSubmit(onSubmit)()}
                                            >
                                                Gerar
                                            </motion.button>
                                        </Col>
                                        <hr />
                                        <Col className='mt-4'>
                                            <Card.Title style={{ fontSize: '23px' }}>Sua senha gerada</Card.Title>
                                            <Form.Control
                                                type="text"
                                                id="senha"
                                                placeholder="Senha Gerada"
                                                {...register("senha", { required: false })}
                                                name='senha'
                                                readOnly
                                            />
                                        </Col>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col sm={12} lg={5} className="justify-content-center mt-4 mb-4">
                                <Card className="text-center text-white p-2 rounded card-back canvasH" >
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '23px' }}>Suas Ultimas Senhas</Card.Title>
                                        {pass && (
                                            <div className='d-flex flex-column align-content-center mt-3'>
                                                {pass.map((x, index) => (
                                                    <div key={index} className='mt-5'>
                                                        {x.password}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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