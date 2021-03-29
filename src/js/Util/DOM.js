import { ELEMENT } from "./constants.js";
import { $, $$ } from "./querySelector.js";

const showContainer = ($container) => {
  $($container).classList.remove(ELEMENT.HIDDEN);
};

const hideContainer = ($container) => {
  $($container).classList.add(ELEMENT.HIDDEN);
};

const openElement = ($element) => {
  $($element).classList.add(ELEMENT.OPEN);
};

const closeElement = ($element) => {
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
  openElement,
  closeElement,
  ableElement,
  disableElement,
  clearInput,
};
