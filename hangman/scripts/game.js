// import questions from "../data/questions.json" assert { type: 'json' };
import { createModal, showModal, closeModal, fillModal } from "./modal.js";
import {
  createVirtualKeyboard,
  clearVirtualKeyboard,
  ALPHABET,
  VIRTUAL_KEYBOARD_CLASS,
  VIRTUAL_KEYBOARD_KEY_CLASS,
  DISABLED_CLASS,
} from "./virtualKeyboard.js";
import { createGallows, redrawGallowsElements } from "./gallows.js";

const questions = await fetch("./data/questions.json").then((res) =>
  res.json()
);

let lastQuestionId = null;
let currentQuestion = null;

let clickedLetters = "";
let errors = 0;
let stopGame = false;

const BODY_ELEMENT = document.body;
const BUTTON_RESTART_CLASS = "restart";
const GAME_CONTAINER_CLASS = "game-container";
const INTERACTION_CONTAINER_CLASS = "interaction-container";
const HINT_CLASS = "hint";
const ERRORS_CLASS = "errors";
const ANSWER_CLASS = "answer";
const LETTER_CLASS = "letter";
const RESTART_GAME_BUTTON_CLASS = "restart-game";

//CREATE GAME
console.log(
  `Make sure your keyboard layout is set to English / Убедитесь, что у вас стоит английская раскладка клавиатуры`
);
createGame();

function createGame() {
  createGameElements();
  createModal();
  restartGame();
  createRestartGameButton();

  addKeyListener();
  createVirtualKeyboard();
}

function createGameElements() {
  //order of function calls is important
  createGameContainer();
  createGallows();
  createInteractiveField();
}

function generateQuestion() {
  let randomId = Math.floor(Math.random() * questions.length);
  if (questions[randomId].id !== lastQuestionId) {
    lastQuestionId = questions[randomId].id;
    currentQuestion = questions[randomId];
    currentQuestion.answer = currentQuestion.answer.toUpperCase();
    console.log(`Answer is "${currentQuestion.answer}"`);
    return questions[randomId];
  } else {
    return generateQuestion();
  }
}

function createGameContainer() {
  const innerHtml = `
    <div class="${GAME_CONTAINER_CLASS}"></div>
  `;
  BODY_ELEMENT.innerHTML = innerHtml;
}
function createInteractiveField() {
  addElementInsideTag(GAME_CONTAINER_CLASS, "div", INTERACTION_CONTAINER_CLASS);

  addElementInsideTag(INTERACTION_CONTAINER_CLASS, "div", HINT_CLASS);
  addElementInsideTag(INTERACTION_CONTAINER_CLASS, "div", ERRORS_CLASS);
  addElementInsideTag(INTERACTION_CONTAINER_CLASS, "div", ANSWER_CLASS);
  addElementInsideTag(
    INTERACTION_CONTAINER_CLASS,
    "div",
    VIRTUAL_KEYBOARD_CLASS
  );
}

function createRestartGameButton() {
  addElementInsideTag(
    INTERACTION_CONTAINER_CLASS,
    "button",
    BUTTON_RESTART_CLASS,
    "Start new game"
  );
  document.querySelector(`.restart`).addEventListener("click", (event) => {
    restartGame();
  });
}

function addElementInsideTag(classNameAddTo, tag, classAddElement, innerInfo) {
  const elementAddTo = document.querySelector(`.${classNameAddTo}`);
  let innerHtml = `
    <${tag} class="${classAddElement ? classAddElement : ""}">${
    innerInfo ? innerInfo : ""
  }</${tag}>
  `;
  elementAddTo.innerHTML += innerHtml;
}

function updateQuestionFields() {
  const hintElement = document.querySelector(`.${HINT_CLASS}`);
  hintElement.innerHTML = currentQuestion?.hint;

  updateErrors();

  let answer = currentQuestion?.answer;
  document.querySelector(`.${ANSWER_CLASS}`).innerHTML = "";
  answer.split("").forEach((el) => {
    addElementInsideTag(ANSWER_CLASS, "div", LETTER_CLASS, "_");
  });
}

function restartGame() {
  generateQuestion();
  clearClickedLetters();
  clearErrors();
  updateQuestionFields();
  closeModal();
  stopGame = false;
  clearVirtualKeyboard();
}

function decryptLetter(letter) {
  let answer = currentQuestion?.answer;
  let answerElements = document.querySelectorAll(`.${LETTER_CLASS}`);
  // check if clicked symbol is letter, letter not clicked already
  if (!(ALPHABET.includes(letter) && !clickedLetters.includes(letter))) {
    return;
  }
  // check if game not ended
  if (stopGame) {
    return;
  }

  if (answer.includes(letter)) {
    answer.split("").forEach((el, index) => {
      if (el === letter) {
        answerElements[index].innerHTML = letter;
      }
    });
    blockLetter(letter);
  } else {
    errors += 1;
    updateErrors();
    blockLetter(letter);
  }

  let isLoss = testLoss();
  let isWin = testWin();
  if (isWin || isLoss) {
    stopGame = true;
    showModal();
    fillModal(isWin, currentQuestion.answer);
  }
}

function addKeyListener() {
  document.addEventListener("keyup", function (event) {
    const key = event.key.toUpperCase();
    // console.log(key);
    decryptLetter(key);
  });
}

function clearClickedLetters() {
  clickedLetters = "";
}
function clearErrors() {
  errors = 0;
}

function blockLetter(letter) {
  clickedLetters += letter;
  document
    .querySelectorAll(`.${VIRTUAL_KEYBOARD_KEY_CLASS}`)
    .forEach((item) => {
      if (item.innerHTML === letter) {
        item.classList.add(DISABLED_CLASS);
      }
    });
}

function updateErrors() {
  const errorsElement = document.querySelector(`.${ERRORS_CLASS}`);
  errorsElement.innerHTML = `Errors: ${errors}/6`;
  redrawGallowsElements(errors);
}

function testLoss() {
  return errors >= 6 ? true : false;
}

function testWin() {
  let letterArray = Array.from(document.querySelectorAll(`.${LETTER_CLASS}`));
  return letterArray.filter((el) => el.innerHTML === "_").length === 0
    ? true
    : false;
}

export {
  decryptLetter,
  RESTART_GAME_BUTTON_CLASS,
  restartGame,
  GAME_CONTAINER_CLASS,
  addElementInsideTag,
};
