let listOfNumbersSorted = [];
let limitOfNumbers = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function displayTextOnScreen(tag, text) {
  let field = document.querySelector(tag);
  field.innerHTML = text;
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.2; 
    window.speechSynthesis.speak(utterance); 
   } else {
    console.log("Web Speech API não suportada neste navegador.");
   }
}

function displayMessageInitial() {
  displayTextOnScreen("h1", "Secret Number Game");
  displayTextOnScreen("p", "Pick a number between 1 and 10");
}

displayMessageInitial();

function verifyNumber() {
  let input = document.querySelector("input");
  let choice = parseInt(input.value);

  if (isNaN(choice) || choice < 1 || choice > 10) {
    displayTextOnScreen("p", "Please enter a valid number between 1 and 10!");
    return;
  }

  if (choice === secretNumber) {
    displayTextOnScreen("h1", "You win!");
    let wordAttempts = attempts === 1 ? "attempt" : "attempts";
    let message = `You guessed the secret number in ${attempts} ${wordAttempts}!`;
    displayTextOnScreen("p", message);
    document.getElementById("restart").removeAttribute("disabled");
  } else {
    if (choice > secretNumber) {
      displayTextOnScreen("p", "Try a lower number!");
    } else {
      displayTextOnScreen("p", "Try a higher number!");
    }
    attempts++;
    cleanField();
  }
}

function generateRandomNumber() {
  let number = Math.floor(Math.random() * limitOfNumbers) + 1;

  if (listOfNumbersSorted.length === limitOfNumbers) {
    listOfNumbersSorted = [];
  }

  if (listOfNumbersSorted.includes(number)) {
    return generateRandomNumber();
  } else {
    listOfNumbersSorted.push(number);
    console.log("Sorted numbers:", listOfNumbersSorted);
    return number;
  }
}

function cleanField() {
  let input = document.querySelector("input");
  input.value = "";
}

function restartGame() {
  secretNumber = generateRandomNumber();
  attempts = 1;
  cleanField();
  document.getElementById("restart").setAttribute("disabled", true);
  displayMessageInitial();
}
