let attemptsPara = document.querySelector("#attempts");
let messagePara = document.querySelector("#message");
let historyPara = document.querySelector("#history");
const inputbox = document.querySelector("#inputBox");
const guessBtn = document.querySelector("#guessBtn");
const resetBtn = document.querySelector("#reset");

let gameState ={
    attempts : 5,
    isGameOver : false,
    guessVals : [],
    randomVal : null,
}
const initGame =()=>{
    gameState.attempts = 5;
    gameState.isGameOver = false;
    gameState.randomVal = getRandomNumber(1,50);
    gameState.guessVals = []

    updateUI()
    inputbox.disabled = false
    guessBtn.disabled = false
    messagePara.textContent = `The Game is started guess a number between 1 to 50`;
}
function getRandomNumber(min ,max){
    return Math.floor((Math.random()*(max - min +1)+min));
}
function updateUI(){
    attemptsPara.textContent = `You have ${gameState.attempts} attempts left`;
    historyPara.textContent = ` Your guesses are :- ${gameState.guessVals.join(" ,")}`;
}
function handleGuess() {
    if(gameState.isGameOver)return

    const guessval = Number(inputbox.value);
    inputbox.value ="";
    if(!isValideInput(guessval, 1, 50)){
        messagePara.textContent = `Invalide Input, please guess a number between 1 to 50 `;
        return;
    }
    playGame(guessval)
}
function isValideInput(num , min, max){
    if(Number.isNaN(num) || num < min|| num > max) return false
    return true
}
function playGame(guessVal){
    if(gameState.guessVals.includes(guessVal)){
        messagePara.textContent =`You have already guess this number`
        return;
    }
    gameState.guessVals.push(guessVal);
    if(guessVal === gameState.randomVal){
        messagePara.textContent =`You won `;
        updateUI();
        endGame();
        return;
    }
    updateUI()
    gameState.attempts--;

    messagePara.textContent = guessVal > gameState.randomVal? "Too high" : "Too Low";

    if(gameState.attempts === 0){
        messagePara.textContent = `Game over , Number was ${gameState.randomVal}`;
        endGame()
    }
    updateUI();
}
function endGame(){
    gameState.isGameOver = true;
    inputbox.disabled = true;
    guessBtn.disabled = true;
}
initGame();
guessBtn.addEventListener("click",handleGuess);
resetBtn.addEventListener("click",initGame);