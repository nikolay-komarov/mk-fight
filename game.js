import {HIT, ATTACK} from "./const.js";
import {scorpion, subZero} from './player.js';
import {createPlayer} from "./player.js";

import {
  generateLog,
  getRandom,
  createElement
} from './utils.js';

export default class Game {
  constructor() {
    this.$arena = document.querySelector('.arenas');
    this.$randomButton = document.querySelector('.button');
    this.$formFight = document.querySelector('.control');
  }

  addPlayers = () => {
    this.$arena.appendChild(createPlayer(scorpion));
    this.$arena.appendChild(createPlayer(subZero));
  }

  showResults = (name) => {
    const $resultTitle = createElement('div', 'endFightTitle');
    if (name) {
      $resultTitle.innerText = name + ' wins';
    } else {
      $resultTitle.innerText = 'draw';
    }

    return $resultTitle;
  }

  createReloadButton = () => {
    const $reloadButtonWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Reload';

    $reloadButton.addEventListener('click', function () {
      window.location.reload();
    });

    $reloadButtonWrap.appendChild($reloadButton);
    this.$arena.appendChild($reloadButtonWrap);
  };

  enemyAttack = () => {
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];

    return {
      value: getRandom(HIT[hit]),
      hit,
      defence
    }
  };

  playerAttack = () => {
    const attack = {};

    for (let item of this.$formFight) {
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

  showResult = (player1, player2) => {
    const {
      name: player1Name,
      hp: player1Hp
    } = player1;
    const {
      name: player2Name,
      hp: player2Hp
    } = player2;

    if (player1Hp === 0 || player2Hp === 0) {
      this.$randomButton.disabled = true;
      this.createReloadButton();
    }

    if (player1Hp === 0 && player1Hp <  player2Hp) {
      generateLog('end', player2, player1);
      this.$arena.appendChild(this.showResults(player2Name));
    } else if (player2Hp === 0 && player2Hp < player1Hp) {
      generateLog('end', player1, player2);
      this.$arena.appendChild(this.showResults(player1Name));
    } else if (player1Hp === 0 && player2Hp === 0) {
      generateLog('draw');
      this.$arena.appendChild(this.showResults());
    }
  };

  addSubmitToFormFight = () => {
    this.$formFight.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const enemy = this.enemyAttack();
      const player = this.playerAttack();

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

      this.showResult(scorpion, subZero);
    });
  };

  start = () => {
    this.addPlayers();
    this.addSubmitToFormFight();
    generateLog('start', scorpion, subZero);
  }
}
