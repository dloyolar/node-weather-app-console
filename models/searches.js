const axios = require('axios');

class Searches {
  history = ['Santiago', 'Los Angeles', 'California'];

  constructor() {}

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      proximity: 'ip',
      limit: 5,
      language: 'es',
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
      console.log(data);
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = Searches;
