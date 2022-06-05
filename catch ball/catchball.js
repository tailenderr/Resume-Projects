const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const messageElement = document.getElementById("message");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let numberOfBalls = 20;
const delay = 5000;
let count = 3;
const resetElement = document.getElementById("reset");
// window.addEventListener("resize", () => {});
const basket = {
  x: null,
  y: null,
  draw: function () {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  },
};
canvas.addEventListener("mousemove", (e) => {
  basket.x = e.x;
  basket.y = e.y;
});

function startGame() {
  const buttonElement = document.getElementById("btn");
  buttonElement.style.display = "none";
  const timeId = setInterval(() => {
    // console.log("coutnt");
    if (count > 0) {
      messageElement.innerHTML = `Don't just wait try to catch the ball! ${count}`;
      count--;
    } else {
      messageElement.innerHTML = "";
      clearInterval(timeId);
    }
  }, 1000);
  const timeoutId = setTimeout(() => {
    generateParticle();
    // console.log("yes");
    clearTimeout(timeoutId);
  }, delay);
}
function generateParticle() {
  for (let i = 0; i < numberOfBalls; i++) {
    particleArray.push(new Particles());
  }
  animate();
}
function handle() {
  for (let i = 0; i < numberOfBalls; i++) {
    particleArray[i].draw();
    particleArray[i].update(i);
  }
}

const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const bgColor = "#" + randomColor;
  if (bgColor !== "#000000") {
    return bgColor;
  } else {
    setBg();
  }
};

class Particles {
  constructor() {
    this.x = Math.random() * (canvas.width / 1.2) + 50;
    this.y = Math.random() * (canvas.height / 1.2) + 50;
    this.color = setBg();
    this.size = Math.random() * 20 + 10;
    this.speedX = Math.random() * 12 - 5;
    this.speedY = Math.random() * 12 - 5;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
  update(i) {
    if (
      (this.x - basket.x <= 0.15 && this.x - basket.x >= 0) ||
      (this.y - basket.y <= 0.15 && this.y - basket.y >= 0)
    ) {
      particleArray.splice(i, 1);
      numberOfBalls--;
    }

    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x + this.speedX > canvas.width || this.x + this.speedX < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.speedY > canvas.height || this.y + this.speedY < 0) {
      this.speedY = -this.speedY;
    }
  }
}
function animate() {
  if (numberOfBalls != 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handle();
    basket.draw();

    requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resetElement.style.display = "inline-block";
  }
}
function resetGame() {
  resetElement.style.display = "none";
  location.reload();
}
