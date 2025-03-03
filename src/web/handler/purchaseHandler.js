import { PurchaseController } from "../../terminal/controller/PurchaseController.js";
import { disableElement } from "../../util/buttonActions.js";
import { setState } from "../state/state.js";
import { updateLottoArrayUI, updatelottoCountUI, updateResultButtonUI, updateWinningBonusUI } from "../ui/updateUI.js";

export const purchaseLotto = async () => {
  const { lottoArray, lottoCount } = await PurchaseController();
  setState({ lottoArray: lottoArray, lottoCount: lottoCount });
  updatelottoCountUI();
  updateLottoArrayUI();
  updateWinningBonusUI();
  updateResultButtonUI();

  disableElement("purchase");
  disableElement("price");
};
