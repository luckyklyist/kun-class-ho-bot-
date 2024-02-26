const fetchWeather = async () => {
  try {
    const resp = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=27.7017&longitude=85.3206&current=temperature_2m&hourly=temperature_2m,rain&timezone=auto"
    );

    const data = await resp.json();

    const hourlyTemperatures = data.hourly.temperature_2m;

    // Calculate average temperature
    const avgTemperature =
      hourlyTemperatures.reduce((acc: number, temp: number) => acc + temp, 0) /
      hourlyTemperatures.length;

    const timezone = data.timezone;

    return {
      avgTemperature: avgTemperature.toFixed(2),
      timezone: timezone,
      currentTemperature: data.current.temperature_2m,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default fetchWeather;
