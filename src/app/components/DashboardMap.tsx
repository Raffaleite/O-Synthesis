// components/DashboardMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { countryCoordinates } from './mapCoordenadas';
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import imports from './importsPadrao';
import { createCustomIcon } from './mapIcon'

type ToolUsageData = {
    country: string;
    usageCount: number;
};

type ApiResponse = {
    allPasswords: ToolUsageData[];
};

const DashboardMap: React.FC = () => {
    const { React, useEffect, motion, axios, useState } = imports;
    const [toolUsageData, setToolUsageData] = useState<ToolUsageData[]>([
    ]);

    const [darkMode, setDarkMode] = useState(true)

    const mode = () => {
        setDarkMode(!darkMode)
    }


    useEffect(() => {
        const getCountry = async () => {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_URL}/api/services/getCountry`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
              }
            )
            setToolUsageData(response.data)
            //console.log(response.data)
        }
        getCountry()
    }, []);

    const getCountryCoordinates = (country: string): [number, number] => {
        return countryCoordinates[country] || [0, 0];
    };

    const bounds: L.LatLngBoundsExpression = [
        [-90, -190],
        [90, 190],
      ];

    return (
        <>
            <div className='d-flex flex-row-reverse'>
            {darkMode && <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="botaoIconMap m-2 position-absolute"
                onClick={() => mode()}
                style={{zIndex: '999'}}
            >
                <FaMoon style={{ fontSize: "21px" }} />
                
            </motion.button>}
            {darkMode === false && <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="botaoIconMapDark m-2 position-absolute"
                onClick={() => mode()}
                style={{zIndex: '999'}}
            >
                <FaSun style={{ fontSize: "21px" }} />
                
            </motion.button>}
            </div>

            <div className='d-flex flex-row justify-content-center'>
                {darkMode === false && <h3 className='m-2 position-absolute text-dark mapTitle'>Mapa de Vazamentos</h3>}
                {darkMode && <h3 className='m-2 position-absolute text-white mapTitle'>Mapa de Vazamentos</h3>}
            </div>
            <MapContainer 
            center={[20, 0]} 
            zoom={2} 
            style={{ height: '500px', width: '100%', borderRadius: '30px'}}
            className='backgroundCardsInicio'
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
            >

                {darkMode && <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                />}

                {darkMode === false && <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                />}

                {toolUsageData.map((item, index) => {
                    const coords = getCountryCoordinates(item.country);
                    return (
                        <Marker key={index} position={coords} icon={createCustomIcon(darkMode)}>
                            <Popup>
                                {item.country}: {item.usageCount} Vazamento(s)
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </>
    );
};

export default DashboardMap;

