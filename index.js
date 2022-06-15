const {
  readInput,
  inquirerMenu,
  pause,
  listPlaces,
} = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('dotenv').config();

const main = async () => {
  const search = new Searches();
  let option = '';

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        const searchTerm = await readInput('Ciudad: ');
        const places = await search.city(searchTerm);
        const idSelected = await listPlaces(places);
        const placeSelected = places.find((p) => p.id === idSelected);
        const weather = await search.weatherPlace(
          placeSelected.lat,
          placeSelected.lng
        );

        console.clear();

        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ', placeSelected.name.green);
        console.log('Lat:', placeSelected.lat);
        console.log('Lng:', placeSelected.lng);
        console.log('Temperatura:', weather.temp);
        console.log('Mínima:', weather.min);
        console.log('Máxima:', weather.max);
        console.log('Como está el clima:', weather.desc.green);
        break;

      default:
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
