"use strict";
const GAME_SIZE = 16;
let gameState = [];
function generate() {
    //Generate beads 0-15
    let beadSequence = [];
    for (let i = 0; i < GAME_SIZE; i++) {
        let span = document.createElement("span");
        //0 is always empty space
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
    let gridSpace = document.getElementById("grid");
    if (gridSpace != null) {
        gridSpace.innerHTML = '';
        for (let i = 0; i < GAME_SIZE; i++) {
            console.log(i);
            gridSpace === null || gridSpace === void 0 ? void 0 : gridSpace.appendChild(grid[i].span);
        }
    }
}
function newGame() {
    render(shuffleBeads(generate()));
}
/*Helpers*/
//Returns in [min,max)
function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
