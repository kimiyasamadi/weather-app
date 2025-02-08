import axios from "axios";
import { WeatherData } from "@/types/weather";
import * as https from "node:https";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";


export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
        const response = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
            params: {
                lat: lat,
                lon: lon,
                appid: API_KEY,
                units: "metric",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch weather data.");
    }
};

