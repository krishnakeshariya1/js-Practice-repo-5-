// -------- Global Variables ---------- //
let attemptCount = 3;
 let isCorrect = false;
// ---------- Random Value ----------- //
let randomVal = Math.floor(Math.random()*10)+1;

while (attemptCount > 0) {
    let guessVal = Number(prompt("Guess a Number"));

    if(Number.isNaN(guessVal) || guessVal > 10 || guessVal < 1){
        alert("Enter a valide Number");
    }
    else if(guessVal === randomVal){
        console.log("You have guess is Correct");
        isCorrect = true;
        break;
    }
    else if(guessVal < randomVal){
        console.log("guess is too low");
    }
    else{
        console.log("guess is too high");
    }
    attemptCount --;
    console.log(`You have ${attemptCount} left`);
}
if(!isCorrect){
    console.log("Game Over the Number was",randomVal)
}
