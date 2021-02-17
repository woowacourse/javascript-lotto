import LottoModel from "./LottoModel.js";
import LottoView from "./LottoView.js";
import { INVALID_PRICE_ERROR } from "./constants.js";

export default function LottoController() {
  this.model = new LottoModel();
  this.view = new LottoView();

  this.isValidPrice = (price) => {
    return price > 0 && price % 1000 === 0; // price는 1000원 단위의 양수여야 한다.
  };

  this.onClickPriceSubmitButton = (price) => {
    if (!this.isValidPrice(price)) {
      alert(INVALID_PRICE_ERROR);
      this.view.resetLottoView();

      return;
    }
    const numOfLottoes = price / 1000;
    this.model.createLottoes(numOfLottoes);
    this.view.showConfirmation(this.model.lottoList);
  };

  this.onChangeLottoNumbersToggleButton = (e) => {
    this.view.paintLottoList(this.model.lottoList, e.target.checked);
  };
}
