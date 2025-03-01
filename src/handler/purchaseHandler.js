import { disabledButton } from "../util/buttonActions.js";
import { PurchaseController } from "../controller/PurchaseController.js";
import WebOutputView from "../view/WebOutputView.js";

export const purchaseLotto = async () => {
  const { lottoArray, lottoCount } = await PurchaseController();
  WebOutputView.renderLottoFlow(lottoCount, lottoArray);
  disabledButton("purchase");
};
