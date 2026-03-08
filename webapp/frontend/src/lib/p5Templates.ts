export const templates: Record<string, string> = {
  basic: `p.setup = function() {
  p.createCanvas(256, 64);
  p.textAlign(p.CENTER, p.CENTER);
};

p.draw = function() {
  p.background(255);

  p.fill(26, 58, 92);
  p.stroke(65, 175, 170);
  p.strokeWeight(2);
  p.rect(p.width / 2 - 40, p.height / 2 - 18, 80, 36, 4);

  p.fill(255);
  p.noStroke();
  p.textSize(24);
  p.textStyle(p.BOLD);
  p.text("BSE", p.width / 2, p.height / 2);
};`,

  input: `let x = 128;
let y = 32;

p.setup = function() {
  p.createCanvas(256, 64);
};

p.draw = function() {
  p.background(220);
  x = p.mouseX;
  y = p.mouseY;
  p.fill(70, 110, 180);
  p.ellipse(x, y, 16, 16);
};

p.mousePressed = function() {
  p.background(255, 200, 200);
};`,

  loops: `p.setup = function() {
  p.createCanvas(256, 64);
  p.noLoop();
};

p.draw = function() {
  p.background(240);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 4; j++) {
      let x = 16 + i * 32;
      let y = 8 + j * 16;
      p.fill(0, 160, 225);
      p.ellipse(x, y, 10, 10);
    }
  }
};`,

  logic: `let ballX = 128;
let ballY = 32;
let speedX = 2;
let speedY = 1.5;

p.setup = function() {
  p.createCanvas(256, 64);
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
  p.ellipse(ballX, ballY, 14, 14);
};`,

  variables: `let circleSize = 10;
let growing = true;
let xPos = 0;

p.setup = function() {
  p.createCanvas(256, 64);
};

p.draw = function() {
  p.background(220);

  if (growing) {
    circleSize = circleSize + 0.3;
  } else {
    circleSize = circleSize - 0.3;
  }

  if (circleSize > 28) growing = false;
  else if (circleSize < 10) growing = true;

  xPos = xPos + 1.5;
  if (xPos > p.width) xPos = 0;

  p.fill(215, 100, 44);
  p.ellipse(xPos, p.height / 2, circleSize, circleSize);
};`,

  math: `let angle = 0;

p.setup = function() {
  p.createCanvas(256, 64);
};

p.draw = function() {
  p.background(220);
  p.translate(p.width / 2, p.height / 2);

  for (let i = 0; i < 15; i++) {
    let r = i * 2;
    let x = r * p.cos(angle + i * 0.5);
    let y = r * p.sin(angle + i * 0.5);
    p.fill(175, 75, 145, 200);
    p.ellipse(x, y, 6, 6);
  }
  angle = angle + 0.02;
};`,
};

export function getTemplate(category: string): string {
  return templates[category] || templates.basic;
}
