import { GAME_CONTAINER_CLASS, addElementInsideTag } from "./game.js";

const GALLOWS_CONTAINER_CLASS = "gallows-container";
const ICON_STAND_CLASS = "icon-stand";
const ICON_HEAD_CLASS = "icon-head";
const ICON_BODY_CLASS = "icon-body";
const ICON_LEFT_LEG_CLASS = "icon-left-leg";
const ICON_RIGHT_LEG_CLASS = "icon-right-leg";
const ICON_LEFT_HAND_CLASS = "icon-left-hand";
const ICON_RIGHT_HAND_CLASS = "icon-right-hand";
const BODY_ELEMENT_CLASS = "body";

function createGallows() {

  createGallowsContainer();
  createStand();
  createBody();
  redrawGallowsElements(0);
};

function createGallowsContainer() {
  addElementInsideTag(GAME_CONTAINER_CLASS, "div", GALLOWS_CONTAINER_CLASS);
}

function createStand() {
  let standClasses = `icon ${ICON_STAND_CLASS}`
  addElementInsideTag(GALLOWS_CONTAINER_CLASS, "span", standClasses)
}

function createBody() {

  let headClasses = `icon ${ICON_HEAD_CLASS} ${BODY_ELEMENT_CLASS}`;
  let bodyClasses = `icon ${ICON_BODY_CLASS} ${BODY_ELEMENT_CLASS}`;
  let leftHandClasses = `icon ${ICON_LEFT_HAND_CLASS} ${BODY_ELEMENT_CLASS}`;
  let rightHandClasses = `icon ${ICON_RIGHT_HAND_CLASS} ${BODY_ELEMENT_CLASS}`;
  let leftLegClasses = `icon ${ICON_LEFT_LEG_CLASS} ${BODY_ELEMENT_CLASS}`;
  let rightLegClasses = `icon ${ICON_RIGHT_LEG_CLASS} ${BODY_ELEMENT_CLASS}`;
  

  addElementInsideTag(GALLOWS_CONTAINER_CLASS, "span", headClasses)
  addElementInsideTag(GALLOWS_CONTAINER_CLASS, "span", bodyClasses)
  addElementInsideTag(GALLOWS_CONTAINER_CLASS, "span", leftHandClasses)
  addElementInsideTag(GALLOWS_CONTAINER_CLASS, "span", rightHandClasses)
  addElementInsideTag(GALLOWS_CONTAINER_CLASS, "span", leftLegClasses)
  addElementInsideTag(GALLOWS_CONTAINER_CLASS, "span", rightLegClasses)
}

function redrawGallowsElements(errorsCount) {
  document.querySelectorAll(`.${BODY_ELEMENT_CLASS}`).forEach((item, index) => {
    if (index > errorsCount - 1) {
      if (!item.classList.contains("hidden")) {
        item.classList.add("hidden")
      }
    } else {
      if (item.classList.contains("hidden")) {
        item.classList.remove("hidden")
      }
    }
  })
}

export { createGallows, redrawGallowsElements }