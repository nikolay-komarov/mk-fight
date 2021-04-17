console.log('Fight...');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];
import {logs} from './logs.js';

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

const generateLog = function (type, playerAttack, playerDefence) {
  const text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', playerAttack.name).replace('[playerDefence]', playerDefence.name);
  const elLog = `<p>${text}</p>`
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
    $arena.appendChild(showResults(subZero.name));
  } else if (subZero.hp === 0 && subZero.hp < scorpion.hp) {
    $arena.appendChild(showResults(scorpion.name));
  } else if (scorpion.hp === 0 && subZero.hp === 0) {
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
    generateLog('hit', subZero, scorpion);
  }
  if (player.hit !== enemy.defence) {
    subZero.changeHP(player.value);
    subZero.renderHP();
    generateLog('hit', scorpion, subZero);
  }

  showResult();
});

