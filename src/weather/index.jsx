import React, { useEffect, useState } from 'react';
import { Button, Layout } from 'antd';
import axios from '../helper/axios';
import "antd/dist/antd.css";
import './weather.css';

const { Content, Header } = Layout;

const App = () => {
    const [locationUser,setLocationUser] = useState(null);
    const [dataLocation, setDataLocation] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [wind_deg, setWindDeg] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        defineLocationUser();
    },[]);

    useEffect(() => {
        updateWeather();
    },[locationUser])


    const updateWeather = async () => {
        const data = await weatherData();
        const { humidity, pressure, wind_deg } = data.current;
        setHumidity(humidity);
        setPressure(pressure);
        setWindDeg(wind_deg);
    }
    
    const weatherData = async () => {
        if(locationUser == null){
            return;
        }
        setLoading(true);
        const lat = locationUser.lat;
        const lng = locationUser.lng;
        console.log('URL',`${process.env.REACT_APP_URL_API_GEOLOCATION}&lat=${lat}&lon=${lng}`)
        const result = await axios.get(`${process.env.REACT_APP_DOMAIN}&lat=${lat}&lon=${lng}`);
        if(result.data != null){
            setDataLocation(result.data);
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
        return result.data;
    }

    const defineLocationUser = () => {
        const location = window.navigator && window.navigator.geolocation
        if (location) {
            location.getCurrentPosition((position) => {
                console.log(position.coords)
                setLocationUser({lat: position.coords.latitude, lng: position.coords.longitude});
            }, (error) => {
                setLocationUser({lat: null, lng: null});
            })
        }
    }

    const renderInfoWeather = () => {
        if(locationUser == null){
            return <div></div>
        }

        return <Layout className="site-layout">
            <Content
            className="site-layout-background layout-content"
            >
            <div>Latitude {locationUser.lat} - Longitude {locationUser.lng}</div>
            <div>Humidade: {humidity}</div>
            <div>Press??o: {pressure}</div>
            <div>Grau do vento: {wind_deg}</div>
        </Content>
      </Layout>
    }

    return <div>

        <Header>
            <span className='text-white'>Informa????es de Localiza????o</span>
            <Button type="primary" disabled={loading} loading={loading} danger onClick={() => updateWeather()}>
                Atualizar
            </Button>
        </Header>

        {renderInfoWeather()}
    </div>
}

export default App