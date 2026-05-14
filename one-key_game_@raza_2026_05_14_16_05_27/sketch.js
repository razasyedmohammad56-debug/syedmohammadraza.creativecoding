let p1X, p2X;
let p1Vel = 0;
let p2Vel = 0;
let friction = 0.96; // Slows the players down over time
let p1Power = 1.8;
let p2Power = -1.8;
let gameRunning = false;
let winner = "";

function setup() {
  createCanvas(600, 400);
  p1X = width / 2 - 60;
  p2X = width / 2 + 60;
}

function draw() {
  background(25, 25, 35);

  // Draw the "Arena" platform
  rectMode(CENTER);
  fill(50);
  rect(width / 2, height / 2 + 40, 450, 20);

  if (!gameRunning && winner === "") {
    showStartScreen();
  } else if (gameRunning) {
    runGameLogic();
  } else {
    showWinScreen();
  }
}

function runGameLogic() {
  // Apply physics: Velocity + Friction
  p1Vel *= friction;
  p2Vel *= friction;
  p1X += p1Vel;
  p2X += p2Vel;

  // Simple collision detection: if circles overlap, they bounce
  let distance = abs(p1X - p2X);
  if (distance < 40) {
    let impact = p1Vel - p2Vel;
    p1Vel -= impact * 0.6;
    p2Vel += impact * 0.6;
  }

  // Draw Players
  noStroke();
  fill(0, 150, 255); // Blue
  ellipse(p1X, height / 2, 40, 40);
  
  fill(255, 50, 100); // Red/Pink
  ellipse(p2X, height / 2, 40, 40);

  // Check Boundaries (Win State)
  if (p1X < 75) {
    winner = "Player 2";
    gameRunning = false;
  } else if (p2X > 525) {
    winner = "Player 1";
    gameRunning = false;
  }
}

function keyPressed() {
  if (!gameRunning && winner === "" && key === ' ') {
    gameRunning = true;
  }

  // P1 uses 'A' to dash right
  if (gameRunning && (key === 'a' || key === 'A')) {
    p1Vel += p1Power;
  }
  
  // P2 uses 'L' to dash left
  if (gameRunning && (key === 'l' || key === 'L')) {
    p2Vel += p2Power;
  }

  // Restart logic
  if (winner !== "" && (key === 'r' || key === 'R')) {
    resetGame();
  }
}

function resetGame() {
  p1X = width / 2 - 60;
  p2X = width / 2 + 60;
  p1Vel = 0;
  p2Vel = 0;
  winner = "";
  gameRunning = true;
}

function showStartScreen() {
  textAlign(CENTER);
  fill(255);
  textSize(28);
  text("ONE-KEY SUMO", width / 2, height / 2 - 60);
  textSize(16);
  text("P1: 'A' (Push Right) | P2: 'L' (Push Left)", width / 2, height / 2 - 20);
  fill(0, 255, 150);
  text("PRESS SPACE TO START", width / 2, height / 2 + 80);
}

function showWinScreen() {
  textAlign(CENTER);
  fill(255);
  textSize(36);
  text(winner + " WINS!", width / 2, height / 2);
  textSize(18);
  fill(200);
  text("Press 'R' to Rematch", width / 2, height / 2 + 50);
}