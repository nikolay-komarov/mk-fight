console.log('Fight...');

const scorpion = {
  name: 'SCORPION',
  hp: 50,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['weapon1', 'weapon2'],
  attack: function() {
    console.log(this.name + ' fight...');
  },
};

const subZero = {
  name: 'SUB-ZERO',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['weapon1', 'weapon2'],
  attack: function() {
    console.log(this.name + ' fight...');
  },
};

const createPlayer = function (playerClass, player) {
  const $player = document.createElement('div');
  $player.classList.add(playerClass);

  const $progressbar = document.createElement('div');
  $progressbar.classList.add('progressbar');

  const $life = document.createElement('div');
  $life.classList.add('life');
  $life.style.width = player.hp + '%';

  const $name = document.createElement('div');
  $name.classList.add('name');
  $name.innerText = player.name;

  const $character = document.createElement('div');
  $character.classList.add('character');

  const $image = document.createElement('img');
  $image.src=player.img;

  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($image);

  const $arena = document.querySelector('.arenas');
  $arena.appendChild($player);
};

createPlayer('player1', scorpion);
createPlayer('player2', subZero);
