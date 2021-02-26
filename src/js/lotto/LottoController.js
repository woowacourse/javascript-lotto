import { onModalShow } from "../utils.js";
import { $modal } from "../elements.js";
import {
  INVALID_PRICE_ERROR,
  INVALID_WINNGNUMBER_ERROR,
  DUPLICATED_WINNINGNUMBER_ERROR,
} from "../constants.js";
import {
  isValidPrice,
  isNumbersInRange,
  isDistinctNumbers,
} from "../validates.js";
export default class LottoController {
  constructor(lottoModel, lottoView) {
    this.lottoModel = lottoModel;
    this.lottoView = lottoView;
  }

  onSubmitPrice(price) {
    this.lottoView.resetLottoView(); // 구입 금액 재입력 했을 경우
    this.lottoModel.resetLottoList();

    if (!isValidPrice(price)) {
      alert(INVALID_PRICE_ERROR);
      this.lottoView.resetLottoView();

      return;
    }
    this.lottoModel.setPrice(price);
    this.lottoView.showPurchase(
      this.lottoModel.lottoList,
      this.lottoModel.price
    );
  }

  onToggleLottoNumbers(e) {
    e.target.checked
      ? this.lottoView.showTicketDetails(this.lottoModel.lottoList)
      : this.lottoView.showTickets(this.lottoModel.lottoList.length);
  }

  onSubmitResultNumber(winningNumber, bonusNumber) {
    const numbers = [...winningNumber, bonusNumber];
    if (!isNumbersInRange(numbers, 1, 45)) {
      alert(INVALID_WINNGNUMBER_ERROR);

      return;
    }
    if (!isDistinctNumbers(numbers)) {
      alert(DUPLICATED_WINNINGNUMBER_ERROR);

      return;
    }

    onModalShow($modal);
  }
}
