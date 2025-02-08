import { WeatherData } from "@/types/weather";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface WeatherCardProps {
    weather: WeatherData;
}
export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
    return (
        <Card className="bg-white shadow-lg rounded-lg p-4 mt-6">
            <CardContent>
                <Typography variant="h4">{weather.name}</Typography>
                <Typography variant="h6">{weather.weather[0].description}</Typography>
                <Typography variant="h2">{weather.main.temp}°C</Typography>
                <Typography>Humidity: {weather.main.humidity}%</Typography>
                <Typography>Wind: {weather.wind.speed} km/h</Typography>
            </CardContent>
        </Card>
    );
};
export default WeatherCard;
