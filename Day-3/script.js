function generateRandomNumber(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
function isValideInput(input, min, max) {
    if (Number.isNaN(input) || input < min || input > max) return false;
    return true;
}
function playGame() {
    let attempt = 5;
    let isCorrect = false;
    const randomNum = generateRandomNumber(1, 50);

    while (attempt > 0) {
        const guessVal = Number(prompt("Enter a number from 1 to 50"));

        if (!isValideInput(guessVal, 1, 50)) {
            console.error("The input is invalide");
            continue;
        }

        if (guessVal === randomNum) {
            console.log("You have guessed Right");
            isCorrect = true;
            break;
        }
        else if (guessVal > randomNum) {
            console.log("Guess is too high");
            attempt--;
        }
        else {
            console.log("Guess is too low");
            attempt--;
        }
        console.log(`you have ${attempt} attempt left`);
    }
    if (!isCorrect) {
        console.log(`Game over, The number was ${randomNum}`);
    }
}
playGame()