import words from "./words.json" assert { type: "json" };
const request = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

function selectWord() {
  let randomNum = Math.floor(Math.random() * 3000);
  let selectedWord = words[randomNum];
  return selectedWord;
}

async function getDefinition(word) {
  const res = await axios.get(request + word);
  const definition = res.data[0]["meanings"][0]["definitions"][0]["definition"];
  showDefinition(definition);
}

function startGame() {
  const selectedWord = selectWord();
  getDefinition(selectedWord);
  createLetterBoxes(selectedWord);
  letterBoxInputs();
  revealLetter(selectedWord);
  enterGuess(selectedWord);
}

function showDefinition(definition) {
  const defh4 = document.querySelector("#definition");
  defh4.innerHTML = definition;
}

function createLetterBoxes(word) {
  const wordRow = document.querySelector("#wordRow");
  for (let letters of word) {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("letter-boxes");
    wordRow.append(letterDiv);
  }
}

function letterBoxInputs() {
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  let place = 0;
  document.addEventListener("keyup", (e) => {
    if (place < letterBoxes.length) {
      while (
        letterBoxes[place].classList.contains("hintedLetter") &&
        place < letterBoxes.length - 1
      ) {
        ++place;
      }
    }
    if (
      e.keyCode >= "65" &&
      e.keyCode <= "90" &&
      place < letterBoxes.length &&
      !letterBoxes[place].classList.contains("hintedLetter")
    ) {
      letterBoxes[place].innerHTML = e.key.toUpperCase();
      if (place < letterBoxes.length) {
        ++place;
      }
    } else if (
      e.key === "Backspace" &&
      place > 0 &&
      place <= letterBoxes.length &&
      !letterBoxes[place - 1].classList.contains("hintedLetter")
    ) {
      --place;
      letterBoxes[place].innerHTML = "";
    }
  });
}

function revealLetter(selectedWord) {
  let place = 0;
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  const revealButton = document.querySelector(".reveal");
  revealButton.addEventListener("click", () => {
    if (place < selectedWord.length) {
      letterBoxes[place].innerHTML = selectedWord[place].toUpperCase();
      letterBoxes[place].classList.toggle("hintedLetter");
      ++place;
    }
  });
}

function enterGuess(selectedWord) {
  const enterGuessButton = document.querySelector(".enterGuess");
  enterGuessButton.addEventListener("click", () => {
    const guess = getGuess();
    if (selectedWord == guess) {
      gameCompleted();
      console.log("You win!");
    } else {
      console.log("Wrong");
    }
  });
}

function getGuess() {
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  let guess = "";
  for (let letter of letterBoxes) {
    guess = guess + letter.innerHTML;
  }
  return guess.toLowerCase();
}

function gameCompleted() {
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  for (let letter of letterBoxes) {
    letter.classList.add("guessedCorrectly");
  }
}

startGame();
