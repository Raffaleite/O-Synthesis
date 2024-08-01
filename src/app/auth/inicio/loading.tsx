import Col from "react-bootstrap/esm/Col";
import Spinner from 'react-bootstrap/Spinner';
import Image from 'next/image'


function loading() {
    return (
        <div className="load NicoMoji backgroundLoading">
            <Col className='text-center'>
                <Image
                    src="/Media/logoTeste2.svg"
                    width={170}
                    height={170}
                    alt=""
                    style={{ marginTop: '130px' }}
                />{''}
                <h1 className='p-4' style={{ fontSize: '50px' }}>O-Synthesis</h1>
                <h2 className="mb-5">Seja Bem Vindo</h2>
                <Spinner style={{ fontSize: '10px' }} animation="border" />
            </Col>
        </div>
    )
}

export default loading;