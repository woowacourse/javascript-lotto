import { enableElement } from "../util/buttonActions.js";
import { resetState } from "../state/state.js";
import { resetUI } from "../ui/resetUI.js";

export const RetryController = () => {
  resetState();
  resetUI();

  enableElement("purchase");
  enableElement("price");
  document.querySelector("[name=price]").value = "";
};
