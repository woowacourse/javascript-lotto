import ButtonController from "./class/ButtonActivator";
import ConsoleImplementation from "./class/ConsoleImplementation";
import ElementActivator from "./class/ElementActivator";
import ClassName from "./util/ClassName";
import Elements from "./util/Elements";
import addClass from "./util/addClass";

class HTMLInputView {
  static #hiddenTargets = [
    Elements.SPANS.purchasedLotto,
    Elements.SECTION.purchasedLotto,
    Elements.FORMS.winningLotto,
    Elements.ASIDE.modal,
  ];

  static async readBuyPrice() {
    this.#initBody();
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

  static #initBody = () => {
    this.#hiddenTargets.forEach((element) => {
      addClass(element, ClassName.visibilityHidden);
    });
  };
}

export default HTMLInputView;
