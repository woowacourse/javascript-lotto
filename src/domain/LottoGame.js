import { inputView } from "../view/inputView";
import { validatePurchaseAmount } from "./validator";

export class LottoGame {
  async play() {
    const purchaseAmount = await this.readPurchaseAmount();
  }

  async readPurchaseAmount() {
    const purchaseAmountString = await inputView.readline("로또 구입 금액을 입력해 주세요.");
    validatePurchaseAmount(purchaseAmountString);
    return Number(purchaseAmountString);
  }
}
