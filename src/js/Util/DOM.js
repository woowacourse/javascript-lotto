import { ELEMENT } from "./constants.js";
import { $, $$ } from "./querySelector.js";

const showContainer = ($container) => {
  $($container).classList.remove(ELEMENT.HIDDEN);
};

const hideContainer = ($container) => {
  $($container).classList.add(ELEMENT.HIDDEN);
};

const showModal = ($element) => {
  $($element).classList.add(ELEMENT.OPEN);
};

const closeModal = ($element) => {
  $($element).classList.remove(ELEMENT.OPEN);
};

const ableElement = ($element) => {
  $($element).disabled = false;
};

const disableElement = ($element) => {
  $($element).disabled = true;
};

const clearInput = (selector) => {
  if ($$(selector).length === 1) {
    $(selector).value = "";
    return;
  }

  Array.from($$(selector)).map(($element) => ($element.value = ""));
};

export {
  showContainer,
  hideContainer,
  showModal,
  closeModal,
  ableElement,
  disableElement,
  clearInput,
};
