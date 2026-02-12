/* Heritage Grain Design: Live weather widget for home ground */
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch weather data for Connecticut (using a public API)
    const fetchWeather = async () => {
      try {
        // Using Open-Meteo free API (no API key required)
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=41.5&longitude=-72.1&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=America/New_York"
        );
        const data = await response.json();

        if (data.current) {
          const current = data.current;
          const weatherCode = current.weather_code;

          // Map WMO weather codes to conditions
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
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            icon,
          });
        }
        setLoading(false);
      } catch (err) {
        setError("Unable to load weather");
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="p-6 bg-card border-border">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-secondary rounded w-3/4" />
          <div className="h-8 bg-secondary rounded w-1/2" />
        </div>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="p-6 bg-card border-border">
        <p className="text-muted-foreground text-sm">{error || "Weather unavailable"}</p>
      </Card>
    );
  }

  const getWeatherIcon = () => {
    switch (weather.icon) {
      case "sun":
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case "cloud":
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent">
      <h3 className="font-heading font-semibold text-foreground mb-4">
        Weather at Home Ground
      </h3>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-display font-bold text-4xl text-foreground">
            {weather.temp}°F
          </div>
          <p className="text-muted-foreground font-heading">{weather.condition}</p>
        </div>
        <div>{getWeatherIcon()}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Droplets className="w-5 h-5 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="font-heading font-semibold text-foreground">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Wind className="w-5 h-5 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="font-heading font-semibold text-foreground">{weather.windSpeed} mph</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Connecticut • Updated regularly
      </p>
    </Card>
  );
}
