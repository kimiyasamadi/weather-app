import { useState, useEffect } from "react";
import { getCitySuggestions } from "@/services/geoService";

interface SearchBarProps {
    onSearch: (city: string) => void;
}

interface CitySuggestion {
    name: string;
    lat: number;
    lon: number;
    country: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (city.length > 2) {
            getCitySuggestions(city).then((results) => {
                setSuggestions(results.slice(0, 3)); // Show top 3 suggestions
                setShowDropdown(results.length > 0);
            });
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    }, [city]);

    const handleSelectCity = (selectedCity: CitySuggestion) => {
        setCity(selectedCity.name);
        setSuggestions([]); // ✅ Clear suggestions
        setShowDropdown(false); // ✅ Hide dropdown
        onSearch(selectedCity.name);
    };

    const handleSearch = () => {
        if (city.trim() !== "") {
            setSuggestions([]); // ✅ Clear suggestions
            setShowDropdown(false); // ✅ Hide dropdown
            onSearch(city);
        }
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={() => setShowDropdown(suggestions.length > 0)} // Show dropdown when focused
            />
            {showDropdown && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectCity(suggestion)}
                        >
                            {suggestion.name}, {suggestion.country}
                        </li>
                    ))}
                </ul>
            )}
            <button
                className="mt-2 w-full bg-blue-600 text-white p-2 rounded"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
