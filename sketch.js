const FR = 60;

const EPSILON = 9 * 10 ** (-1.2); // 72ppi
const DRAG = 0.7;
const WEIGHT = 2, COULOMB = 72 / (4 * Math.PI * EPSILON);

var config;
var state;

const doorHeight = 0.8; // according to vw
const doorRatio = 120 / 200;
function getBorder() {
  if (windowWidth && windowHeight) {
    const h = doorHeight * windowHeight;
    const w = doorRatio * h;
    const y = 0.5 * (windowHeight - h);
    const x = 0.5 * (windowWidth - w);
    return ({ x: x, y: y, w: w, h: h });
  }
}
function getHandle() {
  if (config.border) {
    const b = config.border;
    const x = 0.9 * b.w + b.x;
    const y = 0.5 * b.h + b.y;
    return (createVector(x, y));
  }
}

function isIn(x, y) {
  if (config?.border) {
    const c = config.border;
    return x > c.x + 2
      && x < c.x + c.w - 2
      && y > c.y + 2
      && y < c.y + c.h - 2;
  }
  return false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  background(30);
  frameRate(FR);
  angleMode(DEGREES);

  colorMode(HSL, 360, 100, 100);
  config = {
    border: undefined, // door xywh
    handle: undefined,
    click: undefined, // where the user click
    clickHistory: [],
  }
  state = {
    drawing: false,
    painters: [],
  }
  config.border = getBorder();
  config.handle = getHandle();

  setCanvasInitial();
  initialization();
}

function draw() {
  // put drawing code here
  if (state.drawing) {
    for (const p of state.painters) {
      p.draw();
      p.update();
    }
    state.painters = state.painters.filter(e => !e.end && e);
  }
  fill("black");
  const h = config.handle;
  circle(h.x, h.y, 4);
  noFill();
  const b = config.border;
  rect(b.x, b.y, b.w, b.h);
}

function initialization() {
  if (!state.painters) state.painters = [];
  if (!config.click) return;
  const dir = p5.Vector.sub(config.click, config.handle);
  dir.normalize();
  state.painters = [];
  for (let i = 0; i < 720; i++) {
    const fac = i *0.5;
    const ini = dir.copy().mult(4);
    const pos = p5.Vector.add(config.click, ini.rotate(fac));
    const angle = fac;
    const p = new Painter(angle, pos);
    state.painters.push(p)
  }
}

const COLOR_WIDTH = 2;
const COLOR_SPREAD = 6;
const RATIO = 2;
class Painter {
  constructor(angle, pos) {
    this.pos = pos;

    this.h = abs(angle * 2 - 360);
    this.h -= this.h % COLOR_WIDTH;
    this.h += random(-COLOR_SPREAD, COLOR_SPREAD)
    this.h = Math.round(abs(this.h ** RATIO / (360 ** (RATIO - 1))));
    this.s = 80;
    this.v = 60;
    this.velocity = createVector();
    this.end = false;
  }

  draw() {
    if (this.end || !isIn(this.pos.x, this.pos.y)) return;
    push()
    stroke(this.h, this.s, this.v)
    strokeWeight(WEIGHT)
    point(this.pos.x, this.pos.y)
    pop()
  }

  update() {
    if (this.end) return;
    const end = p5.Vector.sub(this.pos, config.handle).mag();
    if (end < 4) {
      this.end = true;
    } else if (end < 40) {
      this.velocity.normalize();
    }
    const xS = p5.Vector.sub(this.pos, config.click).mag();
    const xT = p5.Vector.sub(this.pos, config.handle).mag();

    const ra = xT / (xS + xT) * 100;
    const RA = 0.5;
    //this.s = 100;
    //this.v = Math.round(abs(ra ** RA / (100 ** (RA - 1))));

    const w = WEIGHT ** 2 * Math.PI;
    const ES = p5.Vector.sub(this.pos, config.click)
      .mult(w * COULOMB / (xS ** 2));
    const ET = p5.Vector.sub(config.handle, this.pos)
      .mult(w * COULOMB / (xT ** 2));
    const acc = p5.Vector.add(ES, ET);

    this.velocity = p5.Vector.add(this.velocity, acc)
    this.pos = p5.Vector.add(this.pos, this.velocity.mult(1 - DRAG));

    //console.log(`xS:${xS}, ES:${V2S(ES)}, xT:${xT}, ET:${V2S(ET)}`)
    //console.log(`acc:${V2S(acc)}, velo:${V2S(this.velocity)}, pos:${V2S(this.pos)}`)
  }
}

function V2S(a) {
  return `(${a.x},${a.y})`
}

function mouseClicked(e) {
  if (isIn(mouseX, mouseY)) {
    if (config.click) {
      config.clickHistory.push(config.click);
    }
    config.click = createVector(mouseX, mouseY);
    setCanvasInitial();
    initialization();
    state.drawing = true;
  }
}

function setCanvasInitial() {
  background(30);
  // draw a door
  stroke(0, 0, 0);
  strokeWeight(2);
  fill("white");
  const b = config.border;
  rect(b.x, b.y, b.w, b.h);

  fill("black");
  const h = config.handle;
  circle(h.x, h.y, 4);
}