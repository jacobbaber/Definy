let words = [
  ["transform", "athlete", "sin"],
  ["tank", "nothing", "ease"],
  ["science", "pan", "extent"],
  ["cycle", "solar", "fart"],
  ["portion", "lesson", "sheet"],
  ["throat", "senior", "course"],
  ["more", "guarantee", "funeral"],
  ["ancient", "iron", "terror"],
  ["occur", "show", "self"],
  ["path", "problem", "port"],
  ["education", "emphasis", "matter"],
  ["music", "mask", "role"],
  ["regime", "ban", "owe"],
  ["meal", "writing", "definitely"],
  ["hide", "help", "deck"],
  ["collection", "legitimate", "height"],
  ["host", "though", "father"],
  ["relation", "downtown", "homeless"],
  ["announce", "sky", "yell"],
  ["analysis", "shopping", "nor"],
  ["initiative", "suggest", "opening"],
  ["attack", "alter", "finish"],
  ["total", "name", "wheel"],
  ["king", "danger", "behind"],
  ["model", "complicated", "body"],
  ["accomplish", "courage", "examine"],
  ["recipe", "proud", "ill"],
  ["consistent", "glove", "original"],
  ["fellow", "sequence", "approximately"],
  ["gallery", "dance", "society"],
  ["potential", "crash", "marketing"],
  ["already", "reflect", "base"],
  ["drop", "approach", "signal"],
  ["hand", "adjust", "favorite"],
  ["governor", "cat", "tired"],
  ["survive", "tension", "mother"],
  ["extra", "stick", "lock"],
  ["battle", "roof", "frequent"],
  ["satellite", "appeal", "dna"],
  ["loss", "yesterday", "almost"],
  ["spot", "urge", "device"],
  ["fix", "cover", "maybe"],
  ["manner", "out", "top"],
  ["explain", "number", "faculty"],
  ["various", "inform", "huge"],
  ["set", "status", "butter"],
  ["growing", "absolute", "truck"],
  ["version", "belong", "action"],
  ["representative", "debate", "time"],
  ["dimension", "glance", "along"],
  ["script", "reach", "mood"],
  ["kind", "attention", "where"],
  ["tendency", "conference", "very"],
  ["though", "later", "tie"],
  ["tape", "seed", "particular"],
  ["trade", "saving", "powder"],
  ["vital", "layer", "seize"],
  ["orientation", "draft", "narrative"],
  ["beer", "estimate", "star"],
  ["anxiety", "bank", "guideline"],
  ["elect", "pool", "fiction"],
  ["immediate", "fantasy", "committee"],
  ["rose", "thank", "dialogue"],
  ["dependent", "design", "absence"],
  ["welfare", "file", "job"],
  ["originally", "attach", "kiss"],
  ["branch", "recent", "large"],
  ["rid", "convention", "exciting"],
  ["impose", "severe", "struggle"],
  ["submit", "class", "dominate"],
  ["build", "again", "opening"],
  ["warm", "sample", "depth"],
  ["murder", "smoke", "whether"],
  ["row", "percentage", "ideal"],
  ["supreme", "stop", "parking"],
  ["speed", "press", "pocket"],
  ["clean", "remember", "shelf"],
  ["graduate", "bowl", "example"],
  ["treaty", "ensure", "bread"],
  ["island", "next", "offer"],
  ["pant", "differ", "spin"],
  ["crime", "range", "theme"],
  ["invest", "soon", "recovery"],
  ["beauty", "stock", "sacred"],
  ["united", "balance", "outcome"],
  ["pool", "exercise", "succeed"],
  ["advocate", "obligation", "type"],
  ["therefore", "board", "apartment"],
  ["correct", "penalty", "venture"],
  ["crazy", "domestic", "process"],
  ["reform", "employee", "somebody"],
  ["mental", "goal", "situation"],
  ["wrong", "ignore", "task"],
  ["career", "sustain", "drawing"],
  ["believe", "scenario", "tone"],
  ["frequency", "habitat", "chamber"],
  ["round", "locate", "rock"],
  ["marry", "factor", "afternoon"],
  ["ability", "personnel", "agency"],
  ["spirit", "wedding", "orange"],
  ["preserve", "heart", "obvious"],
  ["campaign", "communicate", "telescope"],
  ["whisper", "pass", "list"],
  ["fundamental", "deserve", "message"],
  ["trouble", "cell", "pattern"],
  ["flat", "cabinet", "significance"],
  ["burn", "item", "sheet"],
  ["start", "guess", "derive"],
  ["poem", "award", "garden"],
  ["find", "joy", "crowd"],
  ["evolution", "force", "priority"],
  ["customer", "test", "cooking"],
  ["basic", "chart", "prospect"],
  ["food", "strong", "lap"],
  ["generally", "shot", "recruit"],
  ["immigrant", "knee", "technique", "yard"],
  ["trust", "great", "naked"],
  ["notion", "flee", "wine"],
  ["useful", "undefined", "error"],
  ["swear", "killing", "guard"],
  ["admire", "screen", "sport"],
  ["divorce", "forest", "appropriate"],
  ["better", "consider", "department"],
  ["expert", "complex", "visible"],
  ["following", "oil", "furniture"],
  ["weather", "bottom", "security"],
  ["step", "quite", "subsequent"],
  ["viewer", "basis", "coach"],
  ["tire", "celebrate", "agree"],
  ["victory", "trick", "fault"],
  ["summit", "majority", "ghost"],
  ["whatever", "wait", "purpose"],
  ["command", "meaning", "adopt"],
  ["teaching", "block", "league"],
  ["rating", "positive", "promote"],
  ["share", "porch", "give"],
];

