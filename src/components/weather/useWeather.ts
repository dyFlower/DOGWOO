import { useQuery } from 'react-query';
import axios from 'axios';
import { queryKeys } from '../../react-query/constants';
import { WeatherData } from './types';


const getWeatherByLocation = async (lat: number, lon: number) => {
  const apiKey = process.env.REACT_APP_WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);
  const data: WeatherData = response.data;
  return data;
};

const useWeather = () => {
  const getCurrentLocation = () => {
    return new Promise<{ lat: number; lon: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    });
  };

  return useQuery<WeatherData>(queryKeys.weather, async () => {
    const { lat, lon } = await getCurrentLocation();
    return getWeatherByLocation(lat, lon);
  });
};

export default useWeather;
