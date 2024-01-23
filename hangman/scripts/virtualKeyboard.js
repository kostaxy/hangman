import { decryptLetter } from './game.js'

// const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHABET = "QWERTYUIOPASDFGHJKLZXCVBNM";
const VIRTUAL_KEYBOARD_CLASS = "virtual-keyboard";
const VIRTUAL_KEYBOARD_KEY_CLASS = "virtual-keyboard__key";
const VIRTUAL_KEYBOARD_KEY_FIRST_ROW_CLASS = "first-row";
const VIRTUAL_KEYBOARD_KEY_SECOND_ROW_CLASS = "second-row";
const VIRTUAL_KEYBOARD_KEY_THIRD_ROW_CLASS = "third-row";
const DISABLED_CLASS = "disabled";

function createVirtualKeyboard() {
  const virtualKeyboardElement = document.querySelector(`.${VIRTUAL_KEYBOARD_CLASS}`);
  virtualKeyboardElement.innerHTML = `
    <div class="${VIRTUAL_KEYBOARD_KEY_FIRST_ROW_CLASS}"></div>
    <div class="${VIRTUAL_KEYBOARD_KEY_SECOND_ROW_CLASS}"></div>
    <div class="${VIRTUAL_KEYBOARD_KEY_THIRD_ROW_CLASS}"></div>
  `;
  let firstRowHtml = "";
  let secondRowHtml = "";
  let thirdRowHtml = "";
  ALPHABET.split('').forEach(el => {
    if (/^[QWERTYUIOP]$/.test(el)) {
      firstRowHtml += `<div class="${VIRTUAL_KEYBOARD_KEY_CLASS}">${el}</div>`;
    } else if (/^[ASDFGHJKL]$/.test(el)) {
      secondRowHtml += `<div class="${VIRTUAL_KEYBOARD_KEY_CLASS}">${el}</div>`;
    } else {
      thirdRowHtml += `<div class="${VIRTUAL_KEYBOARD_KEY_CLASS}">${el}</div>`;
    }
    
  })
  document.querySelector(`.${VIRTUAL_KEYBOARD_KEY_FIRST_ROW_CLASS}`).innerHTML = firstRowHtml;
  document.querySelector(`.${VIRTUAL_KEYBOARD_KEY_SECOND_ROW_CLASS}`).innerHTML = secondRowHtml;
  document.querySelector(`.${VIRTUAL_KEYBOARD_KEY_THIRD_ROW_CLASS}`).innerHTML = thirdRowHtml;

  document.querySelectorAll(`.${VIRTUAL_KEYBOARD_KEY_CLASS}`).forEach(item => {
    item.addEventListener('click', event => {
      decryptLetter(item.innerHTML);
    })
  });
};

function clearVirtualKeyboard() {
  document.querySelectorAll(`.${VIRTUAL_KEYBOARD_KEY_CLASS}`).forEach(item => {
    item.classList.remove(DISABLED_CLASS);
  });
};

export { createVirtualKeyboard, clearVirtualKeyboard, ALPHABET, VIRTUAL_KEYBOARD_CLASS, VIRTUAL_KEYBOARD_KEY_CLASS, DISABLED_CLASS };