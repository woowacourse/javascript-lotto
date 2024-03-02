import ClassName from "../util/ClassName";
import Elements from "../util/Elements";
import Events from "../util/Events";
import addClass from "../util/addClass";
import removeClass from "../util/removeClass";

class ButtonController {
  static #buttons = Object.keys(Elements.BUTTONS).map(
    (buttonName) => Elements.BUTTONS[buttonName]
  );

  static deactivateButtons() {
    this.#buttons.forEach((button) => {
      this.#releaseButton.bind(this)(button);
    });
  }

  static activatePriceButton() {
    const priceButton = Elements.BUTTONS.price;
    this.#initButton(priceButton);
    priceButton.addEventListener("click", Events.priceButtonClickEvent);
  }

  static deactivatePriceButton() {
    const priceButton = Elements.BUTTONS.price;
    this.#releaseButton(priceButton);
    priceButton.removeEventListener("click", Events.priceButtonClickEvent);
  }

  static activateWinningLottoButton() {
    const winningLottoButton = Elements.BUTTONS.winningLotto;
    this.#initButton(winningLottoButton);
    winningLottoButton.addEventListener(
      "click",
      Events.winningLottoButtonClickEvent
    );
  }

  static deactivateWinningLottoButton() {
    const winningLottoButton = Elements.BUTTONS.winningLotto;
    this.#releaseButton(winningLottoButton);
    winningLottoButton.removeEventListener(
      "click",
      Events.winningLottoButtonClickEvent
    );
  }

  static activateModalButtons() {
    this.#activateModalRetryButton();
    this.#activateModalCloseButton();
  }

  static #activateModalRetryButton() {
    const modalRetryButton = Elements.BUTTONS.modalRetry;

    this.#initButton(modalRetryButton);
    modalRetryButton.addEventListener(
      "click",
      Events.modalRetryButtonClickEvent
    );
    modalRetryButton.focus();
  }

  static #activateModalCloseButton() {
    const modalCloseButton = Elements.BUTTONS.modalClose;

    this.#initButton(modalCloseButton);
    modalCloseButton.addEventListener(
      "click",
      Events.modalCloseButtonClickEvent
    );
  }

  static #initButton(button) {
    this.#activateButtonClass(button);

    button.removeEventListener("click", Events.preventDefault);
  }

  static #releaseButton(button) {
    this.#deactivateButtonClass(button);

    button.addEventListener("click", Events.preventDefault);
  }

  static #deactivateButtonClass(button) {
    addClass(button, ClassName.unavailableButton);
    removeClass(button, ClassName.availableButton);
  }

  static #activateButtonClass(button) {
    addClass(button, ClassName.availableButton);
    removeClass(button, ClassName.unavailableButton);
  }
}

export default ButtonController;
