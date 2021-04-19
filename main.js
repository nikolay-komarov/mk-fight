console.log('Fight...');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];
import {logs} from './logs.js';

import {getCurrentDateToLog} from './utils.js';

const getRandom = function (value) {
  return Math.ceil(Math.random() * value);
};

const changeHP = function (changeHPPoints) {
  this.hp -= changeHPPoints;

  if (this.hp < 0) {
    this.hp = 0;
  }
};

const elHP = function () {
  return document.querySelector('.player' + this.player + ' .life');
};

const renderHP = function () {
  this.elHP().style.width = this.hp + '%';
};

const scorpion = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['weapon1', 'weapon2'],
  attack: function() {
    console.log(this.name + ' fight...');
  },
  changeHP,
  elHP,
  renderHP,
};

const subZero = {
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['weapon1', 'weapon2'],
  attack: function() {
    console.log(this.name + ' fight...');
  },
  changeHP,
  elHP,
  renderHP,
};

const createElement = function (teg, className) {
  const $el = document.createElement(teg);
  if (className) {
    $el.classList.add(className);
  }

  return $el;
};

const createPlayer = function (player) {
  const $player = createElement('div', 'player' + player.player);

  const $progressbar = createElement('div', 'progressbar');

  const $life = createElement('div', 'life');
  $life.style.width = player.hp + '%';

  const $name = createElement('div', 'name');
  $name.innerText = player.name;

  const $character = createElement('div', 'character');

  const $image = createElement('img');
  $image.src=player.img;

  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($image);

  return $player;
};

const $arena = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');

$arena.appendChild(createPlayer(scorpion));
$arena.appendChild(createPlayer(subZero));

const $randomButton = document.querySelector('.button');

const generateLog = function (type, player1, player2, hitValue) {
  let text = ``;

  switch (type) {
    case 'start':
      text = logs.start.replace('[time]', getCurrentDateToLog()).replace('[player1]', player1.name).replace('[player2]', player2.name);
      break;
    case 'hit':
      text = getCurrentDateToLog() + ': '
        + logs.hit[getRandom(logs.hit.length - 1)]
        .replace('[time]', getCurrentDateToLog())
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name)
        + '-' + hitValue + ' '
        + player2.hp + '/100;';
      break;
    case 'defence':
      text = getCurrentDateToLog() + ': '
        + logs.defence[getRandom(logs.hit.length - 1)]
          .replace('[playerKick]', player1.name)
          .replace('[playerDefence]', player2.name);
      break;
    case 'end':
      text = getCurrentDateToLog() + ': '
        + logs.end[getRandom(logs.end.length - 1)]
        .replace('[playerWins]', player1.name)
        .replace('[playerLose]', player2.name);
      break;
    case 'draw':
      text = getCurrentDateToLog() + ': ' + logs.draw;
      break;
    default:
      text = ``;
  }

  const elLog = `<p>${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin', elLog);
};

const showResults = function (name) {
  const $resultTitle = createElement('div', 'endFightTitle');
  if (name) {
    $resultTitle.innerText = name + ' wins';
  } else {
    $resultTitle.innerText = 'draw';
  }

  return $resultTitle;
}

const createReloadButton = function () {
  const $reloadButtonWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText = 'Reload';

  $reloadButton.addEventListener('click', function () {
    window.location.reload();
  });

  $reloadButtonWrap.appendChild($reloadButton);
  $arena.appendChild($reloadButtonWrap);
};

const enemyAttack = function () {
  const hit = ATTACK[getRandom(3)-1];
  const defence = ATTACK[getRandom(3)-1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  }
};

const playerAttack = function () {
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
};

const showResult = function () {
  if (scorpion.hp === 0 || subZero.hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }

  if (scorpion.hp === 0 && scorpion.hp <  subZero.hp) {
    generateLog('end', subZero, scorpion);
    $arena.appendChild(showResults(subZero.name));
  } else if (subZero.hp === 0 && subZero.hp < scorpion.hp) {
    generateLog('end', scorpion, subZero);
    $arena.appendChild(showResults(scorpion.name));
  } else if (scorpion.hp === 0 && subZero.hp === 0) {
    generateLog('draw');
    $arena.appendChild(showResults());
  }
};

const $formFight = document.querySelector('.control');

$formFight.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    scorpion.changeHP(enemy.value);
    scorpion.renderHP();
    generateLog('hit', subZero, scorpion, enemy.value);
  }
  if (player.hit !== enemy.defence) {
    subZero.changeHP(player.value);
    subZero.renderHP();
    generateLog('hit', scorpion, subZero, player.value);
  }
  if (player.hit === enemy.defence) {
    generateLog('defence', scorpion, subZero);
  }
  if (player.hit === enemy.defence) {
    generateLog('defence', subZero, scorpion);
  }

  showResult();
});

generateLog('start', scorpion, subZero);
