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

scorpion.attack();
sonya.attack();

const createPlayer = function () {
  const $player1 = document.createElement('div');
  $player1.classList.add('player1');

  const $progressbar = document.createElement('div');
  $progressbar.classList.add('progressbar');

  const $life = document.createElement('div');
  $life.classList.add('live');

  const $name = document.createElement('div');
  $name.classList.add('name');
  $name.innerText = 'scorpion';

  const $character = document.createElement('div');
  $character.classList.add('character');

  const $image = document.createElement('img');
  $image.src='http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';

  $player1.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player1.appendChild($character);
  $character.appendChild($image);

  return $player1;
};

console.log(createPlayer());

