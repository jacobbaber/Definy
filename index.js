let words = ["more", "more", "more", "more"];
const request = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

function selectWord() {
  let randomNum = Math.floor(Math.random() * 4);
  let selectedWord = words[randomNum];
  return selectedWord;
}

async function getDefinition(word) {
  const res = await axios.get(request + word);
  const definition = res.data[0]["meanings"][0]["definitions"][0]["definition"];
  console.log(res);
  showDefinition(definition);
}

function startGame() {
  const selectedWord = selectWord();
  getDefinition(selectedWord);
  createLetterBoxes(selectedWord);
  letterBoxInputs(selectedWord);
  revealLetter(selectedWord);
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
    letterDiv.classList.add("animate__animated");
    wordRow.append(letterDiv);
  }
}

function letterBoxInputs(selectedWord) {
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  let place = 0;
  const keys = document.querySelectorAll(".key");
  const enter = document.querySelector(".enter");
  const back = document.querySelector(".back");

  enter.addEventListener("click", () => {
    const guess = getGuess();
    if (selectedWord == guess) {
      gameCompleted();
      console.log("You win!");
    } else {
      place = incorrectGuess();
      console.log("Wrong");
    }
  });

  back.addEventListener("click", () => {
    if (
      place > 0 &&
      place <= letterBoxes.length &&
      !letterBoxes[place - 1].classList.contains("hintedLetter") &&
      !letterBoxes[place - 1].classList.contains("guessedCorrectly")
    ) {
      --place;
      letterBoxes[place].classList.remove("animate__pulse");
      letterBoxes[place].innerHTML = "";
    }
  });

  for (let key of keys) {
    key.addEventListener("click", (e) => {
      if (place < letterBoxes.length) {
        while (
          letterBoxes[place].classList.contains("hintedLetter") &&
          place < letterBoxes.length - 1
        ) {
          ++place;
        }
      }

      if (
        place < letterBoxes.length &&
        !letterBoxes[place].classList.contains("hintedLetter")
      ) {
        letterBoxes[place].classList.add("animate__pulse");
        letterBoxes[place].innerHTML = e.target.innerHTML;
        if (place < letterBoxes.length) {
          ++place;
        }
      }
    });
  }

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
      letterBoxes[place].classList.add("animate__pulse");
      letterBoxes[place].innerHTML = e.key.toUpperCase();
      if (place < letterBoxes.length) {
        ++place;
      }
    } else if (
      e.key === "Backspace" &&
      place > 0 &&
      place <= letterBoxes.length &&
      !letterBoxes[place - 1].classList.contains("hintedLetter") &&
      !letterBoxes[place - 1].classList.contains("guessedCorrectly")
    ) {
      --place;
      letterBoxes[place].classList.remove("animate__pulse");
      letterBoxes[place].innerHTML = "";
    } else if (e.key === "Enter") {
      const guess = getGuess();
      if (selectedWord == guess) {
        gameCompleted();
        console.log("You win!");
      } else {
        place = incorrectGuess();
        console.log("Wrong");
      }
    }
  });
}

function revealLetter(selectedWord) {
  let place = 0;
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  const revealButton = document.querySelector(".reveal");
  revealButton.addEventListener("click", () => {
    if (
      place < selectedWord.length &&
      !letterBoxes[place].classList.contains("guessedCorrectly")
    ) {
      letterBoxes[place].innerHTML = selectedWord[place].toUpperCase();
      letterBoxes[place].classList.add("animate__flipInX");
      letterBoxes[place].classList.toggle("hintedLetter");
      ++place;
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

function incorrectGuess() {
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  let newPlace = 0;
  for (let letter of letterBoxes) {
    letter.classList.remove(
      "guessedIncorrectly",
      "animate__shakeX",
      "animate__flipInX",
      "animate__pulse"
    );
    letter.classList.add("guessedIncorrectly", "animate__shakeX");
  }
  setTimeout(() => {
    for (let letter of letterBoxes) {
      if (letter.classList.contains("hintedLetter")) {
        ++newPlace;
      } else {
        letter.innerHTML = "";
      }

      letter.classList.remove(
        "guessedIncorrectly",
        "animate__shakeX",
        "animate__flipInX",
        "animate__pulse"
      );
    }
  }, 500);
  return newPlace;
}

function gameCompleted() {
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  for (let letter of letterBoxes) {
    letter.classList.remove(
      "guessedIncorrectly",
      "animate__shakeX",
      "animate__flipInX",
      "animate__pulse"
    );
    letter.classList.add("guessedCorrectly", "animate__tada");
    const revealButton = document.querySelector(".reveal");
    document.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        location.reload();
      }
    });
  }
}

const newGameButton = document.querySelector("#new-game");
newGameButton.addEventListener("click", () => {
  location.reload();
});

startGame();
