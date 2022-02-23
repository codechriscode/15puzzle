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
// Creates spans and resets playGround
function render(grid) {
    let rendered = document.createElement("div");
    rendered.classList.add("container");
    rendered.id = "playGround";
    for (let i = 0; i < grid.length; i++) {
        let span = document.createElement("span");
        //i = 0 is always empty space
        if (grid[i]) {
            let h2 = document.createElement("h2");
            h2.innerText = `${grid[i]}`;
            span.appendChild(h2);
            span.classList.add("bead");
        }
        span.classList.add("position");
        span.id = `${grid[i]}`;
        rendered.appendChild(span);
    }
    console.log(rendered);
    let gameSpace = document.getElementById("playGround");
    gameSpace.innerHTML = rendered.innerHTML;
}
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
function setSate(grid) {
}
render(generate());
