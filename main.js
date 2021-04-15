console.log('Fight...');

const RANDOM_HP_PARAM = 20;

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

$arena.appendChild(createPlayer(scorpion));
$arena.appendChild(createPlayer(subZero));

// const $randomButton = document.querySelector('.button');

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

// $randomButton.addEventListener('click', function () {
//   scorpion.changeHP(getRandom(RANDOM_HP_PARAM));
//   scorpion.renderHP();
//   subZero.changeHP(getRandom(RANDOM_HP_PARAM));
//   subZero.renderHP();
//
//   if (scorpion.hp === 0 || subZero.hp === 0) {
//     $randomButton.disabled = true;
//     createReloadButton();
//   }
//
//   if (scorpion.hp === 0 && scorpion.hp <  subZero.hp) {
//     $arena.appendChild(showResults(subZero.name));
//   } else if (subZero.hp === 0 && subZero.hp < scorpion.hp) {
//     $arena.appendChild(showResults(scorpion.name));
//   } else if (scorpion.hp === 0 && subZero.hp === 0) {
//     $arena.appendChild(showResults());
//   }
// });


const $form = document.querySelector('.control');
$form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  console.log('### submit');
})