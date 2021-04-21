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
const $chat = document.querySelector('.chat');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

$arena.appendChild(createPlayer(scorpion));
$arena.appendChild(createPlayer(subZero));

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

const showResult = function (player1, player2) {
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
    generateLog('end', subZero, scorpion);
    $arena.appendChild(showResults(player2Name));
  } else if (player2Hp === 0 && player2Hp < player1Hp) {
    generateLog('end', scorpion, subZero);
    $arena.appendChild(showResults(player1Name));
  } else if (player1Hp === 0 && player2Hp === 0) {
    generateLog('draw');
    $arena.appendChild(showResults());
  }
};

$formFight.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    scorpion.changeHP(enemy.value);
    scorpion.renderHP();
    generateLog($chat, 'hit', subZero, scorpion, enemy.value);
  }
  if (player.hit !== enemy.defence) {
    subZero.changeHP(player.value);
    subZero.renderHP();
    generateLog($chat, 'hit', scorpion, subZero, player.value);
  }
  if (player.hit === enemy.defence) {
    generateLog($chat, 'defence', scorpion, subZero);
  }
  if (player.hit === enemy.defence) {
    generateLog($chat, 'defence', subZero, scorpion);
  }

  showResult(scorpion, subZero);
});

generateLog($chat, 'start', scorpion, subZero);
