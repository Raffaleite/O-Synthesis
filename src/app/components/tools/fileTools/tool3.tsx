import imports from '../../importsPadrao';
import { MdOutlineEmail } from "react-icons/md";
import validator from 'validator';
import Loading from "../../loading";
import axios from 'axios';
import { any } from 'prop-types';
import { SubmitHandler } from 'react-hook-form';
import Table from 'react-bootstrap/Table';


import Image from 'next/image'

type DatasInput = {
    file: FileList;
}

interface MatrizItem {
    id: number;
    valores: number[];
}

export default function Tool2() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DatasInput>();
    const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const [showLoading, setShowLoading] = useState(false);
    const [showMessage, setShowMessage] = useState('')
    const [selectedFileName, setSelectedFileName] = useState('');
    const [controle, setControle] = useState(false)
    const [imagemFile, setImagemFile] = useState<string>('');
    const [matrizesL, setMatrizesL] = useState<any>([])
    const [matrizesC, setMatrizesC] = useState<any>([])
    const [imagemBase64, setImagemBase64] = useState<string>('');

    const onSubmit: SubmitHandler<DatasInput> = async (datas) => {
        try {
            setShowLoading(true);

            const formData = new FormData();
            formData.append("file", datas.file[0]);


            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_FLASKAPI_URL}/api/filetool3`,
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
                    toolName: 'Processamento e Análise de Imagens',
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                    },
                }
            );

            const matrizObj = response.data[0]
            let luminance: any[] = []
            let chrominance: any[] = []

            if (typeof matrizObj !== 'string') {
                const chave = Object.keys(matrizObj)

                chave.forEach((chave) => {
                    if (chave === '0') luminance = matrizObj[chave]
                    if (chave === '1') chrominance = matrizObj[chave]
                })

                setMatrizesL(luminance)
                setMatrizesC(chrominance)
            } else {
                setMatrizesL([])
                setMatrizesC([])
            }

            const imagemBase64 = response.data[1];
            setImagemBase64(imagemBase64);


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
            }
        } else {
            setSelectedFileName('');
            setImagemFile('');
        }
    };

    return (
        <>
            <Container fluid className='textoInicio w-100'>
                <Row className='Anta'>
                    <Col>
                        <h1 className='Anta ms-3 p-1 m-2'>Processamento e Análise de Imagens</h1>
                        <p className='p-1 m-2'>Análise forense em imagens, ajudando a identificar manipulações e detectar alterações arquivos de imagens.</p>
                        <Row className='mt-2'>
                            <Col sm={12} lg={12} className="d-flex justify-content-center mt-4" >
                                <Card className="text-center text-white p-2 rounded card-back mb-4 w-100">
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '23px' }}>Escolha seu Arquivo</Card.Title>

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
                                                    }} accept=".jpg,.jpeg,.png" />
                                            </Form.Group>

                                            {selectedFileName && (
                                                <div>
                                                    <Form.Text className="text-white">
                                                        Arquivo selecionado: {selectedFileName}
                                                    </Form.Text>
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
                                                Analisar
                                            </motion.button>
                                        </Col>
                                        <Col className='mt-4'>
                                            <hr />
                                            {controle &&
                                                <div className='p-3'>

                                                    <Card.Title className='mb-3' style={{ fontSize: '27px' }}>Imagem</Card.Title>

                                                    <Row>
                                                        <Col sm={12} md={6} className='mt-4'>
                                                            <Image
                                                                src={imagemFile}
                                                                width={0}
                                                                height={0}
                                                                alt="Antes"
                                                                style={{ width: '100%', height: '300px' }}
                                                            />
                                                        </Col>
                                                        <Col sm={12} md={6} className='mt-4'>
                                                            <Image
                                                                src={`data:image/png;base64,${imagemBase64}`}
                                                                width={0}
                                                                height={0}
                                                                alt="Depois"
                                                                style={{ width: '100%', height: '300px' }}
                                                            />
                                                        </Col>
                                                    </Row>

                                                    {(matrizesC.length !== 0 && matrizesL.length !== 0) &&

                                                        <div>
                                                            <Card.Title className='mb-3 mt-5' style={{ fontSize: '27px' }}>Tabelas de quantização</Card.Title>


                                                            <Row className='mt-5'>
                                                                <Col sm={12} md={6} >
                                                                    <h6>JPEG Q0: Luminance</h6>
                                                                    <Table responsive bordered hover variant='dark' style={{ fontSize: '15px', borderRadius: '30px' }}>
                                                                        <tbody>
                                                                            {Array.from({ length: Math.ceil(matrizesL.length / 8) }, (_, rowIndex) => (
                                                                                <tr key={rowIndex}>
                                                                                    {Array.from({ length: 8 }, (_, colIndex) => {
                                                                                        const dataIndex = rowIndex * 8 + colIndex;
                                                                                        if (dataIndex < matrizesL.length) {
                                                                                            return <td className='customTable' key={dataIndex}>{matrizesL[dataIndex]}</td>;
                                                                                        } else {
                                                                                            return <td className='customTable' key={dataIndex}></td>;
                                                                                        }
                                                                                    })}
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </Table>

                                                                </Col>

                                                                <Col sm={12} md={6} >
                                                                    <h6>JPEG Q1: Chrominance</h6>
                                                                    <Table responsive bordered hover variant='dark' style={{ fontSize: '15px', borderRadius: '30px' }}>
                                                                        <tbody>
                                                                            {Array.from({ length: Math.ceil(matrizesC.length / 8) }, (_, rowIndex) => (
                                                                                <tr key={rowIndex}>
                                                                                    {Array.from({ length: 8 }, (_, colIndex) => {
                                                                                        const dataIndex = rowIndex * 8 + colIndex;
                                                                                        if (dataIndex < matrizesC.length) {
                                                                                            return <td className='customTable' key={dataIndex}>{matrizesC[dataIndex]}</td>;
                                                                                        } else {
                                                                                            return <td className='customTable' key={dataIndex}></td>;
                                                                                        }
                                                                                    })}
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </Table>

                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    }
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