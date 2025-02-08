import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const GEO_API_BASE_URL =" https://api.openweathermap.org/geo/1.0";

interface CityGeoData {
    name: string;
    lat: number;
    lon: number;
    country: string;
}


export const getCitySuggestions = async (query: string): Promise<CityGeoData[]> => {
    try {
        const response = await axios.get(`${GEO_API_BASE_URL}/direct`, {
            params: {
                q: query,
                limit: 5,
                appid: API_KEY,
            },
        });

        return response.data.map((city: any) => ({
            name: city.name,
            lat: city.lat,
            lon: city.lon,
            country: city.country,
        }));
    } catch (error) {
        console.error("Error fetching city suggestions:", error);
        return [];
    }
};


export const getCityCoordinates = async (city: string): Promise<CityGeoData | null> => {
    try {
        const response = await axios.get(`${GEO_API_BASE_URL}/direct`, {
            params: {
                q: city,
                limit: 1,
                appid: API_KEY,
            },
        });

        if (response.data.length > 0) {
            return {
                name: response.data[0].name,
                lat: response.data[0].lat,
                lon: response.data[0].lon,
                country: response.data[0].country,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching city coordinates:", error);
        throw new Error("Failed to fetch city coordinates.");
    }
};
