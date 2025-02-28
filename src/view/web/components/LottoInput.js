import DomHelper from "../../../utils/DomHelper.js";
import Validator from "../../../domain/Validator.js";
import Constants from "../../../constant/Constants.js";

export default class LottoInput {
  constructor(onPurchase) {
    this.inputElement = DomHelper.querySelector(".input__money");
    this.buttonElement = DomHelper.querySelector(".lotto__input__btn");
    this.purchaseMessageElement = DomHelper.querySelector(
      ".lotto__box p:nth-of-type(2)",
    );
    this.onPurchase = onPurchase;

    this.init();
  }

  init() {
    this.buttonElement.addEventListener(
      "click",
      this.handlePurchase.bind(this),
    );

    this.inputElement.addEventListener(
      "keydown",
      this.handleKeyDown.bind(this),
    );

    this.purchaseMessageElement.style.display = "none";
  }

  handleKeyDown(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      if (!this.buttonElement.disabled) {
        this.handlePurchase();
      }
    }
  }

  disableButton() {
    this.buttonElement.disabled = true;
    this.buttonElement.style.backgroundColor = "#cccccc";
  }

  enableButton() {
    this.buttonElement.disabled = false;
    this.buttonElement.style.backgroundColor = "";
  }

  handlePurchase() {
    try {
      const rawPriceString = this.inputElement.value;
      Validator.isPrice(rawPriceString);

      const lottoNum = Number(rawPriceString) / Constants.LOTTO.UNIT;

      this.purchaseMessageElement.style.display = "block";
      this.purchaseMessageElement.textContent = `총 ${lottoNum}개를 구매하였습니다.`;
      this.disableButton();

      this.onPurchase(lottoNum);
    } catch (error) {
      alert(error.message);
    }
  }

  reset() {
    this.inputElement.value = "";
    this.purchaseMessageElement.style.display = "none";
    this.enableButton();
  }
}
