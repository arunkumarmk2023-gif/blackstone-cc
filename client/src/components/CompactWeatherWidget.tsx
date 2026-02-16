/* Compact weather widget for top navigation */
import { Cloud, CloudRain, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}

export default function CompactWeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=41.5&longitude=-72.1&current=temperature_2m,weather_code&timezone=America/New_York"
        );
        const data = await response.json();

        if (data.current) {
          const current = data.current;
          const weatherCode = current.weather_code;

          let condition = "Clear";
          let icon = "sun";

          if (weatherCode === 0 || weatherCode === 1) {
            condition = "Clear";
            icon = "sun";
          } else if (weatherCode === 2 || weatherCode === 3) {
            condition = "Cloudy";
            icon = "cloud";
          } else if (weatherCode >= 45 && weatherCode <= 48) {
            condition = "Foggy";
            icon = "cloud";
          } else if (weatherCode >= 51 && weatherCode <= 67) {
            condition = "Rainy";
            icon = "rain";
          } else if (weatherCode >= 71 && weatherCode <= 85) {
            condition = "Snowy";
            icon = "cloud";
          }

          setWeather({
            temp: Math.round(current.temperature_2m),
            condition,
            icon,
          });
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return null;
    switch (weather.icon) {
      case "sun":
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case "cloud":
        return <Cloud className="w-4 h-4 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-4 h-4 text-blue-400" />;
      default:
        return <Sun className="w-4 h-4 text-yellow-500" />;
    }
  };

  if (loading || !weather) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/50 border border-border text-sm">
      <div className="flex items-center gap-1">
        {getWeatherIcon()}
        <span className="font-semibold text-foreground">{weather.temp}°F</span>
      </div>
      <span className="text-muted-foreground">•</span>
      <span className="text-muted-foreground">Connecticut</span>
    </div>
  );
}
