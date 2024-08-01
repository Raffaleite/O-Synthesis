import imports from '../importsPadrao';
import { SubmitHandler } from 'react-hook-form';
import validator from 'validator';
import paises from '../../../../public/Media/paises.json';
import { IoMdArrowDropdown } from "react-icons/io";
import { useSession, signIn, signOut } from 'next-auth/react';
import { MdOutlineEmail } from "react-icons/md";
import { UserDatas } from '../paginaInicio'
import Image from 'next/image'

interface SideBarPerfilProps {
    userData: UserDatas;
}

export default function Perfil ({ userData }: SideBarPerfilProps) {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;

    type DatasInput = {
        usuName: string
        usuEmail: string,
        usuImage: FileList;
        usuNacionality: string,
        usuProfession: string,
    }

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DatasInput>();
    const [showLoading, setShowLoading] = useState(false);
    const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const [countries, setCountries] = useState<any[]>([]);
    const [imagemFile, setImagemFile] = useState<string>('');
    const [hiddenFile, setHiddenFile] = useState(false)
    const router = useRouter();

    useEffect(() => {
        setValue("usuName", userData.usuName)
        setValue("usuEmail", userData.usuEmail)
        setValue("usuProfession", userData.usuProfession)
        setValue("usuNacionality", userData.usuNacionality)

        setCountries(paises);
        document.title = "Começo";
        return () => {
            document.title = "O-Synthesis";
        };
    }, [setValue, userData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const urlImage = URL.createObjectURL(file);
            setImagemFile(urlImage);
            setHiddenFile(true)
        } else {
            setImagemFile('');
            setHiddenFile(false)
        }
    }

    const onSubmit: SubmitHandler<DatasInput> = async (datas) => {
        try {
            setShowLoading(true);

            const formData = new FormData();
            formData.append("usuImage", datas.usuImage[0]);
            formData.append("usuEmail", datas.usuEmail);
            formData.append("usuName", datas.usuName);
            formData.append("usuProfession",datas.usuProfession);
            formData.append("usuNacionality", datas.usuNacionality);

          
            await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/services/updateData`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )

            router.refresh()

        } catch (error) {
            console.log(error)
        } finally {
            setShowLoading(false);
        }
    }

    return (
        <>
            <Container fluid className='d-flex flex-column textoInicio'>
                <Row className="flex-grow-1 Anta">
                    <Col className='d-flex flex-column'>
                        <h1 className='Anta ms-3 p-1 m-2'>Seu Perfil</h1>
                        <p className='p-1 m-2'>Lorem ipsum dolor, sit amet consectetur adipisicing </p>

                        <Container className='mt-2'>
                            <Row>
                                <Col sm={12} className="d-flex justify-content-center mt-4">
                                    <Card className="text-center text-white p-2 rounded card-back">
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: '23px' }}>Atualize Seu Perfil</Card.Title>
                                            <Col className='mt-4' >
                                                { hiddenFile === false && 
                                                <Image
                                                    src={userData.usuImage}
                                                    width={70}
                                                    height={70}
                                                    alt=""
                                                    className="rounded-circle"
                                                /> }
                                                { hiddenFile === true && 
                                                <Image
                                                    src={imagemFile}
                                                    width={70}
                                                    height={70}
                                                    alt=""
                                                    className="rounded-circle"
                                                /> }
                                            </Col>
                                            <Col className="mt-4">
                                                <motion.label htmlFor="file-upload" whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }} className="custom-file-upload ps-3 pt-2 pb-2">
                                                    Selecionar Imagem
                                                </motion.label>
                                                <Form.Control id="file-upload" size="sm" type="file" {...register("usuImage", { required: false })} accept="image/png, image/jpeg, image/svg, image/svg+xml" onChange={handleFileChange} className="position-absolute top-0 start-0 translate-middle"
                                                        style={{
                                                            opacity: 0,
                                                            width: '1px',
                                                            height: '1px',
                                                            overflow: 'hidden',
                                                            zIndex: -1
                                                        }} />
                                               
                                            </Col>
                                            <Col className="mt-4">
                                                <Form.Control
                                                    className={(errors?.usuName && "border-danger p-2") || "p-2"}
                                                    type="text"
                                                    placeholder="Nome Completo"
                                                    {...register("usuName", { required: true })}
                                                    spellCheck="false"
                                                    data-ms-editor="false"
                                                />

                                                {errors?.usuName?.type === 'required' && <p className="text-danger fw-bold mt-1">Preencha este campo</p>}
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
                                                <select
                                                    defaultValue={'0'}
                                                    className={(errors?.usuProfession && "border-danger form-select bg-transparent p-2") || "form-select bg-transparent p-2"}
                                                    {...register("usuProfession", { validate: (value) => value !== "0" })}
                                                >
                                                    <option value="0" disabled>Profissão</option>
                                                    <option value="perito">Perito</option>
                                                    <option value="professor">Professor</option>
                                                    <option value="estudante">Estudante</option>
                                                    <option value="usuario">Usuário</option>
                                                </select>
                                                {errors?.usuProfession?.type === 'validate' && <p className="text-danger fw-bold mt-1">Escolha inválida</p>}
                                            </Col>

                                            <Col className="mt-3">
                                                <IoMdArrowDropdown className="position-absolute translate-middle-y text-white select-pais"
                                                    style={{ marginTop: '20px', fontSize: '20px' }} />
                                                <Form.Select
                                                    className={(errors?.usuNacionality && "border-danger form-select bg-transparent p-2") || "form-select bg-transparent p-2"}
                                                    {...register("usuNacionality", { validate: (value) => value !== "0" })}
                                                    id='usuNacionality'
                                                >
                                                    <option value={userData.usuNacionality} >{userData.usuNacionality}</option>
                                                    {countries.map((item, index) => (
                                                        <option key={item.nome_pais} value={item.nome_pais}>{item.nome_pais}</option>
                                                    ))}
                                                </Form.Select>

                                                {errors?.usuNacionality?.type === 'validate' && <p className="text-danger fw-bold mt-1">Escolha inválida</p>}
                                            </Col>
                                            <Col className="pt-3 pb-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className=" botaoModal Anta"
                                                    onClick={() => handleSubmit(onSubmit)()}
                                                >
                                                    Atualizar
                                                </motion.button>
                                            </Col>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}