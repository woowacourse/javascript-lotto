import { PurchaseController } from "../controller/PurchaseController.js";
import WebOutputView from "../view/WebOutputView.js";
import { disableButton } from "../util/buttonActions.js";

export const purchaseLotto = async () => {
  const { lottoArray, lottoCount } = await PurchaseController();
  WebOutputView.renderLottoFlow(lottoCount, lottoArray);
  disableButton("purchase");
};
