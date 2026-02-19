//  template for p5.js canvas

export const templates: Record<string, string> = {
  basic: `p.setup = function() {
  p.createCanvas(400, 400);
  p.textAlign(p.CENTER, p.CENTER);
};

p.draw = function() {
  p.background(26, 58, 92);

  p.fill(255);
  p.textSize(80);
  p.textStyle(p.BOLD);
  p.text("BSE", p.width / 2, p.height / 2);

  p.noFill();
  p.stroke(65, 175, 170);
  p.strokeWeight(4);
  p.rect(60, 120, 280, 160, 10);
};`,

  input: `let x = 200;
let y = 200;

p.setup = function() {
  p.createCanvas(400, 400);
};

p.draw = function() {
  p.background(220);
  x = p.mouseX;
  y = p.mouseY;
  p.fill(70, 110, 180);
  p.ellipse(x, y, 50, 50);
};

p.mousePressed = function() {
  p.background(255, 200, 200);
};`,

  loops: `p.setup = function() {
  p.createCanvas(400, 400);
  p.noLoop();
};

p.draw = function() {
  p.background(240);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let x = 50 + i * 80;
      let y = 50 + j * 80;
      p.fill(0, 160, 225);
      p.ellipse(x, y, 40, 40);
    }
  }
};`,

  logic: `let ballX = 200;
let ballY = 200;
let speedX = 3;
let speedY = 2;

p.setup = function() {
  p.createCanvas(400, 400);
};

p.draw = function() {
  p.background(220);
  ballX = ballX + speedX;
  ballY = ballY + speedY;

  if (ballX > p.width || ballX < 0) speedX = -speedX;
  if (ballY > p.height || ballY < 0) speedY = -speedY;

  if (ballX > p.width / 2) {
    p.fill(230, 165, 50);
  } else {
    p.fill(175, 75, 145);
  }
  p.ellipse(ballX, ballY, 40, 40);
};`,

  variables: `let circleSize = 50;
let growing = true;
let xPos = 0;

p.setup = function() {
  p.createCanvas(400, 400);
};

p.draw = function() {
  p.background(220);

  if (growing) {
    circleSize = circleSize + 1;
  } else {
    circleSize = circleSize - 1;
  }

  if (circleSize > 100) growing = false;
  else if (circleSize < 50) growing = true;

  xPos = xPos + 2;
  if (xPos > p.width) xPos = 0;

  p.fill(215, 100, 44);
  p.ellipse(xPos, p.height / 2, circleSize, circleSize);
};`,

  math: `let angle = 0;

p.setup = function() {
  p.createCanvas(400, 400);
};

p.draw = function() {
  p.background(220);
  p.translate(p.width / 2, p.height / 2);

  for (let i = 0; i < 100; i++) {
    let r = i * 2;
    let x = r * p.cos(angle + i * 0.2);
    let y = r * p.sin(angle + i * 0.2);
    p.fill(175, 75, 145, 200);
    p.ellipse(x, y, 10, 10);
  }
  angle = angle + 0.02;
};`,
};

export function getTemplate(category: string): string {
  return templates[category] || templates.basic;
}
