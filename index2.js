const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
function defineRange(){
    let userMax = 100;
    let userMin = 1;
}


// Main game -- Computer guesses human number
start();
async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  userMin = await ask ("Set the lowest number (above zero). ")
  userMax = await ask ("Set the highest number. ")
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  // function for (computer) to guess your secretNumber
  function randomInt(userMin, userMax) {
    let range = userMax - userMin + 1;
    return userMin + Math.floor( range / 2); // returns a number halfway between the guess and the minimum or maximum, based on the guess
  }
  // Computer guesses at random between 1 and 100
  guessNum = randomInt(userMin, userMax);
   // Asks you your first question upon entering your number
  let firstAsk = await ask("is your number " + guessNum + " (y/n) ");
  if (firstAsk === "y" || firstAsk === "yes") {
    console.log("Congrats!");
    process.exit();
  }
  do {
     // function asks you if the number is higher or lower, and responds accordingly
    secondAsk = await ask("Is your number higher?" + " (y/n) ");
    if (secondAsk === "y" || secondAsk === "yes") {
      userMin = guessNum + 1;
      guessNum = randomInt(userMin, userMax);
    } else {
      userMax = guessNum - 1;
      guessNum = randomInt(userMin, userMax);
    }
     // Code for if the number is guessed to the integer
    firstAsk = await ask("is your number " + guessNum + " (y/n) ");
    if (firstAsk === "y" || firstAsk === "yes") {
      console.log("Congrats!");
      process.exit();
    }
  } while (guessNum != secretNumber);

  console.log("");
  process.exit();
}
