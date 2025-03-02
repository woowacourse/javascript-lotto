import domRefs from "../webView/dom.js";
import { addResultEventHandler } from "./resultHandler.js";

export function addModalCloseEventHandler() {
  domRefs.$modal.addEventListener("click", modalCloseHandler);
}

export function removeModalCloseEventHandler() {
  domRefs.$modal.removeEventListener("click", modalCloseHandler);
}

function modalCloseHandler(e) {
  addResultEventHandler();

  if (e.target === domRefs.$modalCloseButton) {
    domRefs.$modal.close();
    return;
  }
  if (e.target === domRefs.$modal) {
    domRefs.$modal.close();
    return;
  }
}
