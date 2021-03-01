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
    if (
      confirm(
        `다음과 같은 로또 구매 내역을 확정하시겠습니까?

구입 금액: ${this.lottoModel.price}원 (로또 1개 가격: 1000원)          
수동 구매: ${this.lottoModel.lottoList.length}개
자동 구매: ${this.lottoModel.price / 1000 - this.lottoModel.lottoList.length}개`
      ) === false
    ) {
      return;
    }

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

    if (this.lottoModel.isEveryLottoPurchased()) {
      this.onClickAutoPurchaseButton();
    }

    this.lottoView.showPurchaseProgress(
      this.lottoModel.price / 1000,
      this.lottoModel.lottoList.length
    );

    this.lottoView.resetManualPurchaseDetailView();
  }
}
