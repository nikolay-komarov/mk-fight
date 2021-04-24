import {logs} from "./logs.js";

export const getCurrentDateToLog = () => {
  const dateToLog = new Date();
  return dateToLog.toLocaleTimeString().slice(0, -3);
};

export const generateLog = (type, player1 = {}, player2 = {}, hitValue) => {
  const $chat = document.querySelector('.chat');
  const {
    name: player1Name,
  } = player1;
  const {
    name: player2Name,
    hp: player2Hp,
  } = player2;

  let text = ``;

  switch (type) {
    case 'start':
      text = logs.start.replace('[time]', getCurrentDateToLog()).replace('[player1]', player1Name).replace('[player2]', player2Name);
      break;
    case 'hit':
      text = `${getCurrentDateToLog()}: 
        ${logs.hit[getRandom(logs.hit.length - 1)]
        .replace('[time]', getCurrentDateToLog())
        .replace('[playerKick]', player1Name)
        .replace('[playerDefence]', player2Name)}
         -${hitValue}
         ${player2Hp}/100;`;
      break;
    case 'defence':
      text = `${getCurrentDateToLog()}:
        ${logs.defence[getRandom(logs.defence.length - 1)]
        .replace('[playerKick]', player1Name)
        .replace('[playerDefence]', player2Name)}`;
      break;
    case 'end':
      text = `${getCurrentDateToLog()}: 
        ${logs.end[getRandom(logs.end.length - 1)]
        .replace('[playerWins]', player1Name)
        .replace('[playerLose]', player2Name)}`;
      break;
    case 'draw':
      text = `${getCurrentDateToLog()}: ${logs.draw}`;
      break;
    default:
      text = ``;
  }

  const elLog = `<p>${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin', elLog);
};

export const getRandom = (value) => {
  return Math.ceil(Math.random() * value);
};

export const createElement = (teg, className) => {
  const $el = document.createElement(teg);
  if (className) {
    $el.classList.add(className);
  }

  return $el;
};
