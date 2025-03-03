import { disableElement } from "../util/buttonActions.js";
import { setState } from "../state/state.js";
import { updateUI } from "../ui/updateUI.js";
import { alertError } from "../util/alertError.js";
import { getLottoArray, getLottoCount } from "../../common/service/PurchaseService.js";
import { getPrice } from "../service/InputService.js";

export const PurchaseController = () => {
  const price = alertError(getPrice);

  const lottoCount = getLottoCount(price);
  const lottoArray = getLottoArray(lottoCount);

  setState({ lottoArray: lottoArray, lottoCount: lottoCount });
  updateUI();

  disableElement("purchase");
  disableElement("price");
};
