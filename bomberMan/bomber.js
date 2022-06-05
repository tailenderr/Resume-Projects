const bombs = [];
let gamePoints = 0;
let canPlay = true;
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
    alert("Hurrat! You Won,You Are The King Of Developers");
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
      column.style.border = "1px solid black";
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
  alert("You Lost Loser!");
}
function startAgain() {
  const restartElement = document.getElementById("restart");
  const restartButton = document.createElement("button");
  restartElement.style.display = "inline-block";
  restartButton.innerHTML = "RESTART";
  restartButton.style.backgroundColor = "green";
  restartButton.style.border = "solid 2px black";
  restartButton.style.borderRadius = "4px";
  restartButton.style.width = "130px";
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
