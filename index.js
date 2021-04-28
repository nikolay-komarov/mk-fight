import Api from "./api.js";
import {createElement} from "./utils.js";

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

function createEmptyPlayerBlock() {
  const el = createElement('div', ['character', 'div11', 'disabled']);
  const img = createElement('img');
  img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
  el.appendChild(img);
  $parent.appendChild(el);
}

async function init() {
  console.log('Select your fighter...');

  localStorage.removeItem('player1');

  const api = new Api();
  const players = await api.getPlayers();

  let imgSrc = null;
  createEmptyPlayerBlock();

  players.forEach(item => {
    const el = createElement('div', ['character', `div${item.id}`]);
    const img = createElement('img');

    el.addEventListener('mousemove', () => {
      if (imgSrc === null) {
        imgSrc = item.img;
        const $img = createElement('img');
        $img.src = imgSrc;
        $player.appendChild($img);
      }
    });

    el.addEventListener('mouseout', () => {
      if (imgSrc) {
        imgSrc = null;
        $player.innerHTML = '';
      }
    });

    el.addEventListener('click', () => {
      localStorage.setItem('player1', JSON.stringify(item));

      el.classList.add('active');

      setTimeout(() => {
        const currentUrl = window.location.pathname;
        window.location.pathname = currentUrl.replace('index.html', 'arena.html');
      }, 1000);
    });

    img.src = item.avatar;
    img.alt = item.name;

    el.appendChild(img);
    $parent.appendChild(el);
  });
}

init();
