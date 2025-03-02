import domRefs from "../webView/dom.js";
import { addResultEventHandler } from "./resultHandler.js";

const $modalCloseButton = document.querySelector(".modal_close_button");

export function addModalCloseEventHandler() {
  domRefs.$modal.addEventListener("click", modalCloseHandler);
}

export function removeModalCloseEventHandler() {
  domRefs.$modal.removeEventListener("click", modalCloseHandler);
}

function modalCloseHandler(e) {
  addResultEventHandler();

  if (e.target === $modalCloseButton) {
    domRefs.$modal.close();
    return;
  }
  if (e.target === domRefs.$modal) {
    domRefs.$modal.close();
    return;
  }
}
