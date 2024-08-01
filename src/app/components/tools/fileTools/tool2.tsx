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
    md5: boolean;
    sha256: boolean;
    sha512: boolean;
    sha1: boolean;
}

type Hash = {
    [key: string]: string;
};

export default function Tool2() {
    const { React, useEffect, Navs, motion, Container, Row, Col, useForm, axios, useState, Link, useRouter, Card, Form, Modal } = imports;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DatasInput>(
        { defaultValues: { md5: true, sha1: true, sha256: true, sha512: true } });
    const [credenciaisErradas, setCredenciaisErradas] = useState(0);
    const [showLoading, setShowLoading] = useState(false);
    const [showMessage, setShowMessage] = useState('')
    const [selectedFileName, setSelectedFileName] = useState('');
    const [getHash, setHash] = useState<Hash>({})
    const [controle, setControle] = useState(false)
    const [imagemFile, setImagemFile] = useState<string>('');
    const [hideIconFile, setHideIconFile] = useState<string>('');

    const onSubmit: SubmitHandler<DatasInput> = async (datas) => {
        try {
            setShowLoading(true);

            const formData = new FormData();
            formData.append("file", datas.file[0]);
            const listaAlgoritmos = []

            if (datas.md5)
                listaAlgoritmos.push('md5')
            if (datas.sha1)
                listaAlgoritmos.push('sha1')
            if (datas.sha256)
                listaAlgoritmos.push('sha256')
            if (datas.sha512)
                listaAlgoritmos.push('sha512')

            formData.append("algoritmos", JSON.stringify(listaAlgoritmos));

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_FLASKAPI_URL}/api/filetool2`,
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
                    toolName: 'Calculadora de Hash',
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                    },
                }
            );

            setHash(response.data);
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
                        <h1 className='Anta ms-3 p-1 m-2'>Calculadora de Hash</h1>
                        <p className='p-1 m-2'>Calcule a hash de seus arquivos para comprovar a veracidade deles!!</p>
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
                                        <Row>
                                            <Col sm={6} className="pt-1 pb-2 mt-4 d-flex justify-content-end">
                                                <Form.Check
                                                    type='checkbox'
                                                    id={`default-checkbox`}
                                                    label={`MD5`}
                                                    {...register('md5')}
                                                />
                                                <Form.Check
                                                    type='checkbox'
                                                    id={`default-checkbox`}
                                                    label={`SHA-256`}
                                                    {...register('sha256')}
                                                />
                                            </Col>
                                            <Col sm={6} className="pt-1 pb-2 mt-4 d-flex justify-content-start">
                                                <Form.Check
                                                    type='checkbox'
                                                    id={`default-checkbox`}
                                                    label={`SHA-512`}
                                                    {...register('sha512')}
                                                />
                                                <Form.Check
                                                    type='checkbox'
                                                    id={`default-checkbox`}
                                                    label={`SHA-1`}
                                                    {...register('sha1')}
                                                />
                                            </Col>
                                        </Row>
                                        <Col className="pt-1 pb-2 mt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="botao Anta"
                                                onClick={() => handleSubmit(onSubmit)()}
                                            >
                                                Calcular Hash
                                            </motion.button>
                                        </Col>
                                        <Col className='mt-4'>
                                            <hr />
                                            {controle &&
                                                <div className='p-3'>
                                                    <Card.Title className='mb-3' style={{ fontSize: '27px' }}>Hashes</Card.Title>


                                                    {Object.keys(getHash).map((key: string) => (
                                                        <div key={key} className='text-center mt-1'>
                                                            <p className='text-uppercase mt-4' style={{ fontSize: '19px', fontWeight: '1000' }}>{key}: </p> <span className='text-uppercase' style={{ color: 'lightgray', fontSize: '13px' }}>{getHash[key]}</span>
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