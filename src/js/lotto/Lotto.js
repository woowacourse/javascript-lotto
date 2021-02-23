import {
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
  $priceSubmitForm,
  $winningNumberForm,
  $restartButton,
} from "../elements.js";
import { onModalClose } from "../utils.js";
import LottoController from "./LottoController.js";

export default class Lotto {
  constructor() {
    this.lottoController = new LottoController();
  }

  onSubmitPrice(e) {
    e.preventDefault();
    const price = e.target.elements["price-input"].value;

    this.lottoController.purchase(price);
  }

  onToggleLottoNumbers(e) {
    this.lottoController.toggleLottoNumbers(e.target.checked);
  }

  onSubmitResultNumber(e) {
    e.preventDefault();
    const inputs = e.target.elements;
    const winningNumber = Array.from(inputs["winning-number"]).map((v) =>
      Number(v.value)
    );
    const bonusNumber = Number(inputs["bonus-number"].value);

    this.lottoController.openPrizeTableModal(winningNumber, bonusNumber);
  }

  onRestart() {
    this.lottoController.reset();
  }

  init() {
    $priceSubmitForm.addEventListener("submit", this.onSubmitPrice.bind(this));

    $lottoNumbersToggleButton.addEventListener(
      "change",
      this.onToggleLottoNumbers.bind(this)
    );

    $winningNumberForm.addEventListener(
      "submit",
      this.onSubmitResultNumber.bind(this)
    );

    $restartButton.addEventListener("click", this.onRestart.bind(this));

    $modalClose.addEventListener("click", () => onModalClose($modal));
  }
}
