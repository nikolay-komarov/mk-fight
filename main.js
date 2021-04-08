console.log('Fight...');

const scorpion = {
  name: 'scorpion',
  hp: 100,
  img: 'img',
  weapon: ['weapon1', 'weapon2'],
  attack: function() {
    console.log(scorpion.name + ' fight...');
  },
};

const sonya = {
  name: 'sonya',
  hp: 100,
  img: 'img',
  weapon: ['weapon1', 'weapon2'],
  attack: function() {
    console.log(sonya.name + ' fight...');
  },
};

const createPlayer = function (playerClass, name, health) {
  const $player = document.createElement('div');
  $player.classList.add(playerClass);

  const $progressbar = document.createElement('div');
  $progressbar.classList.add('progressbar');

  const $life = document.createElement('div');
  $life.classList.add('life');
  $life.style.width = health + '%';

  const $name = document.createElement('div');
  $name.classList.add('name');
  $name.innerText = name;

  const $character = document.createElement('div');
  $character.classList.add('character');

  const $image = document.createElement('img');
  $image.src='http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';

  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($image);

  const $arena = document.querySelector('.arenas');
  $arena.appendChild($player);
};

createPlayer('player1', 'SCORPION', 50);
createPlayer('player2', 'SUB-ZERO', 80);
