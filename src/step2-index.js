import { addKeyListener } from "./web/util/addKeyListener.js";
import { PurchaseController } from "./web/controller/PurchaseController.js";

const initializeLottoEvents = async () => {
  addKeyListener("[name=price]", PurchaseController, "Enter");

  document.querySelector("[name=purchase]").addEventListener("click", () => {
    PurchaseController();
  });
};

initializeLottoEvents();
