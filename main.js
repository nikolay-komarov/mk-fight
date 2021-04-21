console.log('Fight...');

import {HIT, ATTACK} from "./const.js";
import {scorpion, subZero} from './player.js';
import {createPlayer} from "./player.js";

import {
  generateLog,
  getRandom,
  createElement
} from './utils.js';

const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

$arena.appendChild(createPlayer(scorpion));
$arena.appendChild(createPlayer(subZero));

const showResults = (name) => {
  const $resultTitle = createElement('div', 'endFightTitle');
  if (name) {
    $resultTitle.innerText = name + ' wins';
  } else {
    $resultTitle.innerText = 'draw';
  }

  return $resultTitle;
}

const createReloadButton = () => {
  const $reloadButtonWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText = 'Reload';

  $reloadButton.addEventListener('click', function () {
    window.location.reload();
  });

  $reloadButtonWrap.appendChild($reloadButton);
  $arena.appendChild($reloadButtonWrap);
};

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3)-1];
  const defence = ATTACK[getRandom(3)-1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  }
};

const playerAttack = () => {
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

const showResult = (player1, player2) => {
  const {
    name: player1Name,
    hp: player1Hp
  } = player1;
  const {
    name: player2Name,
    hp: player2Hp
  } = player2;

  if (player1Hp === 0 || player2Hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }

  if (player1Hp === 0 && player1Hp <  player2Hp) {
    generateLog('end', player2, player1);
    $arena.appendChild(showResults(player2Name));
  } else if (player2Hp === 0 && player2Hp < player1Hp) {
    generateLog('end', player1, player2);
    $arena.appendChild(showResults(player1Name));
  } else if (player1Hp === 0 && player2Hp === 0) {
    generateLog('draw');
    $arena.appendChild(showResults());
  }
};

$formFight.addEventListener('submit', (evt) => {
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

  showResult(scorpion, subZero);
});

generateLog('start', scorpion, subZero);
