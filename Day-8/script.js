const difficulty = document.querySelector("#difficulty");
const inputBox = document.querySelector("#inputBox");
const guessBtn = document.querySelector("#guessBtn");
const resetBtn = document.querySelector("#reset");
const messagePara = document.querySelector("#message");
const attemptPara = document.querySelector("#attempts");
const historyPara = document.querySelector("#history");

let gameState ={
    attempts : null,
    guessArray : [],
    isGameOver : false,
    min : 1,
    max: null,
    randomVal : null,
}
function initGame() {
    if (difficulty.value === "easy") {
        gameState.attempts = 10;
        gameState.max = 50;
    }
    else if(difficulty.value === "medium"){
        gameState.attempts = 7;
        gameState.max = 100;
    }
    else{
        gameState.attempts = 5;
        gameState.max = 200;
    }

    gameState.randomVal = getRandomVal();
    gameState.guessArray = [];
    gameState.isGameOver = false;
    difficulty.disabled = true;
    messagePara.textContent = `The Game is Started Guess a number between ${gameState.min } to ${gameState.max}`;
    renderUI();
}
function getRandomVal() {
    return Math.floor((Math.random()*(gameState.max - gameState.min + 1)+gameState.min));
}
function renderUI() {
    attemptPara.textContent = `Total Attempts Left :- ${gameState.attempts}`;
    historyPara.textContent = `Your guesses are : - ${gameState.guessArray}`;
    inputBox.disabled = gameState.isGameOver;
    guessBtn.disabled = gameState.isGameOver;
    difficulty.disabled = gameState.isGameOver;
}
function handleGuess() {
    if(gameState.isGameOver) return;
    const guessVal = Number(inputBox.value);
    inputBox.value = "";
    if(!isValideInput(guessVal)){
        messagePara.textContent =`Please enter the valide number between ${gameState.min} to ${gameState.max}`;
        return;
    }
    playGame(guessVal)
}
function isValideInput(num) {
    if(Number.isNaN(num) || num > gameState.max || num < gameState.min) return false;
    return true;
}
function playGame(num) {
    if(gameState.guessArray.includes(num)){
        messagePara.textContent = `You have already guess this number`;
        return;
    }
    gameState.guessArray.push(num);
    if(num === gameState.randomVal){
        gameState.isGameOver = true;
        messagePara.textContent = `You Won the Game`;
        renderUI();
        return;
    }
    gameState.attempts--;
    messagePara.textContent = num > gameState.randomVal ? "Too high" :"Too Low";
    renderUI();

    if(gameState.attempts === 0){
        messagePara.textContent = `Game Over , Number was ${gameState.randomVal}`;
        gameState.isGameOver = true;
        renderUI();
    }
}
initGame()
inputBox.addEventListener("keyup",(eve)=>{
    if(eve.key === "Enter"){
        handleGuess();
    }
})
difficulty.addEventListener("change",initGame);
guessBtn.addEventListener("click",handleGuess);
resetBtn.addEventListener("click",()=>{
    difficulty.disabled = false;
    initGame();
});
