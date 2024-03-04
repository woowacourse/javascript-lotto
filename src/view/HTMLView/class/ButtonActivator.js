import ClassName from "../util/ClassName";
import Elements from "../util/Elements";
import Events from "../util/Events";
import addClass from "../util/addClass";
import removeClass from "../util/removeClass";

class ButtonActivator {
  static #buttons = Object.keys(Elements.BUTTONS).map(
    (buttonName) => Elements.BUTTONS[buttonName]
  );

  static deactivateButtons() {
    this.#buttons.forEach((button) => {
      this.#hideButton(button);
    });
  }

  static activatePriceButton() {
    const priceButton = Elements.BUTTONS.price;
    this.#revealButton(priceButton);
    priceButton.addEventListener("click", Events.priceButtonClickEvent);
  }

  static deactivatePriceButton() {
    const priceButton = Elements.BUTTONS.price;
    this.#hideButton(priceButton);
    priceButton.removeEventListener("click", Events.priceButtonClickEvent);
  }

  static activateWinningLottoButton() {
    const winningLottoButton = Elements.BUTTONS.winningLotto;
    this.#revealButton(winningLottoButton);
    winningLottoButton.addEventListener(
      "click",
      Events.winningLottoButtonClickEvent
    );
  }

  static deactivateWinningLottoButton() {
    const winningLottoButton = Elements.BUTTONS.winningLotto;
    this.#hideButton(winningLottoButton);
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

    this.#revealButton(modalRetryButton);
    modalRetryButton.addEventListener(
      "click",
      Events.modalRetryButtonClickEvent
    );
    modalRetryButton.focus();
  }

  static #activateModalCloseButton() {
    const modalCloseButton = Elements.BUTTONS.modalClose;

    this.#revealButton(modalCloseButton);
    modalCloseButton.addEventListener(
      "click",
      Events.modalCloseButtonClickEvent
    );
  }

  static #hideButton(button) {
    addClass(button, ClassName.unavailableButton);
    removeClass(button, ClassName.availableButton);
  }

  static #revealButton(button) {
    addClass(button, ClassName.availableButton);
    removeClass(button, ClassName.unavailableButton);
  }
}

export default ButtonActivator;
