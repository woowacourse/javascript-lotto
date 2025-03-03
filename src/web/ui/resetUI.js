import { enableElement } from "../../util/buttonActions.js";

export const resetUI = () => {
  document.querySelector(".count-prompt").innerHTML = "";
  document.querySelector(".lotto-numbers-container").innerHTML = "";
  document.querySelector(".winning-prompt").innerHTML = "";
  document.querySelector(".winning-bonus-container").innerHTML = "";
  document.querySelector(".result-button-container").innerHTML = "";
  document.querySelector(".modal-container").innerHTML = "";
  enableElement("purchase");
  enableElement("price");
};
