import domRefs from "../webView/dom.js";
import { setTagsDisabled, initNode, initNodes } from "../util/webUtil.js";
import { addBuyEventHandler } from "./buyHandler.js";
import { removeModalCloseEventHandler } from "./modalHandler.js";

const $modalRestartButton = document.querySelector(".modal_restart_button");

export function addModalRestartEventHandler() {
  $modalRestartButton.addEventListener("click", restartHandler);
}

export function removeRestartEventHandler() {
  $modalRestartButton.removeEventListener("click", restartHandler);
}

function restartHandler() {
  domRefs.$modal.close();
  domRefs.$lottoInfoWrap.classList.remove("show");
  domRefs.$inputPrice.value = "";

  setTagsDisabled([domRefs.$inputPrice, domRefs.$buyButton]);
  initNodes(domRefs.$paper_winning_number_inputs);
  initNode(domRefs.$paper_bonus_number_input);
  domRefs.$lottoInfo.innerHTML = "";

  domRefs.$inputPrice.focus();

  removeRestartEventHandler();
  removeModalCloseEventHandler();
  addBuyEventHandler();
}
