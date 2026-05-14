let mode = 1;
let elements = [];
let spacing = 25;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  
  // Initialization: Building the particle grid
  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      elements.push(new Particle(x, y));
    }
  }
}

function draw() {
  background(15, 15, 25);
  
  // Loop through all objects in the array
  for (let p of elements) {
    p.update();
    p.display();
  }
  
  renderUI();
}

class Particle {
  constructor(x, y) {
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
    this.size = 10;
    this.c = color(255);
  }

  update() {
    let d = dist(mouseX, mouseY, this.originX, this.originY);
    
    if (mode === 1) {
      // Behavior 1: Proximity Scaling
      this.size = map(d, 0, 150, 40, 5, true);
      this.c = color(0, 255, 200, 200);
      this.x = lerp(this.x, this.originX, 0.1);
      this.y = lerp(this.y, this.originY, 0.1);

    } else if (mode === 2) {
      // Behavior 2: Vector Repulsion
      let angle = atan2(this.originY - mouseY, this.originX - mouseX);
      let push = map(d, 0, 200, 50, 0, true);
      let targetX = this.originX + cos(angle) * push;
      let targetY = this.originY + sin(angle) * push;
      
      this.x = lerp(this.x, targetX, 0.1);
      this.y = lerp(this.y, targetY, 0.1);
      this.size = 12;
      this.c = color(255, 100, 255);

    } else if (mode === 3) {
      // Behavior 3: Rotational Drift
      let rotSpeed = map(d, 0, 300, 0.1, 0, true);
      let angle = frameCount * rotSpeed;
      this.x = this.originX + cos(angle) * 15;
      this.y = this.originY + sin(angle) * 15;
      this.size = 15;
      this.c = color(255, 204, 0);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.c);
    noStroke();
    if (mode === 2) rect(0, 0, this.size, this.size);
    else ellipse(0, 0, this.size, this.size);
    pop();
  }
}

function renderUI() {
  fill(255);
  noStroke();
  textSize(12);
  text("Force Field Mode: " + mode + " | Press 1, 2, or 3", 20, height - 20);
}

function keyPressed() {
  if (key === '1') mode = 1;
  if (key === '2') mode = 2;
  if (key === '3') mode = 3;
}