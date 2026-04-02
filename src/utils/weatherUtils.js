import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Wind,
  Snowflake,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
} from 'lucide-react';

// Maps WMO weather codes (used by Open-Meteo) → { label, Icon }
export function getWeatherInfo(code) {
  if (code === undefined || code === null) return { label: 'Unknown', Icon: Cloud };

  if (code === 0)               return { label: 'Clear Sky',        Icon: Sun };
  if (code === 1)               return { label: 'Mostly Clear',     Icon: Sun };
  if (code === 2)               return { label: 'Partly Cloudy',    Icon: CloudSun };
  if (code === 3)               return { label: 'Overcast',         Icon: Cloud };
  if (code === 45 || code === 48) return { label: 'Foggy',          Icon: CloudFog };
  if (code === 51)              return { label: 'Light Drizzle',    Icon: CloudDrizzle };
  if (code === 53)              return { label: 'Drizzle',          Icon: CloudDrizzle };
  if (code === 55)              return { label: 'Heavy Drizzle',    Icon: CloudDrizzle };
  if (code === 56 || code === 57) return { label: 'Freezing Drizzle', Icon: CloudDrizzle };
  if (code === 61)              return { label: 'Light Rain',       Icon: CloudRain };
  if (code === 63)              return { label: 'Rain',             Icon: CloudRain };
  if (code === 65)              return { label: 'Heavy Rain',       Icon: CloudRain };
  if (code === 66 || code === 67) return { label: 'Freezing Rain', Icon: CloudRain };
  if (code === 71)              return { label: 'Light Snow',       Icon: CloudSnow };
  if (code === 73)              return { label: 'Snow',             Icon: CloudSnow };
  if (code === 75)              return { label: 'Heavy Snow',       Icon: CloudSnow };
  if (code === 77)              return { label: 'Snow Grains',      Icon: Snowflake };
  if (code === 80)              return { label: 'Light Showers',    Icon: CloudRain };
  if (code === 81)              return { label: 'Rain Showers',     Icon: CloudRain };
  if (code === 82)              return { label: 'Heavy Showers',    Icon: CloudRain };
  if (code === 85 || code === 86) return { label: 'Snow Showers',  Icon: CloudSnow };
  if (code === 95)              return { label: 'Thunderstorm',     Icon: CloudLightning };
  if (code === 96 || code === 99) return { label: 'Thunderstorm + Hail', Icon: CloudLightning };

  return { label: 'Unknown', Icon: Cloud };
}

// Semantic icons for each detail field in Details.jsx
export const detailIcons = {
  humidity:   Droplets,
  visibility: Eye,
  uvIndex:    Sun,
  windSpeed:  Wind,
  dewPoint:   Thermometer,
  pressure:   Gauge,
};
