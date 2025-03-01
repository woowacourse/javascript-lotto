import { setOriginalApp } from "../state/state.js";
import { addKeyListener } from "../util/addKeyListener.js";
import { purchaseLotto } from "./purchaseHandler.js";

export const initialHandler = () => {
  const originalApp = document.querySelector("#app");
  setOriginalApp(originalApp);

  addKeyListener("[name=price]", purchaseLotto, "Enter");

  document.querySelector("[name=purchase]").addEventListener("click", () => {
    purchaseLotto();
  });
};
