const GAME_WIDTH = 4;
const GAME_SIZE = GAME_WIDTH * GAME_WIDTH;
let gameState = [];
/*GAME SETUP ***************************************/
function generate() {
    //Generate beads 0-15
    let beadSequence = [];
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
        span.id = `${i}`;
        let newBead = {
            span: span,
            id: i,
            movable: null,
            position: i,
        };
        beadSequence.push(newBead);
    }
    return beadSequence;
}
function shuffleBeads(beadSequence) {
    let shuffledGrid = [];
    for (let i = 0; i < GAME_SIZE; i++) {
        let randomIndex = randomInRange(0, beadSequence.length);
        shuffledGrid.push(beadSequence.splice(randomIndex, 1)[0]);
    }
    return shuffledGrid;
}
function renderAndSetState(grid) {
    let gridSpace = document.getElementById("playGround");
    let newGrid = markMovables(grid);
    if (gridSpace != null) {
        gridSpace.innerHTML = "";
        //Saves the exact order that is printed
        for (let i = 0; i < newGrid.length; i++) {
            gridSpace.appendChild(newGrid[i].span);
            newGrid[i].position = i;
        }
    }
    gameState.push(newGrid);
}
function newGame() {
    let game = shuffleBeads(generate());
    renderAndSetState(game);
    console.log("Started new game");
}
/*DYNAMICS *****************************************/
function markMovables(grid) {
    grid.forEach((_, beadIndex, origGrid) => {
        origGrid[beadIndex].movable = null;
        origGrid[beadIndex].span.draggable = false;
        origGrid[beadIndex].span.onclick = null;
    });
    let pivotPos = findBeadIndex(0, grid);
    /**Loops aim directly at the numerically correct positions*/
    for (let i = pivotPos + GAME_WIDTH; i < GAME_SIZE; i += GAME_WIDTH) {
        grid[i].movable = "up";
        grid[i].span.draggable = true;
        grid[i].span.onclick = clickHandler;
    }
    for (let i = pivotPos - GAME_WIDTH; i >= 0; i -= GAME_WIDTH) {
        grid[i].movable = "down";
        grid[i].span.draggable = true;
        grid[i].span.onclick = clickHandler;
    }
    let pivotCol = pivotPos % GAME_WIDTH;
    let limitLeft = pivotPos - pivotCol;
    let limitRight = pivotPos + (GAME_WIDTH - pivotCol);
    for (let i = pivotPos - 1; i >= limitLeft; i--) {
        grid[i].movable = "right";
        grid[i].span.draggable = true;
        grid[i].span.onclick = clickHandler;
    }
    for (let i = pivotPos + 1; i < limitRight; i++) {
        grid[i].movable = "left";
        grid[i].span.draggable = true;
        grid[i].span.onclick = clickHandler;
    }
    return grid;
}
function clickHandler(e) {
    let grid = gameState[gameState.length - 1];
    let targetBead = grid.find((bead) => {
        if (e.currentTarget != null) {
            return bead.id == parseInt(e.currentTarget.id);
        }
    });
    let movingTogether;
    movingTogether = grid.filter((bead) => {
        if (targetBead.movable == bead.movable) {
            switch (bead.movable) {
                case "up":
                    if (bead.position <= targetBead.position)
                        return true;
                    break;
                case "left":
                    if (bead.position <= targetBead.position)
                        return true;
                    break;
                case "down":
                    if (bead.position >= targetBead.position)
                        return true;
                    break;
                case "right":
                    if (bead.position >= targetBead.position)
                        return true;
                    break;
            }
        }
        else
            return false;
    });
    finishMove(movingTogether, grid);
}
//Does the reordering of elements.
//Position-writing still happening at renderAndSetState
function finishMove(beadsToMove, grid) {
    //stores pivot and moves list of moveables to its position
    let pivot = grid[findBeadIndex(0, grid)];
    switch (beadsToMove[0].movable) {
        case "up":
            for (let i = 0; i < beadsToMove.length; i++) {
                grid[pivot.position + i * GAME_WIDTH] = beadsToMove[i];
                grid[beadsToMove[i].position] = pivot;
            }
            break;
        case "left":
            for (let i = 0; i < beadsToMove.length; i++) {
                grid[pivot.position + i] = beadsToMove[i];
                grid[beadsToMove[i].position] = pivot;
            }
            break;
        case "down":
            beadsToMove.reverse();
            for (let i = 0; i < beadsToMove.length; i++) {
                grid[pivot.position - i * GAME_WIDTH] = beadsToMove[i];
                grid[beadsToMove[i].position] = pivot;
            }
            break;
        case "right":
            beadsToMove.reverse();
            for (let i = 0; i < beadsToMove.length; i++) {
                grid[pivot.position - i] = beadsToMove[i];
                grid[beadsToMove[i].position] = pivot;
            }
            break;
    }
    renderAndSetState(grid);
}
/*STARTING POINT **********************************/
newGame();
/*HELPERS *****************************************/
//Returns in [min,max)
function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function findBeadIndex(id, grid) {
    return grid.findIndex(function (bead) {
        return bead.id == id;
    });
}
// function dispatchBeadEvent(e: Event) {
//   let beadNumber = e.currentTarget as HTMLElement
//   document.getElementById(beadNumber.innerHTML).dispatchEvent("click")
// }
// function executeInDirection(bead, direction, callback)
// Should solve repetition of switch/case
