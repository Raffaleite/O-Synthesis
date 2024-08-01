import imports from '../importsPadrao';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import { Doughnut, Line, Bar, Pie, PolarArea, Scatter, Radar, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, CategoryScale, BarController, BarElement, LineController, LineElement, RadialLinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';
import DashboardMap from '../DashboardMap';


ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, PointElement, CategoryScale, BarController, BarElement, ChartDataLabels, zoomPlugin, LineController, LineElement, RadialLinearScale);

const dadosFicticios = [
  { id: 1, nome: 'Item 1', descricao: 'Descrição 1', quantidade: 10, preco: 50.00 },
  { id: 2, nome: 'Item 2', descricao: 'Descrição 2', quantidade: 20, preco: 30.00 },
  { id: 3, nome: 'Item 3', descricao: 'Descrição 3', quantidade: 15, preco: 40.00 },
  { id: 4, nome: 'Item 4', descricao: 'Descrição 4', quantidade: 25, preco: 35.00 },
  { id: 5, nome: 'Item 5', descricao: 'Descrição 5', quantidade: 55, preco: 35.00 },
  { id: 6, nome: 'Item 6', descricao: 'Descrição 6', quantidade: 35, preco: 45.00 },
  { id: 7, nome: 'Item 7', descricao: 'Descrição 7', quantidade: 45, preco: 45.00 },
  { id: 8, nome: 'Item 8', descricao: 'Descrição 8', quantidade: 55, preco: 45.00 },
  { id: 9, nome: 'Item 9', descricao: 'Descrição 9', quantidade: 67, preco: 45.00 },
];

type Dados = {
  domain: string,
  qtd: number
}

type DadosTool = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
}

