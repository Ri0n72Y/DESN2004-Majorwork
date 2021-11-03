function onClickClear() {
  state.painters=[];
  setCanvasInitial();
}

/**
 * Box-Muller Transform in Polar form
 * @returns a number follows the normal distribution
 */
function randomND() {
  var u = 0.0, v = 0.0, w = 0.0;
  do {
    u = Math.random() * 2 - 1;
    v = Math.random() * 2 - 1;
    w = u * u + v * v;
  } while (w === 0 || w >= 1)
  const c = Math.sqrt((-2 * Math.log(w)) / w);
  return u * c; // v * c;
}

/**
 * 
 * @param {number} mean 
 * @param {number} stdDev 
 * @returns random number 
 */
const getND = (mean, stdDev) => mean + stdDev * randomND();
const intND = (m, d) => Math.round(getND(m, d));

// color schemes
const SCHEMES = {
  red: ['#ff867c', '#ef5350', '#b61827'],
  pink: ['#ffc1e3', '#f48fb1', '#bf5f82'],
  purple: ['#ffc4ff', '#ce93d8', '#9c64a6'],
  skyblue: ['#72e7ff', '#28b5f4', '#0085c1'],
  cyan: ['#b4ffff', '#80deea', '#4bacb8'],
  teal: ['#b2fef7', '#80cbc4', '#4f9a94'],
  green: ['#98ee99', '#66bb6a', '#338a3e'],
  lime: ['#ffffce', '#e6ee9c', '#b3bc6d'],
  yellow: ['#ffffcf', '#fff59d', '#cbc26d'],
  orange: ['#ffffb0', '#ffcc80', '#ca9b52'],
  blue: ['#302F7A', '#ABAAFA', '#625FFA', '#54537A', '#4E4CC7'],
  custom: [],
  grave: '#e0e0e0',
};