import CloudyImg from '../assets/weather-icons/cloud.png';
import ClearImg from '../assets/weather-icons/clear.png';
import RainImg from '../assets/weather-icons/rain.png';
import MistImg from '../assets/weather-icons/mist.png';
import SnowImg from '../assets/weather-icons/snow.png';
import SmokeImg from '../assets/weather-icons/smoke.png';
import NotFoundImg from '../assets/weather-icons/404.png';
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { addLocation, getUserLocations, removeLocation } from '../api/user';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = (props) => {
    const [place, setPlace] = useState('');
    const [temp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [desc, setDesc] = useState('');
    const [weatherImg, setWeatherImg] = useState('');
    const [location, setLocation] = useState('');

    const [userLocations, setUserLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            if (props.isLoggedIn) {
                const result = await getUserLocations();
                if (result) {
                    setUserLocations(result.locations);
                }
            } else {
                setUserLocations([]);
            }
        };
        fetchLocations();
    }, [props.isLoggedIn]);

    async function fetchWeather(e, val) {
        e.preventDefault();

        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${val ? val : place}&appid=${WEATHER_API_KEY}&units=metric`);
        const data = weatherData.data;
        console.log(data);
        setTemp(data.main.temp);
        setDesc(data.weather[0].description);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setWeatherImg(data.weather[0].main);
        setLocation(data.name);
        setPlace('');

    }

    let weatherIcon;
    switch (weatherImg) {
        case 'Clear':
            weatherIcon = ClearImg;
            break;
        case 'Clouds':
            weatherIcon = CloudyImg;
            break;
        case 'Smoke':
            weatherIcon = SmokeImg;
            break;
        case 'Rain':
            weatherIcon = RainImg;
            break;
        case 'Mist':
            weatherIcon = MistImg;
            break;
        case 'Snow':
            weatherIcon = SnowImg;
            break;
        default:
            weatherIcon = NotFoundImg;
            break;
    }

    const saveHandler = async () => {
        if (userLocations.length === 6) {
            toast.error("Max 6 places can be saved");
            return;
        }
        const data = await addLocation(location);
        toast.success(data.message);
        setUserLocations(data.locations);
    };

    const removeHandler = async () => {
        const data = await removeLocation(location);
        toast.success(data.message);
        setUserLocations(data.locations);
    };

    const divStyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.2)',
    };
    return (
        <div className="bg-white px-5 max-w-96 py-10 md:p-7 rounded-lg text-white" style={divStyle}>
            <form className="flex gap-4 items-center relative" onSubmit={fetchWeather}>
                <span className='text-white text-xl absolute left-3 top-3'><FaLocationDot /></span>
                <input
                    className="h-10 pl-10 bg-transparent border border-gray-300 rounded focus:outline-none caret-white text-gray-100 text-lg placeholder-gray-200"
                    type="text"
                    placeholder="Enter Your Location"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <button className="border border-gray-300 p-3 rounded-full hover:bg-white hover:bg-opacity-20"><FaSearch /></button>
            </form>
            <div className='mt-5 mb-3 flex flex-col items-center w-72'>
                {userLocations.length > 0 && <div className='flex flex-wrap items-center border-b border-gray-500'>
                    <span className='text-gray-400'>Saved:</span>   {
                        userLocations.map((loc, i) => (
                            <span key={i} className='hover:bg-white hover:bg-opacity-20 px-2 py-1 cursor-pointer rounded-lg' onClick={(e) => fetchWeather(e, loc)}>{loc}</span>

                        ))
                    }
                </div>}
                <h1 className='text-2xl mt-3 text-center tracking-widest font-semibold'>{location}</h1>
            </div>
            <div className='flex flex-col items-center mt-5'>
                <img src={weatherIcon} className='h-28 md:h-40' alt="" />
                <div className="relative">
                    <h1 className="font-bold text-6xl md:text-8xl">{temp}</h1>
                    <h5 className="absolute top-0 font-bold text-xl -right-5 md:-right-3 flex items-center">
                        °C
                    </h5>
                </div>
                <h1 >{desc}</h1>
            </div>

            <div className='flex justify-between items-center mt-5 px-3 md:px-0'>
                <div className='flex gap-2 items-center'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className='fill-white h-8 md:h-10'
                    >
                        <path d="M5.996 9c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707C11.83 8.253 12.577 9 13.991 9c1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 8.253 20.585 9 22 9V7c-.563 0-.804-.217-1.295-.707C20.159 5.747 19.411 5 17.996 5s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 5.747 11.407 5 9.993 5s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 5.747 3.413 5 2 5v2c.561 0 .801.217 1.291.707C3.836 8.253 4.583 9 5.996 9zm0 5c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707c.545.546 1.292 1.293 2.706 1.293 1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 13.253 20.585 14 22 14v-2c-.563 0-.804-.217-1.295-.707-.546-.546-1.294-1.293-2.709-1.293s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 10.747 11.407 10 9.993 10s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 10.747 3.413 10 2 10v2c.561 0 .801.217 1.291.707C3.836 13.253 4.583 14 5.996 14zm0 5c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707c.545.546 1.292 1.293 2.706 1.293 1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 18.253 20.585 19 22 19v-2c-.563 0-.804-.217-1.295-.707-.546-.546-1.294-1.293-2.709-1.293s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 15.747 11.407 15 9.993 15s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 15.747 3.413 15 2 15v2c.561 0 .801.217 1.291.707C3.836 18.253 4.583 19 5.996 19z"></path>
                    </svg>
                    <div className='text-xs md:text-sm'>
                        <h2>{humidity}%</h2>
                        <h2>Humidity</h2>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className='fill-white h-8 md:h-10'

                    >
                        <path d="M13 5.5C13 3.57 11.43 2 9.5 2 7.466 2 6.25 3.525 6.25 5h2c0-.415.388-1 1.25-1 .827 0 1.5.673 1.5 1.5S10.327 7 9.5 7H2v2h7.5C11.43 9 13 7.43 13 5.5zm2.5 9.5H8v2h7.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5c-.862 0-1.25-.585-1.25-1h-2c0 1.475 1.216 3 3.25 3 1.93 0 3.5-1.57 3.5-3.5S17.43 15 15.5 15z"></path>
                        <path d="M18 5c-2.206 0-4 1.794-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2H2v2h16c2.206 0 4-1.794 4-4s-1.794-4-4-4zM2 15h4v2H2z"></path>
                    </svg>
                    <div className='text-xs md:text-sm'>
                        <h2>{wind}Km/h</h2>
                        <h2>Wind Speed</h2>
                    </div>
                </div>
            </div>
            {location && props.isLoggedIn && <div className='mt-6 flex justify-center'>
                {
                    !userLocations.includes(location) ?
                        <button className='flex items-center border rounded-full pl-3 pr-4 py-1 hover:bg-white hover:bg-opacity-20'
                            onClick={saveHandler}><IoAdd />SAVE</button>
                        :
                        <button className='flex items-center border rounded-full pl-3 pr-4 py-1 hover:bg-white hover:bg-opacity-20'
                            onClick={removeHandler}>REMOVE</button>
                }
            </div>}
        </div>
    );
};

export default Weather;
