"use strict";
const GAME_WIDTH = 4;
const GAME_SIZE = GAME_WIDTH * GAME_WIDTH;
let gameState = [];
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
        let newBead = {
            span: span,
            id: i,
            moveable: null,
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
function render(grid) {
    let gridSpace = document.getElementById("playGround");
    if (gridSpace != null) {
        gridSpace.innerHTML = "";
        for (let i = 0; i < GAME_SIZE; i++) {
            gridSpace.appendChild(grid[i].span);
        }
    }
}
function newGame() {
    render(shuffleBeads(generate()));
}
function markMoveables(grid) {
    let pivotPos = grid.findIndex(function (bead) {
        return bead.id == 0;
    });
    console.log(`pivotPos: ${pivotPos}`);
    for (let i = pivotPos + GAME_WIDTH; i < GAME_SIZE; i += GAME_WIDTH) {
        console.log(`movable up: ${i}`);
        if (i < 16) {
            console.log(grid);
        }
        grid[i].moveable = "up";
    }
    for (let i = pivotPos - GAME_WIDTH; i > 0; i -= GAME_WIDTH) {
        console.log(`movable down: ${i}`);
        grid[i].moveable = "down";
    }
    let pivotCol = pivotPos % GAME_WIDTH;
    let limitLeft = pivotPos - pivotCol;
    let limitRight = pivotPos + (4 - pivotCol);
    console.log(`limits: ${limitLeft} ${limitRight}, pivotCol: ${pivotCol}`);
    for (let i = pivotPos - 1; i > limitLeft; i--) {
        grid[i].moveable = "right";
    }
    for (let i = pivotPos + 1; i < limitRight; i++) {
        grid[i].moveable = "left";
    }
}
function move() { }
function finishMove() { }
/*Helpers*/
//Returns in [min,max)
function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
