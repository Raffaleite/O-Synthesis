'use client'
import imports from './importsPadrao';
import Loading from "./loading";
import { SubmitHandler } from 'react-hook-form';
import validator from 'validator';
import paises from '../../../public/Media/paises.json';
import { IoMdArrowDropdown } from "react-icons/io";


export interface SessionData {
    image: string,
    email: string;
    name: string
  }
  
  interface SessionDataProps {
    SessionData: SessionData;
  }

export default function PagNewuser({SessionData}: SessionDataProps) {
    type DatasInput = {
        usuName: string
        usuEmail: string,
        usuImage: string,
        usuNacionality: string,
        usuProfession: string,
    }


    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DatasInput>();
    const [showLoading, setShowLoading] = useState(false);
    const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const [countries, setCountries] = useState<any[]>([]);
    const router = useRouter()


    useEffect(() => {
        setValue("usuName", SessionData.name)
        setValue("usuEmail", SessionData.email)
        setCountries(paises);
        document.title = "Começo";
        return () => {
            document.title = "O-Synthesis";
        };
    }, [SessionData, setValue, axios, router]);

    const onSubmit: SubmitHandler<DatasInput> = async (datas) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/services/updateDataNewUser`,
                {   usuEmail: datas.usuEmail,
                    usuName: datas.usuName,
                    usuImage: datas.usuImage,
                    usuProfession: datas.usuProfession,
                    usuNacionality: datas.usuNacionality },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
                    }
                }
            )

            router.replace('./inicio')

        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Container style={{ marginTop: '150px' }} className='Anta'>
                    <Col className="d-flex justify-content-center mt-4 p-4">
                        <Card className="text-center text-white card-back p-3 rounded" style={{ width: "430px" }}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: '23px' }}>Confirme Seu Perfil</Card.Title>
                                <Col className="mt-4">
                                <Form.Control
                                        className={(errors?.usuName && "border-danger p-2") || "p-2"}
                                        type="text"
                                        placeholder="Nome Completo"
                                        {...register("usuName", { required: true})}
                                        spellCheck="false"
                                        data-ms-editor="false"
                                    />

                                    {errors?.usuName ?.type === 'required' && <p className="text-danger fw-bold mt-1">Preencha este campo</p>}
                                </Col>
                                <Col className="mt-4">
                                    <Form.Control
                                        className={(credenciaisErradas === 1 && "border-danger p-2") || (errors?.usuEmail && "border-danger p-2") || "p-2"}
                                        type="email"
                                        id="usuEmail"
                                        placeholder="E-mail"
                                        {...register("usuEmail", { required: true, validate: (value) => validator.isEmail(value) })}
                                        name='usuEmail'
                                        spellCheck="false"
                                        data-ms-editor="false"
                                        readOnly
                                    />
                                    {errors?.usuEmail?.type === 'required' && <p className="pt-2 text-danger fw-bold">Preencha este campo</p>}
                                    {errors?.usuEmail?.type === 'validate' && <p className="pt-2 text-danger fw-bold">E-mail Inválido</p>}
                                </Col>

                                <Col className="mt-3">
                                <IoMdArrowDropdown className="position-absolute translate-middle-y text-white select-pais"
                                                    style={{ marginTop: '20px', fontSize: '20px' }} />
                                    <Form.Select
                                        defaultValue={'0'}
                                        className={(errors?.usuProfession && "border-danger form-select bg-transparent p-2") || "form-select bg-transparent p-2"}
                                        {...register("usuProfession", { validate: (value) => value !== "0" })}
                                    >
                                        <option value="0" disabled>Profissão</option>
                                        <option value="perito">Perito</option>
                                        <option value="professor">Professor</option>
                                        <option value="estudante">Estudante</option>
                                        <option value="usuario">Usuário</option>
                                    </Form.Select>
                                    {errors?.usuProfession?.type === 'validate' && <p className="text-danger fw-bold mt-1">Escolha inválida</p>}
                                </Col>

                                <Col className="mt-3">
                                <IoMdArrowDropdown className="position-absolute translate-middle-y text-white select-pais"
                                                    style={{ marginTop: '20px', fontSize: '20px' }} />
                                    <Form.Select
                                        defaultValue={'0'}
                                        className={(errors?.usuNacionality && "border-danger form-select bg-transparent p-2") || "form-select bg-transparent p-2"}
                                        {...register("usuNacionality", { validate: (value) => value !== "0" })}
                                        id='usuNacionality'
                                    >
                                        <option value="0" disabled>Nacionalidade</option>
                                        {countries.map((item, index) => (
                                            <option key={item.nome_pais} value={item.nome_pais}>{item.nome_pais}</option>
                                        ))}
                                    </Form.Select>

                                    {errors?.usuNacionality?.type === 'validate' && <p className="text-danger fw-bold mt-1">Escolha inválida</p>}
                                </Col>


                                <Col className="pt-1 pb-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="botao Anta"
                                        onClick={() => handleSubmit(onSubmit)()}
                                    >
                                        Continuar
                                    </motion.button>
                                </Col>

                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            </motion.div>
            {showLoading === true && <Loading />}
        </>
    )
}