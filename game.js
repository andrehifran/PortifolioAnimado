
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let keys = {};
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let bullets = [];
let targets = [];
let destroyedCount = 0;
let totalTargets = 0;

const shootSound = document.getElementById('shootSound');
const hitSound = document.getElementById('hitSound');

const plane = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 60,
    height: 60,
    speed: 5,
    update() {
        // Movimentação por teclado
        if (keys['ArrowLeft']) this.x -= this.speed;
        if (keys['ArrowRight']) this.x += this.speed;
        if (keys['ArrowUp']) this.y -= this.speed;
        if (keys['ArrowDown']) this.y += this.speed;

        // Movimentação por mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        this.x += dx * 0.05;
        this.y += dy * 0.05;
    },
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
};

function shoot() {
    shootSound.currentTime = 0;
    shootSound.play();
    [-20, 0, 20].forEach(offset => {
        bullets.push({ x: plane.x + offset, y: plane.y, radius: 5 });
    });
}

function spawnTargets() {
    const labels = ['A', 'n', 'd', 'r', 'e', ' ', 'H', 'i', 'f', 'r', 'a', 'n', 'LinkedIn', 'GitHub', 'Email'];
    totalTargets = labels.length;
    labels.forEach((label, index) => {
        targets.push({
            text: label,
            x: 100 + index * 80,
            y: 100,
            radius: 25,
            hit: false,
            dy: 2 + Math.random() * 2
        });
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plane.update();
    plane.draw();

    bullets.forEach((b, i) => {
        b.y -= 10;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        if (b.y < 0) bullets.splice(i, 1);
    });

    targets.forEach((t, i) => {
        if (!t.hit) {
            ctx.fillStyle = 'white';
            ctx.font = "24px Arial";
            ctx.fillText(t.text, t.x, t.y);
            t.y += t.dy;

            bullets.forEach((b, j) => {
                const dx = b.x - t.x;
                const dy = b.y - t.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < t.radius) {
                    hitSound.currentTime = 0;
                    hitSound.play();
                    t.hit = true;
                    destroyedCount++;
                    bullets.splice(j, 1);
                }
            });
        } else {
            t.y += t.dy;
            ctx.fillStyle = 'gray';
            ctx.font = "24px Arial";
            ctx.fillText(t.text, t.x, t.y);
        }
    });

    if (destroyedCount === totalTargets) {
        ctx.fillStyle = "lime";
        ctx.font = "30px Arial";
        ctx.fillText("Parabéns!! Você ganhou, venha visitar os meus projetos", canvas.width/2 - 300, canvas.height/2);
        setTimeout(() => window.location.href = "projetos.html", 3000);
    }

    requestAnimationFrame(update);
}

window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === ' ' || e.key === 'Spacebar') shoot();
});

window.addEventListener('keyup', e => keys[e.key] = false);
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('click', shoot);

spawnTargets();
update();
