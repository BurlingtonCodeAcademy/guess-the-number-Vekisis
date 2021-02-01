const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// Main game -- Human guesses the computer's number
start();
async function start() {
    console.log ("Let's play a game where I (Computer) make up a number and you (Human) guesses it.") +("\nare you ready to start? (y/n) ");
    let response = await ask (response)
    if (response !== "yes" || "y"){
        console.log ("Cool. Press Y when you are")
    }

}