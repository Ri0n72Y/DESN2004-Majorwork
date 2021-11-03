//const doorRatio = 80 / 200;
const doorRatio = 120 / 200; // ratio of the door, infact the line above is the standard usable door, but it may not looks good on layout
const DISPOINT_RATIO = 20; // area of door handle

const COLOR_WIDTH = 3; // how many line together share the same color
const FREE_COLOR = true; // use custom color sets, edit COLORS, with RGB string list
//const COLOR_WIDTH = 12;
//const FREE_COLOR = false; // use HSV ring by default, the above line is width I suggest
const S = 100; // Saturation
const V = 92; // Brightness

const WEIGHT = 4; // Line Weight
const DENCE = 30; // Dence of lines, greater than 360 to make a surface, but I like this more

const FR = 60;

const COLORS = [].concat(
  //SCHEMES.blue,
  SCHEMES.teal,
  SCHEMES.green,
  SCHEMES.lime,
  SCHEMES.skyblue,
  SCHEMES.cyan,
  SCHEMES.red,
  //SCHEMES.orange,
  //SCHEMES.yellow,
);