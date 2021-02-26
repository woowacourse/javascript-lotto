import { hideElement } from "../utils.js";
import { $manualPurchaseDetail } from "../elements.js";
import {
  INVALID_WINNGNUMBER_ERROR,
  DUPLICATED_WINNINGNUMBER_ERROR,
} from "../constants.js";
import { isNumbersInRange, isDistinctNumbers } from "../validates.js";

export default class LottoPurchaseController {
  constructor(lottoModel, lottoView) {
    this.lottoModel = lottoModel;
    this.lottoView = lottoView;
  }

  onSubmitManualPurchaseNumber(manaulPurcahseNumber) {
    if (!isNumbersInRange(manaulPurcahseNumber, 1, 45)) {
      alert(INVALID_WINNGNUMBER_ERROR);

      return;
    }
    if (!isDistinctNumbers(manaulPurcahseNumber)) {
      alert(DUPLICATED_WINNINGNUMBER_ERROR);

      return;
    }

    this.lottoModel.manaulPurchase(manaulPurcahseNumber);
    this.lottoView.showPurchaseProgress(
      this.lottoModel.price / 1000,
      this.lottoModel.lottoList.length
    );

    hideElement($manualPurchaseDetail);
  }

  onClickAutoPurchaseButton() {
    this.lottoModel.autoPurchase(
      this.lottoModel.price / 1000 - this.lottoModel.lottoList.length
    );
    this.lottoView.showConfirmation(this.lottoModel.lottoList);
    hideElement(purchase);
  }
}
