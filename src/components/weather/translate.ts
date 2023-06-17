export const translateWeather = (weather: string | undefined) => {
  switch (weather) {
    case 'Clear':
      return '맑음';
    case 'Clouds':
      return '흐림';
    case 'Rain':
      return '비';
    case 'Thunderstorm':
      return '천둥번개';
    case 'Snow':
      return '눈';
    case 'Mist' || 'Fog':
      return '안개';
    case 'Squall':
      return '돌풍';
    case 'Dust':
      return '먼지';
    case 'Drizzle':
      return '이슬비';
    default:
      return weather;
  }
};
