const bombs = [];
let gamePoints = 0;
let canPlay = true;
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
const particleArray = [];

const mouse = {
  x: null,
  y: null,
  radius: 150,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.density = Math.random() * 40 + 5;
    this.baseX = this.x;
    this.baseY = this.y;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;

    if (distance < mouse.radius) {
      this.x -= forceDirectionX * force * this.density;
      this.y -= forceDirectionY * force * this.density;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 30;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 30;
      }
    }
  }
}
ctx.fillStyle = "white";
ctx.font = "20px Verdana";
ctx.textAlign = "centre";
ctx.fillText("Bomber-Man", canvas.width / 110, 20);
// ctx.strokeStyle = "white";
// ctx.strokeRect(0, 0, 200, 200);

const textCordinates = ctx.getImageData(0, 0, 240, 240);

function init() {
  for (let a = 0, a2 = textCordinates.height; a < a2; a++) {
    for (let b = 0, b2 = textCordinates.width; b < b2; b++) {
      if (textCordinates.data[b * 4 * textCordinates.width + a * 4 + 3] > 128) {
        let positionX = a;
        let positionY = b;
        particleArray.push(new Particle(positionX * 12, positionY * 12));
      }
    }
  }
}
init();
console.log(particleArray);
function connect() {
  let opacityValue = 1;
  for (let i = 0; i < particleArray.length; i++) {
    for (let j = i; j < particleArray.length; j++) {
      const distanceX = particleArray[i].x - particleArray[j].x;
      const distanceY = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < 40) {
        opacityValue = 1 - distance / 40;
        ctx.strokeStyle = "rgba(255,255,0," + opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  connect();
  requestAnimationFrame(animate);
}
animate();

function showGamePoints() {
  const gamePointsElement = document.getElementById("gamePoints");
  gamePointsElement.style.display = "inline-block";
  gamePointsElement.innerHTML = "Game points :" + gamePoints;
}
function updateGamePoints() {
  if (gamePoints !== 71) {
    const gamePointsElement = document.getElementById("gamePoints");
    gamePointsElement.innerHTML = "Game points :" + gamePoints;
  } else {
    alert("Hurray! You Won");
  }
}

function addGrid() {
  const appElement = document.getElementById("app");
  for (let i = 0; i < 9; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      const column = document.createElement("div");
      column.style.display = "inline-block";
      column.style.width = "60px";
      column.style.height = "60px";
      column.style.textAlign = "center";
      column.style.verticalAlign = "middle";
      column.style.border = "2px solid white";
      column.setAttribute("id", "num" + index);
      column.setAttribute("index", index);
      column.setAttribute("clicked", "no");
      column.addEventListener("click", function () {
        if (canPlay) {
          if (bombs.includes(index)) {
            canPlay = false;
            column.innerHTML = "💣";
            column.style.backgroundColor = "red";
            showBombs();
          } else {
            if (column.getAttribute("clicked") !== "yes") {
              column.style.backgroundColor = "green";
              gamePoints++;
              updateGamePoints();
              column.setAttribute("clicked", "yes");
            }
          }
        }
      });
      row.appendChild(column);
    }
    appElement.appendChild(row);
  }
}
function generateBombs() {
  while (bombs.length !== 10) {
    const randomNum = Math.floor(Math.random() * 100);
    if (randomNum < 81 && !bombs.includes(randomNum)) {
      bombs.push(randomNum);
    }
  }
}
function showBombs() {
  for (let i = 0; i < bombs.length; i++) {
    const show = document.getElementById("num" + bombs[i]);
    show.innerHTML = "💣";
    show.style.backgroundColor = "red";
  }
  alert("Sorry You Lost!");
}
function startAgain() {
  const restartElement = document.getElementById("restart");
  const restartButton = document.createElement("button");
  restartElement.style.display = "inline-block";
  restartButton.innerHTML = "RESTART";
  restartButton.style.backgroundColor = "green";
  restartButton.style.border = "solid 2px black";
  restartButton.style.borderRadius = "10px";
  restartButton.style.width = "110px";
  restartButton.style.height = "35px";
  restartButton.style.marginLeft = "150px";
  restartButton.style.fontSize = "20px";
  restartElement.addEventListener("click", function () {
    location.reload();
  });
  restartElement.appendChild(restartButton);
}
addGrid();
generateBombs();
showGamePoints();
startAgain();
