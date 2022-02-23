const GAME_WIDTH = 4;
const GAME_SIZE = GAME_WIDTH * GAME_WIDTH;

type Grid = Array<number>;
type PossibleMove = "up" | "down" | "left" | "right" | null;

type GameState = Array<Grid>;
let gameState = [];

function generate(): Grid {
  let beadSequence: Grid = [];
  for (let i = 0; i < GAME_SIZE; i++) {
    beadSequence.push(i);
  }
  return shuffle(beadSequence);
}

// Creates spans and sets div#playGround
function render(grid: Grid) {
  let rendered: DocumentFragment = document.createDocumentFragment();
  for (let i = 0; i < grid.length; i++) {
    let span = document.createElement("span");
    //grid[i] == 0 is always empty space
    if (grid[i]) {
      let h2 = document.createElement("h2");
      h2.innerText = `${grid[i]}`;
      span.appendChild(h2);
      span.classList.add("bead");
    }
    span.classList.add("position");
    span.id = `${grid[i]}`;
    span.onclick = handleClick;
    rendered.appendChild(span);
  }
  let gameSpace = document.getElementById("playGround");
  gameSpace.replaceChildren(rendered);
}

function handleClick(e) {
  let targetId = parseInt(e.currentTarget.id);
  console.log(isMovable(targetId));
}

function finishMove() {}

let newGame = generate();
setState(newGame);
render(newGame);


/*HELPERS *****************************************/
//Returns in [min,max)
function randomInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(array: Grid) {
  let shuffledGrid: Grid = [];
  for (let i = 0; i < GAME_SIZE; i++) {
    let randomIndex = randomInRange(0, array.length);
    shuffledGrid.push(array.splice(randomIndex, 1)[0]);
  }
  return shuffledGrid;
}

function setState(grid: Grid) {
  gameState.push(grid);
}

function isMovable(
  selected: number,
  grid: Grid = gameState[gameState.length - 1]
): PossibleMove {
  let pivotPos = grid.indexOf(0);
  let selPos = grid.indexOf(selected);
  let sameCol =
    Math.floor(pivotPos % GAME_WIDTH) == Math.floor(selPos % GAME_WIDTH);
  let sameRow =
    Math.floor(pivotPos / GAME_WIDTH) == Math.floor(selPos / GAME_WIDTH);

  if (sameCol) {
    return selPos > pivotPos ? "up" : "down";
  } else if (sameRow) {
    return selPos > pivotPos ? "left" : "right";
  } else return null;
}

function getNextMovable(grid: Grid) {}
