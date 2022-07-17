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
  console.log(definition);
  showDefinition(definition);
}

function startGame() {
  const selectedWord = selectWord();
  console.log(selectedWord);
  getDefinition(selectedWord);
  createLetterBoxes(selectedWord);
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
    letterDiv.innerHTML = "TEST";
    wordRow.append(letterDiv);
  }
}

startGame();
