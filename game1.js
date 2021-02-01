const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// Main game -- Human guesses the computer's number
start();
async function start() {
    console.log ("Let's play a game where I (Computer) make up a number and you (Human) guesses it.");
    
    function randomInt(min,max){
        let range = max-min+1;
        return Math.floor(Math.random()*range);
    }
    
    }