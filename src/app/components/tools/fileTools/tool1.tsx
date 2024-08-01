import imports from '../../importsPadrao';
import { MdOutlineEmail } from "react-icons/md";
import validator from 'validator';
import Loading from "../../loading";
import axios from 'axios';
import { any } from 'prop-types';
import { SubmitHandler } from 'react-hook-form';
import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypeExe } from "react-icons/bs";
import { BsFiletypeMp4 } from "react-icons/bs";
import { PiFileVideo } from "react-icons/pi";
import { BsFiletypeMp3 } from "react-icons/bs";

import Image from 'next/image'

type DatasInput = {
    file: FileList;
}

type Metadados = {
    [key: string]: string;
};

export default function Tool1() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DatasInput>();
    const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const [showLoading, setShowLoading] = useState(false);
    const [showMessage, setShowMessage] = useState('')
    const [selectedFileName, setSelectedFileName] = useState('');
    const [getMetadados, setMetadados] = useState<Metadados>({})
    const [controle, setControle] = useState(false)
    const [imagemFile, setImagemFile] = useState<string>('');
    const [hideIconFile, setHideIconFile] = useState<string>('');

    const onSubmit: SubmitHandler<DatasInput> = async (datas) => {
        try {
            setShowLoading(true);

            const formData = new FormData();
            formData.append("file", datas.file[0]);

            /*FormData: é uma interface nativa do Javascript que permite a criação de dados de formulários codificados como multipart/form-data
            Quando se envia arquivos binários para uma API, ele funciona diferente de arquivos texto, é necessário preparar esses dados, já que não pode ser colocado no corpo da requisição o arquivo em si (File), para isso ele é dividido em partes (multipart), onde cada parte contém uma parte do arquivo junto com metadados

            Boundary: FormData gera automaticamente um boundary, que é uma sequência de caracteres única usada para separar cada parte do arquivo dentro do corpo da requisição.

            Headers Content-Type: O cabeçalho Content-Type da requisição precisa ser definido como multipart/form-data, indicando que a requisição está enviando dados de formulário multipartes.

            Você atribuí uma chave no formData, nesse caso é o "file", que quando é recebido pela API você o acessa via essa chave.
            */
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_FLASKAPI_URL}/api/filetool1`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                    }
                }
            );

            await axios.post(
                `${process.env.NEXT_PUBLIC_URL}/api/services/createToolLogs`,
                {
                    toolName: 'Extrator de Metadados',
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                    },
                }
            );

            setMetadados(response.data);
            setControle(true)

        } catch (error) {
            console.error(error);
            setControle(false)
        } finally {
            setShowLoading(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const urlImage = URL.createObjectURL(file);
            setSelectedFileName(file.name);

            if (fileExtension && ['jpg', 'jpeg', 'png'].includes(fileExtension)) {
                setImagemFile(urlImage);
                setHideIconFile('')
            } else if (fileExtension) {
                setImagemFile('');
                setHideIconFile(fileExtension)
            }
        } else {
            setSelectedFileName('');
            setImagemFile('');
            setHideIconFile('');
        }
    };

    return (
        <>
            <Container fluid className='textoInicio w-100'>
                <Row className='Anta'>
                    <Col>
                        <h1 className='Anta ms-3 p-1 m-2'>Extrator de Metadados</h1>
                        <p className='p-1 m-2'>Extraia metadados de imagens, vídeos, pdf e muito mais!</p>
                        <Row className='mt-2'>
                            <Col sm={12} lg={12} className="d-flex justify-content-center mt-4" >
                                <Card className="text-center text-white p-2 rounded card-back mb-4 w-100">
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '23px' }}>Escolha seu Arquivo</Card.Title>
                                        <small style={{ color: 'gray', fontWeight: 'bold' }}>Tipos suportados: .pdf .mp3 .jpg .jpeg .png .exe .mp4 .avi</small>

                                        <Col className="mt-4">
                                            <Form.Group className="mb-3">
                                                <motion.label htmlFor="file-upload" whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }} className={((errors?.file?.type === 'required' && selectedFileName === '') && "custom-file-upload-error ps-3 pt-2 pb-2 mb-3") || "custom-file-upload ps-3 pt-2 pb-2 mb-3"}>
                                                    Selecione seu Arquivo
                                                </motion.label>
                                                <Form.Control id='file-upload' type="file" {...register("file", { required: true })} onChange={handleFileChange} className="position-absolute top-0 start-0 translate-middle "
                                                    style={{
                                                        opacity: 0,
                                                        width: '1px',
                                                        height: '1px',
                                                        overflow: 'hidden',
                                                        zIndex: -1
                                                    }} accept=".pdf,.mp3,.jpg,.jpeg,.png,.exe,.mp4,.avi" />
                                            </Form.Group>

                                            {selectedFileName && (
                                                <div>
                                                    <Form.Text className="text-white">
                                                        Arquivo selecionado: {selectedFileName}
                                                    </Form.Text>
                                                </div>
                                            )}

                                            {(selectedFileName && hideIconFile) && (
                                                <div className='mt-3'>
                                                    {hideIconFile === 'pdf' && (
                                                        <BsFiletypePdf style={{ fontSize: '40px' }} />
                                                    )}
                                                    {hideIconFile === 'exe' && (
                                                        <BsFiletypeExe style={{ fontSize: '40px' }} />
                                                    )}
                                                    {hideIconFile === 'mp4' && (
                                                        <BsFiletypeMp4 style={{ fontSize: '40px' }} />
                                                    )}
                                                    {hideIconFile === 'avi' && (
                                                        <PiFileVideo style={{ fontSize: '40px' }} />
                                                    )}
                                                    {hideIconFile === 'mp3' && (
                                                        <BsFiletypeMp3 style={{ fontSize: '40px' }} />
                                                    )}
                                                </div>
                                            )}

                                            {(selectedFileName && imagemFile !== '') && (
                                                <div>
                                                    <Image
                                                        src={imagemFile}
                                                        width={90}
                                                        height={90}
                                                        alt=""
                                                        className="rounded-circle mt-3 border border-white"
                                                    />
                                                </div>
                                            )}
                                        </Col>

                                        {(errors?.file?.type === 'required' && selectedFileName === '') && <span className="text-danger mb-4">Escolha um arquivo</span>}

                                        <hr className='mt-4' />
                                        <Col className="pt-1 pb-2 mt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="botao Anta"
                                                onClick={() => handleSubmit(onSubmit)()}
                                            >
                                                Verificar Metadados
                                            </motion.button>
                                        </Col>
                                        <Col className='mt-4'>
                                            <hr />
                                            {controle &&
                                                <div className='p-3'>
                                                    <Card.Title className='mb-5' style={{ fontSize: '23px' }}>Metadados encontrados</Card.Title>


                                                    {Object.keys(getMetadados).map((key: string) => (
                                                        <div key={key} className='text-end mt-3'>
                                                            <strong className='' style={{ fontSize: '19px' }}>{key}: </strong> <span style={{ color: 'lightgray' }}>{getMetadados[key]}</span>
                                                        </div>
                                                    ))}
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