const request = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

const days = () => {
  let date_1 = new Date("8/9/2022");
  let date_2 = new Date();
  let difference = date_2.getTime() - date_1.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) - 1;
  return TotalDays;
};

localStorage.setItem("currentDate", new Date().toDateString());

function selectWord() {
  if (localStorage.getItem("wordNum") === null) {
    localStorage.setItem("wordNum", 0);
  }
  let selectedWord = words[days()][parseInt(localStorage.getItem("wordNum"))];
  return selectedWord;
}

async function getDefinition(word) {
  const res = await axios.get(request + word);
  const definition = res.data[0]["meanings"][0]["definitions"][0]["definition"];
  showDefinition(definition);
}

function startGame() {
  if (checkIfCompleted()) {
    const selectedWord = selectWord();
    getDefinition(selectedWord);
    createLetterBoxes(selectedWord);
    letterBoxInputs(selectedWord);
    revealLetter(selectedWord);
  }
}

function checkIfCompleted() {
  if (localStorage.getItem("dayCompleted") != new Date().getDay()) {
    return true;
  }
  return false;
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
    if (
      selectedWord == guess &&
      !letterBoxes[0].classList.contains("guessedCorrectly")
    ) {
      wordCompleted();
    } else if (!letterBoxes[0].classList.contains("guessedCorrectly")) {
      place = incorrectGuess();
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
    } else if (
      e.key === "Enter" &&
      !letterBoxes[place - 1].classList.contains("guessedCorrectly")
    ) {
      const guess = getGuess();
      if (selectedWord == guess) {
        wordCompleted();
      } else {
        place = incorrectGuess();
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
  incorrectScoreIncrement();
  return newPlace;
}

const share = document.querySelector(".share");
share.addEventListener("click", () => {
  navigator.share({
    text: `I scored a ${getTotalScore()} in today's Definy. Play at https://jacobbaber.github.io/Definy/`,
  });
});

function wordCompleted() {
  const letterBoxes = document.querySelectorAll(".letter-boxes");
  let wordNum = parseInt(localStorage.getItem("wordNum"));
  for (let letter of letterBoxes) {
    letter.classList.remove(
      "guessedIncorrectly",
      "animate__shakeX",
      "animate__flipInX",
      "animate__pulse"
    );
    letter.classList.add("guessedCorrectly", "animate__tada");
    if (letter.classList.contains("hintedLetter")) {
      revealedScoreIncrement();
    }
  }
  if (wordNum === 2) {
    let completedDate = new Date().toDateString();
    localStorage.setItem("completedDay", completedDate);
    localStorage.setItem("wordNum", 0);
    setTimeout(() => {
      showResults();
    }, 1000);
  } else {
    convertToNextWord();
    wordNum++;
    localStorage.setItem("wordNum", wordNum);
    document.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        location.reload();
      }
    });
  }
}

function showResults() {
  updateStatsModal();
  $("#testModal").modal("show");
}

function incorrectScoreIncrement() {
  let incorScore = parseInt(
    localStorage.getItem(`incorScore${new Date().toDateString()}`)
  );
  ++incorScore;
  localStorage.setItem(`incorScore${new Date().toDateString()}`, incorScore);
}

function revealedScoreIncrement() {
  let revScore = parseInt(
    localStorage.getItem(`revScore${new Date().toDateString()}`)
  );
  ++revScore;
  localStorage.setItem(`revScore${new Date().toDateString()}`, revScore);
}

function getRevealedScore() {
  return localStorage.getItem(`revScore${new Date().toDateString()}`);
}

function getIncorrectScore() {
  return localStorage.getItem(`incorScore${new Date().toDateString()}`);
}

const getTotalScore = () => {
  return parseInt(getIncorrectScore()) + parseInt(getRevealedScore());
};

function updateStatsModal() {
  let stats = document.querySelector(".stats");
  stats.innerHTML = `You had <span style='color: red'><b>${getIncorrectScore()}</b></span> incorrect guesses and <span style='color: cyan;'><b>${getRevealedScore()}</b></span> revealed letters for a total score of: <span style='color: green'>${getTotalScore()} </span><br><br><br> There will be three new words tomorrow :)`;
}

function convertToNextWord() {
  const enterGuess = document.querySelector(".enter");
  enterGuess.innerHTML = "Next Word";
  enterGuess.addEventListener("click", () => {
    location.reload();
  });
}

if (localStorage.getItem(`revScore${new Date().toDateString()}`) === null) {
  localStorage.setItem(`revScore${new Date().toDateString()}`, 0);
}
if (localStorage.getItem(`incorScore${new Date().toDateString()}`) === null) {
  localStorage.setItem(`incorScore${new Date().toDateString()}`, 0);
}

if (
  localStorage.getItem("completedDay") != localStorage.getItem("currentDate")
) {
  startGame();
} else {
  showResults();
}
