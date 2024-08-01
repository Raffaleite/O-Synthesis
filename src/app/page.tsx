"use client"
import imports from "./components/importsPadrao";
import Loading from "./components/loading";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LiaImageSolid } from "react-icons/lia";
import { MdOutlineEmail } from "react-icons/md";
import { GiSmartphone } from "react-icons/gi";
import { FaRegCopyright } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter'
import VideoPlayer from "./components/VideoPlayer";
import dynamic from 'next/dynamic'
import BackgroundVideo from "./components/BackgroundVideo";

function Index() {
    const { SlArrowDown, React, useEffect, useState, Container, Col, motion, Navs, Row, Card } = imports;

    const [showLoading, setShowLoading] = useState(false);

    const articles = [
        {
          title: "Cybermap Kaspersky",
          date: "cybermap.kaspersky.com",
          description: "Os ataques cibernéticos são realizados por indivíduos ou organizações com intenções políticas, criminosas ou pessoais de destruir ou obter acesso a informações confidenciais.",
          image: "/Media/kaspersky.png",
          url: "https://cybermap.kaspersky.com"
        },
        {
          title: "Cyber Glossary",
          date: "www.fortinet.com",
          description: "Um glossário em cibersegurança define termos essenciais como phishing, ransomware, ataques DDoS e criptografia, ajudando na compreensão de ameaças e defesas.",
          image: "/Media/Cybersecurity_Terms.png",
          url:"https://www.fortinet.com/resources/cyberglossary" 
        },
        {
          title: "Black List for Websites",
          date: "procon.sp.gov.br",
          description: "As autoridades colocam URLs em listas negras por motivos de segurança, que vão desde erros como o uso de plugins inseguros até ameaças graves como esquemas de phishing.",
          image: "/Media/blacklist.png", 
          url: "https://sistemas.procon.sp.gov.br/evitesite/list/evitesites.php"
        }
      ];


    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.min.js');

        setShowLoading(true);
        setTimeout(() => {
            setShowLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            <Navs />
            <BackgroundVideo src="Media/background2.mp4" type="initial"></BackgroundVideo>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Container fluid className='d-flex flex-column '>
                    <Row className="flex-grow-1 Anta">
                        <Col className='d-flex flex-column justify-content-center'>
                            <Container className="Anta " style={{ marginTop: '180px' }}>
                                <Col className="text-center mt-5">
                                    <h1 id="titulo" className="text-white spacingLetter titleIndex fw-bold mt-5">
                                        <Typewriter
                                            words={['O-Synthesis', 'Descubra a Verdade', 'Obtenha Inteligência']}
                                            loop = {100}
                                            cursor
                                            cursorStyle='|'
                                            typeSpeed={70}
                                            deleteSpeed={90}
                                            delaySpeed={1000}
                                        /></h1>
                                </Col>
                                <Col className="d-flex justify-content-center mt-4">
                                    <Link href={{ pathname: '/auth/login' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="botao p-2"
                                            style={{ backdropFilter: 'blur(25px)', fontSize: '17px' }}
                                        >
                                            Comece Agora
                                        </motion.button>
                                    </Link>
                                </Col>
                            </Container>
                            <Container className='Anta' style={{ marginTop: '80px' }}>
                                <Col className="d-flex justify-content-center " id="fraseEntrada">
                                    <Link href="#article" className="nav-link fw-bold spacingLetter text-center seta mb-4" style={{ marginTop: '0px' }}>
                                        <SlArrowDown className="bounce mt-2" style={{ fontSize: '40px' }} />
                                    </Link>
                                </Col>
                                <Row className="mt-5">
                                    <Col sm="12" lg="6" className="m-3 text-dark" style={{ textAlign: 'justify' }}>
                                        <h3 className="">Sobre O-Synthesis</h3>
                                        <p className="">
                                        O-Synthesis é um site centralizado de ferramentas de Open Source Intelligence (OSINT), servindo como um recurso essencial para profissionais de segurança cibernética, investigadores forenses, e estudantes. O site oferece uma biblioteca de ferramentas organizadas por categorias, como análise de e-mails, imagens e arquivos, com descrições detalhadas e tutoriais práticos. O-Synthesis economiza tempo e esforço ao fornecer uma plataforma unificada e bem-organizada para todas as necessidades de OSINT, melhorando a eficácia das investigações.
                                        </p>
                                    </Col>
                                    <Col className="text-center">
                                        <Image
                                            src="/Media/logoTeste2.svg"
                                            width={350}
                                            height={350}
                                            alt=""
                                            className=""
                                            />
                                    </Col>
                                </Row>
                            </Container>
                            
                            <Container id="article" className="mt-5 p-5 backgroundCardsHome" style={{ color: 'white', borderRadius: '30px' }}>
                                <Row className="align-items-center">
                                    <Col sm={12} lg={6} className="text-center mb-5">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <VideoPlayer src="/Media/Email.mp4" type="paginaInicial"/>
                                        </div>
                                    </Col>
                                    <Col sm={12} lg={6} className="text-lg-start mb-5">
                                        <h3 className="mb-3 Anta">Verificador de email</h3>
                                        <p>
                                        Ao inserir o endereço de email, a ferramenta varre bancos de dados de vazamentos conhecidos e retorna informações detalhadas sobre o incidente, incluindo a data do vazamento e os tipos de dados expostos. Isso permite que os usuários tomem medidas imediatas para prot eger suas informações pessoais.
                                        </p>
                                        <Link href={{ pathname: '/auth/login' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="botao"
                                                style={{ backdropFilter: 'blur(25px)', fontSize: '18px' }}
                                            >
                                                Acessar
                                            </motion.button>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col sm={12} lg={6} className="text-center mb-5">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <VideoPlayer src="/Media/Metadados.mp4" type="paginaInicial"/>
                                        </div>
                                    </Col>
                                    <Col sm={12} lg={6} className="text-lg-start mb-5">
                                        <h3 className="mb-3 Anta">Extrator de Metadados</h3>
                                        <p>
                                        A extração dos metadados de arquivos, revela informações ocultas como autor, data de criação e histórico de edições. Compatível com diversos formatos, ela fornece um relatório detalhado dos metadados encontrados. Ideal para segurança, conformidade e análise forense, ajuda a entender a origem e as modificações de cada arquivo.
                                        </p>
                                        <Link href={{ pathname: '/auth/login' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="botao"
                                                style={{ backdropFilter: 'blur(25px)', fontSize: '18px' }}
                                            >
                                                Acessar
                                            </motion.button>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col sm={12} lg={6} className="text-center mb-5">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <VideoPlayer src="/Media/Senha.mp4" type="paginaInicial"/>
                                        </div>
                                    </Col>
                                    <Col sm={12} lg={6} className="text-lg-start mb-5">
                                        <h3 className="mb-3 Anta">Gerador de Senha</h3>
                                        <p>
                                        Crie senhas fortes e únicas para aumentar a segurança online. Utilizando combinações aleatórias de caracteres, incluindo letras, números e símbolos. Personalizável, permite definir o comprimento e a complexidade desejada para cada senha. Ideal para proteger contas e dados pessoais contra acessos não autorizados.                                        </p>
                                        <Link href={{ pathname: '/auth/login' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="botao"
                                                style={{ backdropFilter: 'blur(25px)', fontSize: '18px' }}
                                            >
                                                Acessar
                                            </motion.button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>

                            <Container className="mt-5">
                                <Row>
                                    {articles.map((article, index) => (
                                    <Col key={index} md={4}>
                                        <Card className="mb-4 item">
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                            <Card.Img variant="top" src={article.image} />
                                        </a>
                                        <Card.Body>
                                            <Card.Title>{article.title}</Card.Title>
                                            <Card.Text>
                                            <small className="text-muted">{article.date}</small>
                                            </Card.Text>
                                            <Card.Text>{article.description}</Card.Text>
                                        </Card.Body>
                                        </Card>
                                    </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Col className="mt-5">
                    <Card className='d-flex justify-content-center align-items-center text-light Anta pb-4 backgroundCardsHome' style={{ width: '100%', borderRadius: '0px' }}>
                        <Image
                            src={"/Media/logoTeste2.svg"}
                            width={100}
                            height={100}
                            alt=""
                            className="rounded p-1 mt-4"
                        />{''}
                        <h6 className="mt-3"><FaRegCopyright className="mb-1" /> COPYRIGHT 2024 | O-SYNTHESIS.</h6>
                        <Link href={'#'} className="p-1 mt-2 text-decoration-none text-white"><MdOutlineEmail style={{ fontSize: '26px' }} /> osynthesis@outlook.com</Link>
                        <Link href={'#'} className="p-1 mt-2 text-decoration-none text-white"><GiSmartphone className="mb-1" style={{ fontSize: '26px' }} /> (00)00000.0000</Link>
                    </Card>
                </Col>
            </motion.div>
            {/*showLoading === true && <Loading />*/}
        </>
    );
}

export default Index;
