const GAME_SIZE = 16;

type PossibleMove = "up" | "down" | "left" | "right" | null;

type Bead = {
  span: HTMLSpanElement;
  id: number;
  moveable: PossibleMove;
}

type Grid = Array<Bead>

type GameState = Array<Grid>
let gameState: GameState = [];

function generate(): Grid {
  //Generate beads 0-15
  let beadSequence: Grid = [];
  for(let i=0; i<GAME_SIZE; i++) {

    let span = document.createElement("span");
    //0 is always empty space
    if(i) {
      let h2 = document.createElement("h2");
      h2.innerText = `${i}`
      span.appendChild(h2);
      span.classList.add("bead");
    }
    span.classList.add("position");

    let newBead: Bead = {
      span: span,
      id: i,
      moveable: null,
    }

    beadSequence.push(newBead);
  }

  return beadSequence;
}

function shuffleBeads(beadSequence: Grid): Grid {
  let shuffledGrid: Grid = [];
  for(let i=0; i<GAME_SIZE; i++){
    let randomIndex = randomInRange(0,beadSequence.length);
    shuffledGrid.push(beadSequence.splice(randomIndex,1)[0]);
  }
  return shuffledGrid;
}

function render(grid: Grid): void {
  let gridSpace = document.getElementById("grid");
  if(gridSpace != null) {
    gridSpace.innerHTML = '';
    for(let i=0; i<GAME_SIZE; i++){
      console.log(i)
      gridSpace?.appendChild(grid[i].span);
    }
  }
}

function newGame() {
  render(shuffleBeads(generate()));
}


/*Helpers*/
//Returns in [min,max)
function randomInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

