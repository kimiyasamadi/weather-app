"use client";

import SearchBar from "@/app/components/SearchBar";
import WeatherCard from "@/app/components/WeatherCard";
import { getWeatherData } from "@/services/weatherService";
import { WeatherData } from "@/types/weather";
import { getCityCoordinates } from "@/services/geoService";
import {useState} from "react";

export default function Home() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (city: string) => {
        try {
            setError(null);

            // 1️⃣ Get latitude & longitude of the selected city
            const location = await getCityCoordinates(city);
            if (!location) {
                setError("City not found. Please try again.");
                return;
            }

            console.log(`Coordinates for ${city}:`, location.lat, location.lon);

            // 2️⃣ Fetch weather using latitude & longitude
            const weatherData = await getWeatherData(location.lat, location.lon);
            setWeather(weatherData);
        } catch (err) {
            setError("Failed to fetch data. Try another city.");
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-blue-400 p-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">Weather Dashboard</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {weather && <WeatherCard weather={weather} />}
        </main>
    );
}
