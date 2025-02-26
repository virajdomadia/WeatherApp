const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/location", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching location weather:", error.message);

    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }

    res.status(500).json({ message: "Error fetching location weather" });
  }
});

router.get("/:city", async (req, res) => {
  const city = req.params.city;
  try {
    // Make API request to OpenWeather
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    // Send back weather data
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);

    // Check if error is from OpenWeather API
    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({ message: "City not found" });
      }
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }

    // General error
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

module.exports = router;
