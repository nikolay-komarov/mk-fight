export default class Api {
  constructor() {
    this.urlPlayers = 'https://reactmarathon-api.herokuapp.com/api/mk/players';
    this.urlRandomPlayer = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';
    this.urlFight = 'http://reactmarathon-api.herokuapp.com/api/mk/player/fight';
  }

  // пока оставим для реализации выбора игрока
  // getPlayers = async () => {
  //   return await fetch(this.urlPlayers).then(res => res.json());
  // }

  getRandomPlayer = async () => {
    return await fetch(this.urlRandomPlayer).then(res => res.json());
  }

  getFight = async (hit, defence) => {
    return await fetch(this.urlFight, {
      method: 'POST',
      body: JSON.stringify({
        hit,
        defence,
      })
    })
      .then(res => res.json());
  }
};
