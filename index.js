const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');

const main = async () => {
  let option = '';
  do {
    option = await inquirerMenu();

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
