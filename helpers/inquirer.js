const inquirer = require('inquirer');
require('colors');

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'Que desea hacer?',
    choices: [
      { value: '1', name: `${'1.'.green} Crear tarea` },
      { value: '2', name: `${'2.'.green} Mostrar tarea` },
      { value: '3', name: `${'3.'.green} Mostrar tareas completadas` },
      { value: '4', name: `${'4.'.green} Mostrar tarea pendientes` },
      { value: '5', name: `${'5.'.green} Completar tarea(s)` },
      { value: '6', name: `${'6.'.green} Borrar tarea` },
      { value: '0', name: `${'0.'.green} Salir` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('======================='.green);
  console.log('Selecciona una opción'.white);
  console.log('=======================\n'.green);

  const { option } = await inquirer.prompt(menuOptions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para continuar`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (!value.length) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listOfTaskToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({ value: '0', name: `${'0.'.green} Cancelar` });
  const questions = [{ type: 'list', name: 'id', message: 'Borrar', choices }];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [{ type: 'confirm', name: 'ok', message }];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.finishedIn ? true : false,
    };
  });

  const question = [
    { type: 'checkbox', name: 'ids', message: 'Seleccione', choices },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listOfTaskToDelete,
  confirm,
  showListCheckList,
};
