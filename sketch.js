let snake;
let size = 20;
let w, h;
let food;
let rate = 5;
let score = 0;
let scoreText;
let button;

function setup() {
  const cnv = createCanvas(400, 400);
  cnv.center();
  w = floor(width / size);
  h = floor(height / size);

  button = createButton('RESTART');
  button.center('horizontal');
  button.style('top', '650px');
  button.mousePressed(() => {
    rate = 5;
    score = 0;
    scoreText.remove();
    scoreText = createP(`SCORE: ${score}`);
    scoreText.center('horizontal');
    scoreText.style('top', '150px');
    newGame();
    draw();
  });

  scoreText = createP(`SCORE: ${score}`);
  scoreText.center('horizontal');
  scoreText.style('top', '150px');
  newGame();
}

function newGame() {
  snake = new Snake();
  createFood();
}

function foodLook() {
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1);
}

function createFood() {
  food = createVector(floor(random(w)), floor(random(h)));
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.setDir(-1, 0);
      break;
    case RIGHT_ARROW:
      snake.setDir(1, 0);
      break;
    case UP_ARROW:
      snake.setDir(0, -1);
      break;
    case DOWN_ARROW:
      snake.setDir(0, 1);
      break;
    case DOWN_ARROW:
      snake.setDir(0, 1);
      break;
    case CONTROL:
      snake.ungrow(); // cheat
      break;
  }
}

function draw() {
  background(220);
  scale(size);
  frameRate(rate);

  if (snake.eat(food)) {
    createFood();
    rate += 0.5;
    score++;
    scoreText.remove();
    scoreText = createP(`SCORE: ${score}`);
    scoreText.center('horizontal');
    scoreText.style('top', '150px');
  }
  snake.update();
  snake.show();

  if (snake.endGame()) rate = 0;

  foodLook();
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.len = 0;
    this.xdir = 0;
    this.ydir = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  ungrow() {
    let head = this.body[this.body.length - 1].copy();
    if (this.body.length > 1) {
      this.body.pop(head);
    }
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > w - 1 || x < 0 || y > h - 1 || y < 0) return true;
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === x && part.y === y) return true;
    }
    return false;
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x === pos.x && y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}
