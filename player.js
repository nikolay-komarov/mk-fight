import {createElement} from "./utils.js";

export default class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;

    this.rootSelector = props.rootSelector;
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

  renderPlayer = () => {
    const $player = createElement('div', `player${this.player}`);

    const $progressbar = createElement('div', 'progressbar');

    const $life = createElement('div', 'life');
    $life.style.width = this.hp + '%';

    const $name = createElement('div', 'name');
    $name.innerText = this.name;

    const $character = createElement('div', 'character');

    const $image = createElement('img');
    $image.src = this.img;

    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($image);

    const $root = document.querySelector(`.${this.rootSelector}`);
    $root.appendChild($player);

    return $player;
  };
}
