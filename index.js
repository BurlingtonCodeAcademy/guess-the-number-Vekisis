const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//This goes straight into a function that makes you choose which game you want to play with a simple if else and await ask.
selectGame();
async function selectGame(){
let answer =  await ask("In this program you can have the computer guess a number you're thinking of, or you can guess a number that the computer has thought of. \nIf you want to have the computer guess your number, press (1). \nIf you want to guess the computer's number, press (2): ");
  if (answer === "1"){
    start();
  } else if (answer === "2"){
    startTwo();
  }

}


// Game 1 -- Computer guesses human number

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  min = 1;
  //Sets an adjustable range as a variable
  let userMax = await ask("Choose the highest number in the range: ");
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);

  // function for (computer) to guess your secretNumber
  function randomInt(min, userMax) {
    let range = userMax - min + 1;
    return min + Math.floor(range / 2); // returns a number halfway between the guess and the minimum or maximum, based on the guess
  }
  // Computer guesses at random
  guessNum = randomInt(min, userMax);
  // Computer makes first guess. If correct, the program exits.
  let firstAsk = await ask("is your number " + guessNum + " (y/n) ");
  if (firstAsk === "y" || firstAsk === "yes") {
    console.log("Congrats!");
    process.exit();
  }
  // Computer asks you if the number is higher or lower, and responds accordingly
  do {
    secondAsk = await ask("Is your number higher?" + " (y/n) ");
    if (secondAsk === "y" || secondAsk === "yes") {
      min = guessNum + 1;
      guessNum = randomInt(min, userMax);
    } else {
      userMax = guessNum - 1;
      guessNum = randomInt(min, userMax);
    }
    //Cheat detection and punishment -- restarts the program
    if (secretNumber < min || secretNumber > userMax) {
      secretNumber = await ask(
        "Oh, Oh so you think you're clever eh? You think it's funny? Lying to computers? Skynet will remember this..."
      );
      start();
    }
    // Much like lines 32-35, this is the recurring code for guesses that weren't correct the first time.
    firstAsk = await ask("is your number " + guessNum + " (y/n) ");
    //victory condition
    if (firstAsk === "y" || firstAsk === "yes") {
      console.log("Congrats!");
      process.exit();
    }
  } while (guessNum != secretNumber);

  console.log("");
  process.exit();
}

//function for the computer to come up with a random number to guess for the second game
function randomInt(min, userMax) {
  let range = userMax - min + 1;
  let computerInt = Math.floor(Math.random() * range);
  return computerInt;
}
//Game 2, the reverse game
async function startTwo() {
  console.log(
    "Let's play a game where I (Computer) make up a number as low as 0 and you (Human) try to guess it."
  );
  min = 1;
  //Sets an adjustable range as a variable
  let userMax = await ask("Choose the highest number in the range: ");
  let secretNumber = randomInt(min, userMax);
//After having chosen a number, asks you for your first guess
  guessNum = await ask(
    "Excellent. I've chosen a number. What do you think it is? "
  );
  //Victory condition
  if (guessNum == secretNumber) {
    console.log("Correct!");
    process.exit();
  }
  //Do/while loop that makes you guess again until the victory condition is met
  do {
    if (guessNum < secretNumber) {
      console.log("Wrong! the number is higher ");
    }
    if (guessNum > secretNumber) {
      console.log("Wrong! the number is lower ");
    }
    guessNum = await ask("Guess again: ");
    if (guessNum == secretNumber) {
      console.log("Correct!");
      process.exit();
    }
  } while (guessNum != secretNumber);

  console.log("Congrats!");
  process.exit();
}
