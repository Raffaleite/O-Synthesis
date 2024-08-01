"use client"
import {  useEffect, useState } from 'react';
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, CategoryScale, BarController, BarElement, LineController, LineElement, PolarAreaController } from 'chart.js';
import imports from '../../components/importsPadrao';
import Pagination from 'react-bootstrap/Pagination';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, PointElement, CategoryScale, BarController, BarElement, LineController, LineElement, ChartDataLabels);

interface Dados {
    domain: string;
    qtd: number;
}

export default function Providers() {
    const { React, Container, Row, Col, axios } = imports;
    const [dominiosTratados, setDominiosTratados] = useState<Dados[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    const [backgroundColor, setBackgroundColor] = useState<string[]>([]);
    const [borderColor, setBorderColor] = useState<string[]>([]);
    const [pages, setPages] = useState(0)
    const [active, setActive] = useState(1)
    const [maxValue, setMaxValue] = useState(0)

    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    };

    useEffect(() => {
        const getProviders = async (page: number) => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_URL}/api/services/getAllProviders?page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                        },
                    }
                );
                const data = response.data.domains;
                //if(maxValue < data[0].qtd)
                setMaxValue(data[0].qtd)
                setPages(parseInt(response.data.pages+1))
                setDominiosTratados(data);

                const labels = data.map((item: Dados) => item.domain);
                const qtdData = data.map((item: Dados) => item.qtd);
                setLabels(labels);
                setData(qtdData);

                const bgColor = data.map(() => generateRandomColor());
                const bColor = bgColor.map((color: string) => color.replace('0.8', '1'));
                setBackgroundColor(bgColor);
                setBorderColor(bColor);
            } catch (error) {
                console.error('Erro ao buscar os provedores:', error);
            }
        };

        getProviders(active);
    }, [axios, active, maxValue]);

    let items = [];
    for (let number = 1; number <= pages; number++) {
    items.push(

    <Pagination.Item key={number} active={number === active} linkClassName={`border border-secondary rounded me-1 ${number === active ? 'bg-white text-black font-weight-bold' : 'text-white bg-transparent'}`} onClick={() => setActive(number)}>
      {number}
    </Pagination.Item>,
    );
    }

    return (
        <>
        <div className='backgroundProviders'>
        <Container fluid className='backgroundProviders'>
        <Row>
                <Col sm={12}>
                    <div className="d-lg-flex justify-content-center mt-2" style={{ width: '100%', overflowX: 'auto'}}>
                        <Pagination>{items}</Pagination>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12}>
                    <h2 className="text-center mt-1 text-white">Vazamentos</h2>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                        <div style={{ height:'85vh' }}> 
                            <Bar
                                data={{
                                    labels: labels,
                                    datasets: [{
                                        data: data,
                                        backgroundColor: backgroundColor,
                                        borderColor: borderColor,
                                        borderWidth: 2,
                                    }]
                                }}
                                options={{
                                    indexAxis: 'y',
                                    responsive: true,
                                    scales: {
                                        x: {
                                            min: 0,
                                            max: maxValue + 10,
                                            ticks: {
                                                color: 'white'
                                            }
                                        },
                                        y: {
                                            ticks: {
                                                color: 'white'
                                            }
                                        },
                                        
                                    },
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                            labels: {
                                                color: 'white'
                                            }
                                        },
                                        title: {
                                            display: true,
                                            text: 'Sites com mais vazamentos',
                                        },
                                        datalabels: {
                                            anchor: 'end',
                                            align: 'end',
                                            color: 'white',
                                        }
                                    },
                                }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
        </>
    );
}
