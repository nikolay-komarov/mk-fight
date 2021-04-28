export default class Api {
  constructor() {
    this.urlPlayers = 'https://reactmarathon-api.herokuapp.com/api/mk/players';
  }

  getPlayers = async () => {
    const data = await fetch(`https://reactmarathon-api.herokuapp.com/api/mk/players`).then(res => res.json());
    return data;
  }
};
