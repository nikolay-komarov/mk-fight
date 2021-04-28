import Player from './player.js';
import Api from './api.js';

import {createElement, generateLog} from './utils.js';

export default class Game {
  constructor() {
    this.rootSelector = 'arenas';
    this.$arena = document.querySelector('.arenas');
    this.$randomButton = document.querySelector('.button');
    this.$formFight = document.querySelector('.control');

    this.api = new Api();

    this.player1 = {};
    this.player2 = {};
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

  playerAttack = () => {
    const attack = {};

    for (let item of this.$formFight) {
      if (item.checked && item.name === 'hit') {
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
    this.$formFight.addEventListener('submit', async (evt) => {
      evt.preventDefault();

      const playerAttack = this.playerAttack();

      const res = await this.api.getFight(playerAttack.hit, playerAttack.defence);
      const enemy = res.player1;
      const player = res.player2;

      if (enemy.hit !== player.defence) {
        this.player1.changeHP(enemy.value);
        this.player1.renderHP();
        generateLog('hit', this.player2, this.player1, enemy.value);
      }
      if (player.hit !== enemy.defence) {
        this.player2.changeHP(player.value);
        this.player2.renderHP();
        generateLog('hit', this.player1, this.player2, player.value);
      }
      if (player.hit === enemy.defence) {
        generateLog('defence', this.player1, this.player2);
      }
      if (player.hit === enemy.defence) {
        generateLog('defence', this.player2, this.player1);
      }

      this.showResult(this.player1, this.player2);
    });
  };

  start = async () => {
    // пока оставим для реализации выбора игрока
    // todo: реализовать выбор игрока
    // const players = await this.api.getPlayers();
    // const p1 = players[getRandom(players.length) - 1];
    // const p2 = players[getRandom(players.length) - 1];

    const p1 = await this.api.getRandomPlayer();
    const p2 = await this.api.getRandomPlayer();

    this.player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: this.rootSelector,
    });
    this.player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: this.rootSelector,
    });

    this.player1.renderPlayer();
    this.player2.renderPlayer();

    this.addSubmitToFormFight();
    generateLog('start', this.player1, this.player2);
  }
}
