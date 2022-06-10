const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
  const searches = new Searches();
  let option = '';

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        const place = await readInput('Ciudad: ');
        console.log(place);

        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperatura:');
        console.log('Mínima:');
        console.log('Máxima:');
        break;

      default:
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
