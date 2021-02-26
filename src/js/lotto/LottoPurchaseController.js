import { hideElement } from "../utils.js";
import { $purchase } from "../elements.js";
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

  onClickAutoPurchaseButton() {
    this.lottoModel.autoPurchase();
    this.lottoView.showConfirmation(this.lottoModel.lottoList);

    hideElement($purchase);
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

    this.lottoModel.manualPurchase(manaulPurcahseNumber);

    if (this.lottoModel.purchaseEveryLotto()) {
      this.onClickAutoPurchaseButton();
    }

    this.lottoView.showPurchaseProgress(
      this.lottoModel.price / 1000,
      this.lottoModel.lottoList.length
    );

    this.lottoView.resetManualPurchaseDetailView();
  }
}
