const fs = require('fs');
const axios = require('axios');

class Searches {
  history = [];
  dbPath = './db/database.json';

  constructor() {
    this.readDB();
  }

  get historyCapitalize() {
    return this.history.map((place) => {
      let words = place.split(' ');
      words = words.map((word) => word[0].toUpperCase() + word.substring(1));
      return words.join(' ');
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      proximity: 'ip',
      limit: 5,
      language: 'es',
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  async city(place = '') {
    try {
      // HTTP Request
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const { data } = await instance.get();
      return data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async weatherPlace(lat, lng) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { lat, lon: lng, ...this.paramsOpenWeather },
      });

      const { data } = await instance.get();
      const {
        weather,
        main: { temp_min, temp_max, temp },
      } = data;

      return {
        desc: weather[0].description,
        min: temp_min,
        max: temp_max,
        temp,
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  addHistory(place = '') {
    if (this.history.includes(place.toLowerCase())) return;

    this.history = this.history.splice(0, 5);
    this.history.unshift(place.toLowerCase());

    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;
    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    this.history = data.history;
  }
}

module.exports = Searches;
