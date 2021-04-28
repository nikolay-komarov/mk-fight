export default class Api {
  constructor() {
    this.urlPlayers = 'https://reactmarathon-api.herokuapp.com/api/mk/players';
    this.urlRandomPlayer = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';
    this.urlFight = 'http://reactmarathon-api.herokuapp.com/api/mk/player/fight';
  }

  getPlayers = async () => {
    return await fetch(this.urlPlayers).then(res => res.json());
  }

  getRandomPlayer = async () => {
    return await fetch(this.urlRandomPlayer).then(res => res.json());
  }
};
