const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
function randomInt(min, userMax) {
  let range = userMax - min + 1;
  let computerInt = Math.floor(Math.random() * range);
  return computerInt;
}
async function start() {
  console.log(
    "Let's play a game where I (Computer) make up a number as low as 0 and you (Human) try to guess it."
  );
  min = 1;
  let userMax = await ask("Choose the highest number in the range: ");
  let secretNumber = randomInt(min, userMax);

  guessNum = await ask(
    "Excellent. I've chosen a number. What do you think it is? "
  );
  if (guessNum == secretNumber) {
    console.log("Correct!");
    process.exit();
  }
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
