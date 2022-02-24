const GAME_WIDTH = 4;
const GAME_SIZE = GAME_WIDTH * GAME_WIDTH;

type Grid = Array<number>;
type PossibleMove = "up" | "down" | "left" | "right" | null;

type GameState = Array<Grid>;
let gameState: GameState = [];

type Bead = HTMLSpanElement & {
  id: number;
  childElementCount: 0 | 1;
  classList: "position" | "bead position";
  onclick: Function;
}

function generate(): Grid {
  let beadSequence: Grid = [];
  for (let i = 0; i < GAME_SIZE; i++) {
    beadSequence.push(i);
  }
  return shuffle(beadSequence);
}

// Creates spans and sets div#playGround
function render(grid: Grid = lastState()) {
  let rendered: DocumentFragment = document.createDocumentFragment();
  for (let i = 0; i < grid.length; i++) {
    let span = document.createElement("span");
    let h2 = document.createElement("h2");
    //grid[i] == 0 is always empty space
    if (grid[i]) {
      h2.innerText = `${grid[i]}`;
      span.classList.add("bead");
    }
    span.appendChild(h2);
    span.classList.add("position");
    span.id = `${grid[i]}`;
    span.onclick = handleClick;
    rendered.appendChild(span as Bead);
  }
  let gameSpace = document.getElementById("playGround") as HTMLElement;
  gameSpace.replaceChildren(rendered);
}

// Checks click location and moves if movable
function handleClick(e: any, grid: Grid = lastState()) {
  let selId = parseInt(e.currentTarget.id);
  let indexOfSel = grid.indexOf(selId);
  let movability = isMovable(indexOfSel);
  
  //Confirm move: create new history that
  //will be changed and rendered
  if(movability) {
    setState([...lastState()])
    finishMove(indexOfSel, movability)
    render();
  }
}

// Will recursively move pieces to the empty space.
function finishMove(
  selPos: number,
  direction: PossibleMove,
  grid: Grid = lastState()
) {
  let destPos: number = selPos+(moveBy(direction))
  // If it has not found the current empty position,
  // Swap the next movable in line with the next one
  // Until the empty space is actually swapped 
  if(destPos != grid.indexOf(0)) {
    finishMove(destPos, direction);
  }
  [grid[selPos], grid[destPos]] = [grid[destPos], grid[selPos]]
}

function undo(){
  gameState.pop();
  render();
}

function start() {
  let undoBtn = document.getElementById("undo") as HTMLElement;
  undoBtn.onclick = undo;
  
  let newGame = generate();
  setState(newGame);
  render();
}

start();


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
  selPos: number,
  grid: Grid = gameState[gameState.length - 1]
): PossibleMove {
  let pivotPos = grid.indexOf(0);
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

function moveBy(direction: PossibleMove) {
  switch(direction) {
    case "up":
      return -GAME_WIDTH;
    case "down":
      return GAME_WIDTH;
    case "left":
      return -1;
    case "right":
      return 1
    default:
      return 0;
  }
}

function lastState() {
  return gameState[gameState.length - 1]
}
// function getNextMovable(grid: Grid) {}
