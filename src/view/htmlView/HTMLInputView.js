import ButtonController from "./class/ButtonController";
import ElementActivator from "./class/ElementActivator";
import initBody from "./util/initBody";

class HTMLInputView {
  static async readBuyPrice() {
    initBody();
    ElementActivator.activatePriceForm();
    // TODO: 콘솔창과 연결
    ElementActivator.deactivatePriceForm();
    const buyPrice = 1;
    return buyPrice;
  }

  static async readWinngingNumbers() {
    ElementActivator.activateWinningLottoForm();
    // TODO: 콘솔창과 연결
    ElementActivator.deactivateWinningLottoForm();
    const buyPrice = 1;
    return buyPrice;
  }

  static async readBonusNumbers() {
    // TODO: 콘솔창과 연결
    const bonusNumber = 10;
    return bonusNumber;
  }

  static async readRetryChecker() {
    // const retryChecker = await this.#readLineAsync(MESSAGES.INPUT.retryChecker);

    ButtonController.activateModalButtons();
    // TODO: 콘솔창과 연결
    ElementActivator.deactivateModal();
    return 1;
  }
}

export default HTMLInputView;
