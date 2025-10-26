const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const gameOverMenu = document.getElementById("gameOverMenu");
const restartBtn = document.getElementById("restartBtn");
const resultText = document.getElementById("resultText");
const fade = document.getElementById("fade");

let player, enemy, slashes, timer, gameOver, gameStarted;

// === Suara ===
const hitSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_1a63de9f8d.mp3");
const winSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_8eecf94c2f.mp3");
const loseSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_ae0d5c9b27.mp3");
const stepSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_3cb823d3b7.mp3");
stepSound.volume = 0.4;
hitSound.volume = 0.6;

function fadeIn(callback) {
  fade.classList.add("active");
  setTimeout(() => {
    if (callback) callback();
  }, 1000);
}

function fadeOut(callback) {
  fade.classList.remove("active");
  setTimeout(() => {
    if (callback) callback();
  }, 1000);
}

function resetGame() {
  player = { x: 100, y: 200, hp: 100, attacking: false, dir: 1, moving: false };
  enemy = { x: 350, y: 200, hp: 100, idleOffset: 0, idleDir: 1 };
  slashes = [];
  timer = 60;
  gameOver = false;
  gameStarted = true;
}

startBtn.addEventListener("click", () => {
  fadeIn(() => {
    menu.style.display = "none";
    canvas.style.display = "block";
    gameOverMenu.style.display = "none";
    resetGame();
    fadeOut();
    draw();
  });
});

restartBtn.addEventListener("click", () => {
  fadeIn(() => {
    gameOverMenu.style.display = "none";
    menu.style.display = "block";
    fadeOut();
  });
});

document.addEventListener("keydown", e => {
  if (!gameStarted || gameOver) return;
  if (e.key === "ArrowRight") {
    player.x += 5;
    player.moving = true;
    player.dir = 1;
    playStep();
  }
  if (e.key === "ArrowLeft") {
    player.x -= 5;
    player.moving = true;
    player.dir = -1;
    playStep();
  }
  if (e.key === " ") attack();
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") player.moving = false;
});

function playStep() {
  if (stepSound.paused) {
    stepSound.currentTime = 0;
    stepSound.play();
  }
}

function attack() {
  if (player.attacking) return;
  player.attacking = true;
  const attackRange = 40;
  const originalX = player.x;
  player.x += 10 * player.dir;
  hitSound.currentTime = 0;
  hitSound.play();

  slashes.push({ x: player.x + (player.dir * 20), y: player.y - 10, life: 1.0, dir: player.dir });

  if (Math.abs(player.x - enemy.x) < attackRange) {
    enemy.hp -= 10;
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      endGame("PLAYER 1 WINS!");
      winSound.play();
    }
  }

  setTimeout(() => {
    player.x = originalX;
    player.attacking = false;
  }, 200);
}

function endGame(text) {
  gameOver = true;
  gameStarted = false;
  resultText.textContent = text;

  fadeIn(() => {
    canvas.style.display = "none";
    gameOverMenu.style.display = "block";
    fadeOut();
    if (text.includes("WINS")) winSound.play();
    else loseSound.play();
  });
}

function updateTimer() {
  if (!gameStarted || gameOver) return;
  timer -= 1;
  if (timer <= 0) endGame(enemy.hp > player.hp ? "ENEMY WINS!" : "PLAYER 1 WINS!");
}
setInterval(updateTimer, 1000);

function updateEnemyIdle() {
  if (!gameStarted || gameOver) return;
  enemy.idleOffset += 0.05 * enemy.idleDir;
  if (Math.abs(enemy.idleOffset) > 2) enemy.idleDir *= -1;
}
setInterval(updateEnemyIdle, 50);

function updateSlashes() {
  for (let i = 0; i < slashes.length; i++) slashes[i].life -= 0.05;
  slashes = slashes.filter(s => s.life > 0);
}

function drawSlash(s) {
  const grad = ctx.createLinearGradient(s.x - 10 * s.dir, s.y - 10, s.x + 10 * s.dir, s.y + 10);
  grad.addColorStop(0, "rgba(255,255,255," + s.life + ")");
  grad.addColorStop(1, "rgba(173,216,255,0)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(s.x - 10 * s.dir, s.y);
  ctx.lineTo(s.x + 20 * s.dir, s.y);
  ctx.stroke();
}

function drawStickman(x, y, color, attacking) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y - 25, 10, 0, Math.PI * 2);
  ctx.moveTo(x, y - 15);
  ctx.lineTo(x, y + 20);
  ctx.moveTo(x, y + 20);
  ctx.lineTo(x - 10, y + 40);
  ctx.moveTo(x, y + 20);
  ctx.lineTo(x + 10, y + 40);
  if (attacking) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + 25, y - 10);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(x + 15, y - 10);
  }
  ctx.moveTo(x, y);
  ctx.lineTo(x - 15, y - 10);
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(20, 20, player.hp * 2, 10);
  ctx.fillStyle = "blue";
  ctx.fillRect(240, 20, enemy.hp * 2, 10);
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(timer + "s", 225, 40);
  for (const s of slashes) drawSlash(s);
  updateSlashes();
  drawStickman(player.x, player.y, "white", player.attacking);
  drawStickman(enemy.x + enemy.idleOffset, enemy.y, "lightblue", false);
  if (!gameOver) requestAnimationFrame(draw);
}
