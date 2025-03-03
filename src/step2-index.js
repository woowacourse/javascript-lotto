import { addKeyListener } from "./web/util/addKeyListener.js";
import { purchaseLotto } from "./web/handler/purchaseHandler.js";

const runLotto = async () => {
  addKeyListener("[name=price]", purchaseLotto, "Enter");

  document.querySelector("[name=purchase]").addEventListener("click", () => {
    purchaseLotto();
  });
};

runLotto();
