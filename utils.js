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