const getRandomVal = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
const isValidGuess = (num, min, max) => {
    if (Number.isNaN(num) || num < min || num > max) return false;
    return true;
}
const playGame = () => {
    const randomVal = getRandomVal(1, 50);
    let attempt = 5;
    let isCorrect = false;
    let guessArray = [];

    while (attempt > 0) {
        const guessVal = Number(prompt("Guess a Number between 1 to 50"));
        if (!isValidGuess(guessVal, 1, 50)) {
            console.error("Invalide Guess");
            continue;
        }
        if (guessArray.includes(guessVal)) {
            console.log("Already guessed");
            continue;
        }
        guessArray.push(guessVal);
        if (guessVal === randomVal) {
            console.log("You guess right");
            isCorrect = true;
            break;
        }
        else if (guessVal > randomVal) {
            console.log("Guess is too high...");
            attempt--;
        }
        else {
            console.log("Guess is too low...");
            attempt--;
        }
        console.log(`You have ${attempt} Left`)
        console.log(`Guess Values are:- ${guessArray}`);
    }
    if (!isCorrect) {
        console.log(`Game Ove, Number was ${randomVal}`);
        console.log(`Your Guesses was ${guessArray}`);
    }
}
playGame();