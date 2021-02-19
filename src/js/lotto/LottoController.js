import LottoModel from "./LottoModel.js";
import LottoView from "./LottoView.js";
import { INVALID_PRICE_ERROR } from "./constants.js";

export default function LottoController() {
  this.lottoModel = new LottoModel();
  this.lottoView = new LottoView();

  this.isValidPrice = (price) => {
    return price > 0 && price % 1000 === 0; // price는 1000원 단위의 양수여야 한다.
  };

  this.onClickPriceSubmitButton = (price) => {
    if (!this.isValidPrice(price)) {
      alert(INVALID_PRICE_ERROR);
      this.lottoView.resetLottoView();

      return;
    }
    this.lottoModel.buy(price);
    this.lottoView.showConfirmation(this.lottoModel.lottoList);
  };

  this.onChangeLottoNumbersToggleButton = (e) => {
    this.lottoView.paintLottoList(this.lottoModel.lottoList, e.target.checked);
  };
}
