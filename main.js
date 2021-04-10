console.log('Fight...');

const $arena = document.querySelector('.arenas');

const scorpion = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['weapon1', 'weapon2'],
  attack: function() {
    console.log(this.name + ' fight...');
  },
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

$arena.appendChild(createPlayer(scorpion));
$arena.appendChild(createPlayer(subZero));

const $randomButton = document.querySelector('.button');

const randomHP = function () {
  return Math.ceil(Math.random() * 20);
};

const playerWins = function (name) {
  const $playerWin = createElement('div', 'endFightTitle');
  $playerWin.innerText = name + ' wins'

  return $playerWin;
}

const changeHP = function (player) {
  const $playerLife = document.querySelector('.player' + player.player + ' .life');
  player.hp -= randomHP();

  if (player.hp < 0) {
    player.hp = 0;
  }

  $playerLife.style.width = player.hp + '%';
};

$randomButton.addEventListener('click', function () {
  changeHP(scorpion);
  changeHP(subZero);

  if (scorpion.hp <= 0) {
    $arena.appendChild(playerWins(subZero.name));
    $randomButton.disabled = true;
  } else if (subZero.hp <= 0) {
    $arena.appendChild(playerWins(scorpion.name));
    $randomButton.disabled = true;
  }
});
