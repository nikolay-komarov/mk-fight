import {createElement} from "./utils.js";

export class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    //todo: убрать функцию? - this.elHP = document.querySelector(`.player${props.player} .life`);
  }

  attack = () => {
    console.log(this.name + ' fight...');
  }

  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  }

  changeHP = (changeHPPoints) => {
    this.hp -= changeHPPoints;

    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`;
  }
}

export const scorpion = new Player({
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
});

export const subZero = new Player({
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
});

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