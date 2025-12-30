const guessInput = document.querySelector("#guessInput");
const guessBtn = document.querySelector("#guessBtn");
const messagePara = document.querySelector("#message");
const attemptPara = document.querySelector("#attempts");
const historyPara = document.querySelector("#history");

const getRandomVal = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1) + min));
}
const isValideInput = (num, min, max) => {
    if (Number.isNaN(num) || num > max || num < min) return false;
    return true;
}
let attempts = 5;
const randomVal = getRandomVal(1, 50);
let isGameOver = false;
let GuessVals = [];

guessBtn.addEventListener("click", () => {
    if (isGameOver) return;

    const guessVal = Number(guessInput.value);

    if (!isValideInput(guessVal, 1, 50)) {
        messagePara.textContent = "Invalid input";
        guessInput.value = "";
        return;
    }

    if (GuessVals.includes(guessVal)) {
        messagePara.textContent = "Already guessed";
        guessInput.value = "";
        return;
    }

    GuessVals.push(guessVal);

    if (guessVal === randomVal) {
        messagePara.textContent = "You guessed it right! You won 🎉";
        isGameOver = true;
    } else if (guessVal > randomVal) {
        messagePara.textContent = "Guess is too high";
        attempts--;
    } else {
        messagePara.textContent = "Guess is too low";
        attempts--;
    }

    attemptPara.textContent = `You have ${attempts} attempts left`;
    historyPara.textContent = `Your guesses: ${GuessVals}`;
    guessInput.value = "";

    if (attempts === 0 && !isGameOver) {
        messagePara.textContent = `Game over! Number was ${randomVal}`;
        isGameOver = true;
    }

    if (isGameOver) {
        guessInput.disabled = true;
        guessBtn.disabled = true;
    }
});