import { LOTTO } from "../constants";
import Validator from "../Validator";

class PurchaseView {
  #form;
  #input;
  #submitButton;

  constructor() {
    this.#form = document.querySelector(".purchase-form");
    this.#input = document.querySelector(".purchase-form__input");
    this.#submitButton = document.querySelector(".purchase-form__submit-btn");
  }

  init() {
    this.#form.reset();
    this.#input.disabled = false;
    this.#input.style.cursor = "";
    this.#submitButton.disabled = false;
    this.#submitButton.style.cursor = "pointer";
  }

  readMoney() {
    const rawMoney = this.#input.value;
    Validator.notEmptyString(rawMoney);
    Validator.stringIsNumber(rawMoney);

    const money = Number(rawMoney);
    return money;
  }

  // 도메인 검증 나중에 분리 생각하자
  #validateMoney(money) {
    Validator.numberDivided(money, LOTTO.PRICE);
    Validator.positiveNumber(money);
  }

  bindSubmitButton(successSubmit) {
    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const money = this.readMoney();
        this.#validateMoney(money);

        // 구입 성공한 이후
        this.#input.disabled = true;
        this.#input.style.cursor = "not-allowed";
        this.#submitButton.disabled = true;
        this.#submitButton.style.cursor = "not-allowed";

        successSubmit(money);
      } catch (error) {
        alert(error.message);
        this.#input.focus();
      } finally {
        this.#input.value = "";
      }
    });
  }
}

export default PurchaseView;
