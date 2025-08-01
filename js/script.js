
const airplane = document.getElementById('airplane');
let airplaneX = window.innerWidth / 2;
let airplaneY = window.innerHeight - 100;
let speed = 10;

const shootSound = new Audio('sounds/shoot.wav');
const hitSound = new Audio('sounds/hit.wav');

function updateAirplanePosition() {
  airplane.style.left = `${airplaneX}px`;
  airplane.style.top = `${airplaneY}px`;
}

function shoot() {
  shootSound.currentTime = 0;
  shootSound.play();

  for (let i = -1; i <= 1; i++) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = `${airplaneX + 30 + i * 10}px`;
    bullet.style.top = `${airplaneY}px`;
    document.body.appendChild(bullet);

    const interval = setInterval(() => {
      bullet.style.top = `${bullet.offsetTop - 10}px`;
      bullet.style.left = `${bullet.offsetLeft + i * 2}px`;

      const targets = document.querySelectorAll('.letter, .btn');
      targets.forEach((target) => {
        const rect1 = bullet.getBoundingClientRect();
        const rect2 = target.getBoundingClientRect();

        if (
          rect1.top < rect2.bottom &&
          rect1.bottom > rect2.top &&
          rect1.left < rect2.right &&
          rect1.right > rect2.left &&
          window.getComputedStyle(target).opacity !== "0"
        ) {
          hitSound.currentTime = 0;
          hitSound.play();

          gsap.to(target, {
            y: 300,
            rotation: 180,
            opacity: 0,
            duration: 1.2,
            ease: "bounce.out",
          });
          bullet.remove();
          clearInterval(interval);

          const allGone = [...targets].every(t => window.getComputedStyle(t).opacity === "0");
          if (allGone) {
            setTimeout(() => window.location.href = "projetos.html", 1000);
          }
        }
      });

      if (bullet.offsetTop < 0 || bullet.offsetLeft < 0 || bullet.offsetLeft > window.innerWidth) {
        bullet.remove();
        clearInterval(interval);
      }
    }, 20);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') airplaneX -= speed;
  if (e.code === 'ArrowRight') airplaneX += speed;
  if (e.code === 'ArrowUp') airplaneY -= speed;
  if (e.code === 'ArrowDown') airplaneY += speed;
  if (e.code === 'Space') shoot();
  updateAirplanePosition();
});

document.addEventListener('click', shoot);

document.addEventListener('mousemove', (e) => {
  airplaneX = e.clientX - 30;
  updateAirplanePosition();
});

updateAirplanePosition();
