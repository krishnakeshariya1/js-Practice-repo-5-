

let attempt = 3;
let isCorrect = false;
let randomVal = Math.floor(Math.random()* (10-1+1))+1;
if(attempt > 0){
    let guessVal = Number(prompt("Enter the Value"));
    if(Number.isNaN(guessVal) || guessVal < 1 || guessVal > 10){
        console.log("input should be a Number");
        attempt--;
    }
    
    else if(guessVal < randomVal){
        console.log("The Guess is Too low");
        attempt--;

    }
    else if(guessVal > randomVal){
        console.log("the guess is too high");
        attempt--;
    }
    else{
        console.log("Correct guess",  randomVal);
        isCorrect = true;
        attempt = 0;
        
    }
    console.log("You have",attempt,"left");

}
if(attempt > 0){
    let guessVal = Number(prompt("Enter the Value"));
    if(Number.isNaN(guessVal) || guessVal < 1 || guessVal > 10){
        console.log("input should be a Number");
        attempt--;
    }
    
    else if(guessVal < randomVal){
        console.log("The Guess is Too low");
        attempt--;
    }
    else if(guessVal > randomVal){
        console.log("the guess is too high");
        attempt--;
    }
    else{
        console.log("Correct guess", randomVal);
        isCorrect = true;
        attempt = 0;
    }
    console.log("You have", attempt, "left");

}
if(attempt > 0){
    let guessVal = Number(prompt("Enter the Value"));
    if(Number.isNaN(guessVal) || guessVal < 1 || guessVal > 10){
        console.log("input should be a Number");
        attempt--;
    }
    
    else if(guessVal < randomVal){
        console.log("The Guess is Too low");
        attempt--;
    }
    else if(guessVal > randomVal){
        console.log("the guess is too high");
        attempt--;
    }
    else{
        console.log("Correct guess",randomVal);
        isCorrect = true
        attempt = 0;
    }
}
 if(!isCorrect){
    console.log("Game over Number was" ,randomVal);
 }
