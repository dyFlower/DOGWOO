export type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
};
