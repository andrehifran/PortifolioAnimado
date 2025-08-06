const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let airplane = new Image();
airplane.src = "airplane.png";
let airplaneX = canvas.width / 2;
let airplaneY = canvas.height - 100;

let bullets = [];
let shootSound = document.getElementById("shoot-sound");

document.addEventListener("mousemove", (e) => {
  airplaneX = e.clientX - 40;
  airplaneY = e.clientY - 20;
});

document.addEventListener("click", () => {
  for (let i = -1; i <= 1; i++) {
    bullets.push({ x: airplaneX + 40 + i * 10, y: airplaneY });
  }
  shootSound.currentTime = 0;
  shootSound.play();
});

const profilePic = document.getElementById("profile-pic");
let profilePicHealth = 100;

const phrase = "Sou apaixonado por tecnologia";
const nameText = "André Hifran";

let fallingLetters = [];
let typingIndex = 0;
let typingInterval;

function initLetters() {

  // Nome
  for (let i = 0; i < nameText.length; i++) {
    fallingLetters.push({
      char: nameText[i],
      x: canvas.width / 2 - nameText.length * 10 + i * 20,
      y: 100,
      falling: false,
      hit: false
    });
  }

  // Inicia digitação da frase
  typingInterval = setInterval(() => {
    if (typingIndex < phrase.length) {
      const i = typingIndex;
      fallingLetters.push({
        char: phrase[i],
        x: canvas.width / 2 - phrase.length * 8 + i * 16,
        y: 150,
        falling: false,
        hit: false
      });
      typingIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100);
}
initLetters();

function drawLetters() {
  ctx.font = "24px monospace";
  ctx.fillStyle = "#0ff";

  fallingLetters.forEach((t) => {
    if (!t.hit) {
      ctx.fillText(t.char, t.x, t.y);
      if (t.falling) {
        t.y += 3;
      }
    }
  });
}

function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach((b) => {
    ctx.fillRect(b.x, b.y, 4, 10);
    b.y -= 10;
  });
}

function detectHits() {
  const picRect = profilePic.getBoundingClientRect();

  // Use a reverse loop to safely remove bullets without skipping items
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    let bulletHit = false;

    // 1. Check for collision with the profile picture
    if (
      profilePicHealth > 0 &&
      b.x >= picRect.left &&
      b.x <= picRect.right &&
      b.y >= picRect.top &&
      b.y <= picRect.bottom
    ) {
      profilePicHealth -= 5; // Decrease health
      profilePic.style.opacity = profilePicHealth / 100;
      if (profilePicHealth <= 0) {
        profilePic.style.display = "none";
      }
      bulletHit = true;
    }

    // 2. If no hit on the picture, check for collision with letters
    if (!bulletHit) {
      for (const t of fallingLetters) {
        if (
          !t.hit && // only check letters that haven't been hit
          b.x >= t.x &&
          b.x <= t.x + 15 &&
          b.y >= t.y - 20 &&
          b.y <= t.y
        ) {
          t.falling = true;
          t.hit = true;
          bulletHit = true;
          break; // Exit the inner loop once a letter is hit by this bullet
        }
      }
    }

    // 3. If the bullet hit anything, remove it from the array
    if (bulletHit) {
      bullets.splice(i, 1);
    }
  }

  // Check for victory condition
  const allLettersGone = fallingLetters.every((t) => t.hit);
  if (allLettersGone && typingIndex >= phrase.length) {
    showVictory();
  }
}

function showVictory() {
  document.getElementById("victory-message").style.display = "flex";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(airplane, airplaneX, airplaneY, 80, 80);
  drawLetters();
  drawBullets();
  detectHits();
  requestAnimationFrame(draw);
}
draw();
