import { RESTART_GAME_BUTTON_CLASS, restartGame } from "./game.js";

const MODAL_CLASS = 'modal';
const MODAL_CONTENT_CLASS = 'modal__content';
const MESSAGE_CLASS = 'message';
const WIN_ICON_CLASS = 'icon-win';
const LOSS_ICON_CLASS = 'icon-loss';
const MODAL_ANSWER_CLASS = 'modal__answer';
const MODAL_ICON_CLASS = 'modal__message-icon';

function createModal() {
  document.body.innerHTML += `<div class="${MODAL_CLASS}"></div>`
  generateContentContainer();
  addCloseEvent();
}

function generateContentContainer(){
  document.getElementsByClassName(MODAL_CLASS)[0].innerHTML = `
    <div class="${MODAL_CONTENT_CLASS}"></div>
  `;
}

function addCloseEvent() {
  const modal = document.querySelector(`.${MODAL_CLASS}`);
  const modalContent = document.querySelector(`.${MODAL_CONTENT_CLASS}`);

//   modalContent.addEventListener('click', e => e.stopPropagation());
//   modal.addEventListener('click', e => closeModal());
}

function showModal(){
  document.querySelector(`.${MODAL_CLASS}`).style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function clearModal(){
  document.querySelector(`.${MODAL_CONTENT_CLASS}`).innerHTML = '';
}

function closeModal() {
  document.querySelector(`.${MODAL_CLASS}`).style.display = 'none';
  document.body.style.overflow = 'visible';
}

function fillModal(isWin, answer) {
  clearModal();
  const modalContent = document.querySelector(`.${MODAL_CONTENT_CLASS}`);
  modalContent.innerHTML = `
    <div class="${MESSAGE_CLASS}">
      <span class="icon ${isWin ? WIN_ICON_CLASS : LOSS_ICON_CLASS} ${MODAL_ICON_CLASS}"></span>
      You ${isWin ? "win" : "loss"}. Right answer is <span class="${MODAL_ANSWER_CLASS}">${answer}</span>
    </div>
    <button class="${RESTART_GAME_BUTTON_CLASS}">Start new game</button>
  `
  document.querySelector(`.${RESTART_GAME_BUTTON_CLASS}`).addEventListener('click', e => restartGame());
}
export { createModal, showModal, closeModal, fillModal }