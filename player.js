import {createElement} from "./utils.js";

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

export const scorpion = {
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

export const subZero = {
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

export const createPlayer = ({player, hp, name, img}) => {
  const $player = createElement('div', 'player' + player);

  const $progressbar = createElement('div', 'progressbar');

  const $life = createElement('div', 'life');
  $life.style.width = hp + '%';

  const $name = createElement('div', 'name');
  $name.innerText = name;

  const $character = createElement('div', 'character');

  const $image = createElement('img');
  $image.src = img;

  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($image);

  return $player;
};