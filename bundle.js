const GAME_WIDTH = 4;
const GAME_SIZE = GAME_WIDTH * GAME_WIDTH;
let gameState = [];
function generate() {
    let beadSequence = [];
    for (let i = 0; i < GAME_SIZE; i++) {
        beadSequence.push(i);
    }
    return shuffle(beadSequence);
}
// Creates spans and sets div#playGround
function render(grid) {
    let rendered = document.createDocumentFragment();
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
function finishMove() { }
let newGame = generate();
setState(newGame);
render(newGame);
/*HELPERS *****************************************/
//Returns in [min,max)
function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function shuffle(array) {
    let shuffledGrid = [];
    for (let i = 0; i < GAME_SIZE; i++) {
        let randomIndex = randomInRange(0, array.length);
        shuffledGrid.push(array.splice(randomIndex, 1)[0]);
    }
    return shuffledGrid;
}
function setState(grid) {
    gameState.push(grid);
}
function isMovable(selected, grid = gameState[gameState.length - 1]) {
    let pivotPos = grid.indexOf(0);
    let selPos = grid.indexOf(selected);
    let sameCol = Math.floor(pivotPos % GAME_WIDTH) == Math.floor(selPos % GAME_WIDTH);
    let sameRow = Math.floor(pivotPos / GAME_WIDTH) == Math.floor(selPos / GAME_WIDTH);
    if (sameCol) {
        return selPos > pivotPos ? "up" : "down";
    }
    else if (sameRow) {
        return selPos > pivotPos ? "left" : "right";
    }
    else
        return null;
}
function getNextMovable(grid) { }
