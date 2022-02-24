"use strict";
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
function render(grid = lastState()) {
    let rendered = document.createDocumentFragment();
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
        rendered.appendChild(span);
    }
    let gameSpace = document.getElementById("playGround");
    gameSpace.replaceChildren(rendered);
}
// Checks click location and moves if movable
function handleClick(e, grid = lastState()) {
    let selId = parseInt(e.currentTarget.id);
    let indexOfSel = grid.indexOf(selId);
    let movability = isMovable(indexOfSel);
    //Confirm move: create new history that
    //will be changed and rendered
    if (movability) {
        setState([...lastState()]);
        finishMove(indexOfSel, movability);
        render();
    }
}
// Will recursively move pieces to the empty space.
function finishMove(selPos, direction, grid = lastState()) {
    let destPos = selPos + (moveBy(direction));
    // If it has not found the current empty position,
    // Swap the next movable in line with the next one
    // Until the empty space is actually swapped 
    if (destPos != grid.indexOf(0)) {
        finishMove(destPos, direction);
    }
    [grid[selPos], grid[destPos]] = [grid[destPos], grid[selPos]];
}
function undo() {
    gameState.pop();
    render();
}
function start() {
    let undoBtn = document.getElementById("undo");
    undoBtn.onclick = undo;
    let newGame = generate();
    setState(newGame);
    render();
}
start();
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
function isMovable(selPos, grid = gameState[gameState.length - 1]) {
    let pivotPos = grid.indexOf(0);
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
function moveBy(direction) {
    switch (direction) {
        case "up":
            return -GAME_WIDTH;
        case "down":
            return GAME_WIDTH;
        case "left":
            return -1;
        case "right":
            return 1;
        default:
            return 0;
    }
}
function lastState() {
    return gameState[gameState.length - 1];
}
// function getNextMovable(grid: Grid) {}
