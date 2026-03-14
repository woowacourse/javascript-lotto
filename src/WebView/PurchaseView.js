import Validator from "../Validator.js";

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

  disableForm() {
    this.#input.disabled = true;
    this.#input.style.cursor = "not-allowed";
    this.#submitButton.disabled = true;
    this.#submitButton.style.cursor = "not-allowed";
  }

  removeInputValue() {
    this.#input.value = "";
  }

  focusInput() {
    this.#input.focus();
  }

  readMoney() {
    const rawMoney = this.#input.value;
    Validator.notEmptyString(rawMoney);
    Validator.stringIsNumber(rawMoney);

    const money = Number(rawMoney);
    return money;
  }

  bindSubmitButton(successSubmit) {
    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();
      successSubmit();
    });
  }
}

export default PurchaseView;
