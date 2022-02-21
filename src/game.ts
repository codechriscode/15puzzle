const GAME_WIDTH = 4;
const GAME_SIZE = GAME_WIDTH * GAME_WIDTH;

type PossibleMove = "up" | "down" | "left" | "right" | null;

type Bead = {
  span: HTMLSpanElement;
  id: number;
  moveable: PossibleMove;
};

type Grid = Array<Bead>;

type GameState = Array<Grid>;
let gameState: GameState = [];

function generate(): Grid {
  //Generate beads 0-15
  let beadSequence: Grid = [];

  for (let i = 0; i < GAME_SIZE; i++) {
    let span = document.createElement("span");
    //i = 0 is always empty space
    if (i) {
      let h2 = document.createElement("h2");
      h2.innerText = `${i}`;
      span.appendChild(h2);
      span.classList.add("bead");
    }
    span.classList.add("position");
    span.id=`${i}`;
    span.ondrag=(getMoving);

    let newBead: Bead = {
      span: span,
      id: i,
      moveable: null,
    };
    beadSequence.push(newBead);
  }

  return beadSequence;
}

function shuffleBeads(beadSequence: Grid): Grid {
  let shuffledGrid: Grid = [];
  for (let i = 0; i < GAME_SIZE; i++) {
    let randomIndex = randomInRange(0, beadSequence.length);
    shuffledGrid.push(beadSequence.splice(randomIndex, 1)[0]);
  }
  return shuffledGrid;
}

function render(grid: Grid): void {
  let gridSpace = document.getElementById("playGround");
  if (gridSpace != null) {
    gridSpace.innerHTML = "";
    for (let i = 0; i < GAME_SIZE; i++) {
      gridSpace.appendChild(grid[i].span);
    }
  }
}

function newGame() {
  let game = markMoveables(shuffleBeads(generate()));
  render(game);
  gameState.push(game);
  console.log("Started new game");
}

function markMoveables(grid: Grid) {
  grid.forEach((bead) => {
    bead.moveable = null
    bead.span.draggable = false
  })

  let pivotPos = grid.findIndex(function (bead) {
    return bead.id == 0;
  });

  for (let i = pivotPos + GAME_WIDTH; i < GAME_SIZE; i += GAME_WIDTH) {
    grid[i].moveable = "up";
    grid[i].span.draggable = true;
  }

  for (let i = pivotPos - GAME_WIDTH; i >= 0; i -= GAME_WIDTH) {
    grid[i].moveable = "down";
    grid[i].span.draggable = true;
  }

  let pivotCol = pivotPos % GAME_WIDTH;
  let limitLeft = pivotPos - pivotCol;
  let limitRight = pivotPos + (4 - pivotCol);
  for (let i = pivotPos - 1; i >= limitLeft; i--) {
    grid[i].moveable = "right";
    grid[i].span.draggable = true;
  }

  for (let i = pivotPos + 1; i < limitRight; i++) {
    grid[i].moveable = "left";
    grid[i].span.draggable = true;
  }

  return grid;
}

type BeadEvent = DragEvent & { target: {id: string }}

function getMoving(this: any, e: BeadEvent) {
  let grid = gameState[-1];
  let targetInGrid = grid.find((bead) => {
    if(e.target != null) { return bead.id == parseInt(e.target.id) }
  }) as Bead;

  if(targetInGrid != undefined){
    let movingToo = grid.filter((bead) => {
      // let numericMatch = 
      // switch (bead.moveable){
      //   case "up":
      //     if(bead.id < targetInGrid.id) return true;
      //     break;
      //   case "down":
      //     if(bead.id < targetInGrid.id) return true;
      // }
    })
  }
}

function finishMove() {
  
}
function main(){
  newGame();
  while(true){
    //get moves
    //update state & render
    //check victory
    //if victory, alert and break
  }
}


//main();
newGame();


/*Helpers*/
//Returns in [min,max)
function randomInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

