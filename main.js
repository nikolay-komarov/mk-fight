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

