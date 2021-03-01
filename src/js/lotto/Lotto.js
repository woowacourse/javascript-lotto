import {
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
  $priceSubmitForm,
  $winningNumberForm,
  $restartButton,
  $purchaseForm,
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

    this.lottoController.initLottoPurchase(price);
  }

  onPurchase(e) {
    e.preventDefault();
    this.lottoController.purchase(e.target.elements);
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
    $purchaseForm.addEventListener("submit", this.onPurchase.bind(this));
    $lottoNumbersToggleButton.addEventListener(
      "change",
      this.onToggleLottoNumbers.bind(this)
    );

    $restartButton.addEventListener("click", this.onRestart.bind(this));
    $modalClose.addEventListener("click", () => onModalClose($modal));
    $winningNumberForm.addEventListener(
      "submit",
      this.onSubmitResultNumber.bind(this)
    );
  }
}
