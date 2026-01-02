const difficulty = document.querySelector("#difficulty");
const inputbox = document.querySelector("#inputBox");
const guessBtn = document.querySelector("#guessBtn");
const resetBtn = document.querySelector("#reset");
let messagePara = document.querySelector("#message");
let attemptsPara = document.querySelector("#attempts");
let historyPara = document.querySelector("#history");

let gameState = {
    attempts: null,
    randomVal: null,
    isGameOver: false,
    guessArray: [],
    min: 1,
    max: null,
}
function gameInit() {
    gameState.isGameOver = false;
    gameState.guessArray = [];
    gameState.randomVal = getRandomNumber();
    inputbox.value = "";

    updateUI();
    messagePara.textContent = `The Game is started guess the number `;
    guessBtn.disabled = false;
    inputbox.disabled = false;
}
function getRandomNumber() {
    if (difficulty.value === "easy") {
        gameState.attempts = 10,
        gameState.max = 50;
    }
    else if (difficulty.value === "medium") {
        gameState.attempts = 7,
        gameState.max = 100;
    }
    else {
        gameState.attempts = 5,
        gameState.max = 200;
    }
    return Math.floor((Math.random() * (gameState.max - gameState.min + 1) + gameState.min))
}
function updateUI() {
    attemptsPara.textContent = `You have ${gameState.attempts} attempts left`;
    historyPara.textContent = ` Your guesses are :- ${gameState.guessArray.join(" , ")}`;
}
function handleGuess() {
    const guessVal = Number(inputbox.value);
    inputbox.value = "";

    if (!isValideInput(guessVal)) {
        messagePara.textContent = `Input is invalide, please select a number between ${gameState.min} to ${gameState.max}`;
        return;
    }
    playGame(guessVal)
}
function isValideInput(number) {
    if (Number.isNaN(number) || number > gameState.max || number < gameState.min) return false
    return true;
}
function playGame(guessVal) {
    if (gameState.guessArray.includes(guessVal)) {
        messagePara.textContent = `You have already guess this number`;
        return;
    }
    gameState.guessArray.push(guessVal);
    gameState.attempts--;
    if (guessVal === gameState.randomVal) {
        messagePara.textContent = `You won the Game`;
        updateUI();
        gameOver();
        return;
    }
    messagePara.textContent = guessVal > gameState.randomVal ? "Too high" : "too Low";

    if(gameState.attempts === 0 ){
        messagePara.textContent = `Game over, Number was ${gameState.randomVal}`
        gameOver();   
    }
    updateUI()
}
function gameOver() {
    gameState.isGameOver = true;
    guessBtn.disabled = true;
    inputbox.disabled = true;
}
gameInit();
difficulty.addEventListener("change", gameInit);
guessBtn.addEventListener("click",handleGuess);
resetBtn.addEventListener("click",gameInit)
