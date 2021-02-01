const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Main game -- Computer guesses human number
start();
async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  min = 1;
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
    if (firstAsk === "y" || firstAsk === "yes") {
      console.log("Congrats!");
      process.exit();
    }
  } while (guessNum != secretNumber); // victory condition

  console.log("");
  process.exit();
}
