import ButtonController from "./class/ButtonController";
import ConsoleImplementation from "./class/ConsoleImplementation";
import ElementActivator from "./class/ElementActivator";
import initBody from "./util/initBody";

class HTMLInputView {
  static async readBuyPrice() {
    initBody();
    ElementActivator.activatePriceForm();
    const buyPrice = await this.#readLineAsync();
    ElementActivator.deactivatePriceForm();

    return buyPrice;
  }

  static async readWinningNumbers() {
    ConsoleImplementation.reset();
    ElementActivator.activateWinningLottoForm();
    const winningLotto = await this.#readLineAsync();
    return winningLotto;
  }

  static async readBonusNumber() {
    const bonusNumber = await this.#readLineAsync();

    ElementActivator.deactivateWinningLottoForm();
    return bonusNumber;
  }

  static async readRetryChecker() {
    ButtonController.activateModalButtons();
    const retryChecker = await this.#readLineAsync();
    ElementActivator.deactivateModal();
    return retryChecker;
  }

  static #readLineAsync() {
    return new Promise((resolve) => {
      ConsoleImplementation.waitReading(resolve);
    });
  }
}

export default HTMLInputView;
