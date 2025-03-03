import { disableElement } from "../util/buttonActions.js";
import { PurchaseController } from "../../terminal/controller/PurchaseController.js";
import { setState } from "../state/state.js";
import { updateUI } from "../ui/updateUI.js";

export const purchaseLotto = async () => {
  const { lottoArray, lottoCount } = await PurchaseController();

  setState({ lottoArray: lottoArray, lottoCount: lottoCount });
  updateUI();

  disableElement("purchase");
  disableElement("price");
};
