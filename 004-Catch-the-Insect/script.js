const playButton = document.getElementById("play-btn");
const selectContainer = document.querySelector(".select-container");
const gameInterface = document.querySelector(".game-interface");
let score = 0;
let highscore = 0;
let time = 0;
let selectedBug = "";

const currentHighScore = localStorage.getItem("BugGameHighscore");
console.log(currentHighScore);
if(currentHighScore == null) {
    localStorage.setItem("BugGameHighScore", 0);
}

async function easeInOut(elementOut, elementIn, fadeTime) {

    return new Promise(resolve => {
        elementOut.classList.toggle("fade");
        setTimeout(() => {
            elementOut.style.display = "none";
            toggleFade(elementIn);
        }, fadeTime);
    
        function toggleFade(elemIn) {
            elemIn.style.display = "flex";
            setTimeout(() => {
                elemIn.classList.toggle("fade");
                resolve();
            }, fadeTime);
        }
    })



}

playButton.addEventListener("click", () => {
    const playContainer = playButton.parentElement;
    easeInOut(playContainer, selectContainer, 100)
    console.log(selectContainer);
    
})



async function play() {
    await easeInOut(selectContainer, gameInterface, 100);
    highscore = localStorage.getItem("BugGameHighscore");
    setInterval(() => {
        time++;
        const timer = document.getElementById("timer");
        
    document.getElementById("highscore").textContent = `Highscore: ${localStorage.getItem("BugGameHighscore")}`;
        timer.textContent = `Timer: ${time}`
    }, 1000)

    
    spawnBug();
}

function handleBugSelect(e) {
    const bugName = e.target.src;
    selectedBug += bugName;
    play();
}

function handleBugScore(e) {
    score++;

    if(score > highscore) {
        highscore = score;
        document.getElementById("highscore").textContent = `Highscore: ${highscore}`;
        localStorage.setItem("BugGameHighscore", highscore);
        console.log("local storage:");
        console.log( localStorage.getItem("BugGameHighscore") );
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    console.log(e.target);
    e.target.classList.add("killed-bug");

    setTimeout(() => e.target.remove(), 500)
    
}

const bugs = document.querySelectorAll(".select-container .card img");
bugs.forEach(bug => {
    bug.addEventListener("click", handleBugSelect);
})

function createBug(x, y) {
    const div = document.createElement("div");
    div.classList.add("spawned-bug");
    div.style.top = `${y}px`;   
    div.style.left = `${x}px`;  
    div.addEventListener("click", handleBugScore);

    const newBug = document.createElement("img");
    newBug.src = selectedBug;
    
    div.appendChild(newBug);
    return div;
}

function spawnBug() {

    const playableArea = document.querySelector(".playable-area");
    console.log(playableArea);
    let width = playableArea.clientWidth;
    let height = playableArea.clientHeight;
    let x = Math.floor( Math.random() * (width - 100) ) + 100 ;
    let y = Math.floor( Math.random() * (height - 100) );
    const newBug = createBug(x, y);

    
    const randSpawn = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
    const randRemove = Math.floor(Math.random() * (10 - 1 + 1) ) + 1;
    
    // between 1 and 10 seconds
    setTimeout(() => {
        newBug.remove();
    }, randRemove * 1000)

    playableArea.appendChild(newBug);

    // between 0.5 and 1 seconds
    setTimeout(spawnBug, randSpawn * 500);
}