export default function DashBoard() {
  const { React, Container, Row, Col, Card, useEffect, useState, axios, motion, Link } = imports;
  const [dominiosTratados, setDominiosTratados] = useState<Dados[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string[]>([]);
  const [borderColor, setBorderColor] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(14);
  const [labelBorderColor, setLabelBorderColor] = useState('white');
  const [labelBorderRadius, setLabelBorderRadius] = useState(5);
  const [labelBorderWidth, setLabelBorderWidth] = useState(2);
  const [getChartData, setChartData] = useState<DadosTool[]>([])
  const [emptyStateTool, setEmptyStateTool] = useState(false)
  const [emptyStateEmail, setEmptyStateEmail] = useState(false)

  const monthLabels = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];


  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 762) {
        setFontSize(10);
        setLabelBorderColor('')
        setLabelBorderRadius(0)
        setLabelBorderWidth(0)
      } else {
        setFontSize(14);
        setLabelBorderColor('white')
        setLabelBorderRadius(5)
        setLabelBorderWidth(2)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getProviders = async () => {
      try {
        setEmptyStateTool(true)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/services/getProviders`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );
        const data = response.data
        setDominiosTratados(data)

        const labels = data.map((item: Dados) => item.domain);
        const qtdData = data.map((item: Dados) => item.qtd);
        setLabels(labels);
        setData(qtdData);

        const borderColor = [
          'rgba(255, 183, 77, 1)',
          'rgba(255, 204, 153, 1)',
          'rgba(255, 221, 238, 1)',
          'rgba(230, 230, 250, 1)',
          'rgba(173, 216, 230, 1)',
          'rgba(173, 234, 234, 1)'
        ]
        const backgroundColor = [
          'rgba(255, 120, 0, 0.8)',
          'rgba(255, 145, 50, 0.8)',
          'rgba(255, 105, 180, 0.8)',
          'rgba(180, 102, 255, 0.8)',
          'rgba(70, 130, 180, 0.8)',
          'rgba(0, 191, 255, 0.8)'
        ]
        setBackgroundColor(backgroundColor);
        setBorderColor(borderColor);

      } catch (e) {
        console.log(e)
      } finally {
        setEmptyStateTool(false)
      }

    }
    getProviders()
  }, [axios])

  useEffect(() => {
    const getToolLogs = async () => {
      try {
        setEmptyStateEmail(true)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/services/getToolLogs`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );
        const toolLogs = response.data;

        const toolNameCounts: { [key: string]: number[] } = {};

        toolLogs.forEach((log: { toolName: any; useDate: any; qtd: any }) => {
          const toolName = log.toolName;
          const useDate = log.useDate;

          const month = parseInt(useDate.split('-')[1]);

          if (!toolNameCounts[toolName]) {
            toolNameCounts[toolName] = Array(12).fill(0);
          }

          toolNameCounts[toolName][month - 1] = log.qtd;
        });

        const cores = [
          "rgb(124, 22,22)",
          "rgb(0, 128, 128)",
          "rgb(139, 0, 139)",
          "rgb(255, 69, 0)",
          "rgb(0, 100, 0)"
        ];

        let contador = -1;
        const chartData = Object.keys(toolNameCounts).map((toolName) => {
          contador = (contador + 1) % cores.length;
          return {
            label: toolName,
            data: toolNameCounts[toolName],
            borderColor: cores[contador],
            backgroundColor: cores[contador],
            borderWidth: 2,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10,
            cubicInterpolationMode: 'monotone',
            tension: 0.2,
          };
        });

        setChartData(chartData)

      } catch (e) {
        console.log(e)
      } finally {
        setEmptyStateEmail(false)
      }

    }
    getToolLogs()
  }, [axios])

  return (
    <><Container fluid className='textoInicio'>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <h1 className='mt-1 Anta ms-2'>Dashboard</h1>
            <Row className='mt-4'>
              <Col sm={12} md={12} lg={6} className='mt-4'>
                <Card className='d-flex align-items-center justify-center backgroundCardsInicio text-white p-2 overflow-auto canvasH'>
                  <h4 className='text-center mt-3'>Uso das Ferramentas</h4>
                  {emptyStateTool && <Spinner style={{ marginTop: '100px', marginBottom: '100px' }} animation="border"/>}
                  {emptyStateTool === false &&
                    <Line
                      data={{
                        labels: monthLabels,
                        datasets: getChartData
                      }}
                      options={{
                        responsive: true,
                        interaction: {
                          mode: 'index',
                          intersect: false,
                          axis: 'x'
                        },
                        plugins: {
                          title: {
                            display: true,
                            text: 'Teste'
                          },
                          legend: {
                            display: true,
                            labels: {
                              color: 'white',
                              padding: 12,
                            },
                            position: 'bottom'
                          },
                          datalabels: {
                            color: 'white',
                            font: {
                              size: fontSize,
                              weight: 'bold'
                            },
                            anchor: 'end',
                            align: 'end',
                          },
                          zoom: {
                            pan: {
                              enabled: true,
                              mode: 'x',
                            },
                            zoom: {
                              wheel: {
                                enabled: true,
                              },
                              pinch: {
                                enabled: true
                              },
                              mode: 'x',
                            }
                          },
                        },
                        layout: {
                          padding: {
                            top: 50,
                            right: 0,
                            bottom: 0,
                            left: 0,
                          },
                        },
                        maintainAspectRatio: true,
                        scales: {
                          y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            stacked: false,
                            ticks: {
                              color: 'white',
                              font: {
                                size: fontSize
                              }
                            }
                          },
                          y1: {
                            type: 'linear',
                            display: false,
                            position: 'right',
                            grid: {
                              drawOnChartArea: false,
                            },
                            ticks: {
                              color: 'white',
                              font: {
                                size: fontSize
                              }
                            }
                          },
                          x: {
                            ticks: {
                              color: 'white',
                              font: {
                                size: fontSize
                              }
                            }
                          },
                        }
                      }}
                      height={300}
                    />}
                </Card>
              </Col>

              <Col sm={12} md={12} lg={6} xl={6} xxl={6} className='mt-4'>
                <Card className='d-flex align-items-center backgroundCardsInicio text-white p-2 canvasH'>
                  <h4 className='text-center mt-3'>Sites com mais vazamentos</h4>
                  {emptyStateEmail && <Spinner style={{ marginTop: '100px', marginBottom: '100px' }} animation="border"/>}
                  {emptyStateEmail === false &&
                  <Bar style={{ marginTop: '20%' }}
                    data={{
                      labels: labels,
                      datasets: [{
                        label: '',
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 2,
                      }]
                    }}
                    options={{
                      indexAxis: 'x',
                      interaction: {
                        mode: 'index',
                        intersect: false,
                        axis: 'x'
                      },
                      scales: {
                        x: {
                          ticks: {
                            color: 'white',
                            font: {
                              size: fontSize
                            }
                          }
                        },
                        y: {
                          ticks: {
                            color: 'white',
                            font: {
                              size: fontSize
                            }
                          }
                        }
                      },
                      elements: {
                        bar: {
                          borderWidth: 2,
                        },
                      },
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        title: {
                          display: true,
                          text: 'Sites com mais vazamentos',
                        },
                        zoom: {
                          pan: {
                            enabled: true,
                            mode: 'x',
                          },
                          zoom: {
                            wheel: {
                              enabled: true,
                            },
                            pinch: {
                              enabled: true
                            },
                            mode: 'x',
                          }
                        },
                        datalabels: {
                          color: 'white',
                          borderColor: labelBorderColor,
                          borderRadius: labelBorderRadius,
                          borderWidth: labelBorderWidth,
                          font: {
                            size: fontSize,
                            weight: 'bold'
                          }
                        }
                      },
                    }}
                    height={200}
                  /> }

                  <Link href={{ pathname: './providers' }} target="_blank">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="botaoProviders mt-5"
                      style={{ backdropFilter: 'blur(25px)', fontSize: '16px' }}
                    > Ver tudo </motion.button>
                  </Link>
                </Card>
              </Col>
            </Row>

            <div className='mt-4'>
              <DashboardMap />
            </div>

            {/* <Col sm={12} md={12} lg={12} xl={12} xxl={12} className=''>
              <Card className='backgroundCardsInicio text-white p-2 overflow-auto canvasH mt-4'>
                <h4 className='text-center mt-2 mb-4'>Tabela</h4>
                <Table borderless hover variant='dark' style={{ fontSize: '15px', borderRadius: '30px' }}>
                  <thead>
                    <tr>
                      <th className='customHeaderTable'>ID</th>
                      <th className='customHeaderTable'>H1</th>
                      <th className='customHeaderTable'>H2</th>
                      <th className='customHeaderTable'>H3</th>
                      <th className='customHeaderTable'>H4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosFicticios.map(item => (
                      <tr key={item.id}>
                        <td className='customTable'>{item.id}</td>
                        <td className='customTable'>{item.nome}</td>
                        <td className='customTable'>{item.descricao}</td>
                        <td className='customTable'>{item.quantidade}</td>
                        <td className='customTable'>R$ {item.preco.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col> */}
        </Col>
      </Row>
    </Container><br /></>
  )
}

