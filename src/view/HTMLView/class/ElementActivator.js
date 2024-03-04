import ClassName from "../util/ClassName";
import Elements from "../util/Elements";
import Events from "../util/Events";
import addClass from "../util/addClass";
import removeClass from "../util/removeClass";
import ButtonController from "./ButtonController";
import InputController from "./InputController";

class ElementActivator {
  static activatePriceForm() {
    ButtonController.activatePriceButton();
    InputController.activatePriceInput();
    InputController.activateBonusNumberInput();
  }

  static deactivatePriceForm() {
    ButtonController.deactivatePriceButton();
    InputController.deactivatePriceInput();
  }

  static activateWinningLottoForm() {
    const winningLottoForm = Elements.FORMS.winningLotto;
    removeClass(winningLottoForm, ClassName.visibilityHidden);
    ButtonController.activateWinningLottoButton();
    InputController.activateWinningLottoInput();
    InputController.activateBonusNumberInput();
  }

  static deactivateWinningLottoForm() {
    ButtonController.deactivateWinningLottoButton();
    InputController.deactivateWinningLottoInput();
    InputController.deactivateBonusNumberInput();
  }

  static activateModal() {
    const modalDiv = Elements.ASIDE.modal;
    removeClass(modalDiv, ClassName.visibilityHidden);
    ButtonController.activateModalButtons();
    modalDiv.addEventListener("keydown", (event) => {
      const escKey = 27;
      if (event.keyCode === escKey) Events.modalCloseButtonClickEvent(event);
    });
  }

  static deactivateModal() {
    const modalDiv = Elements.ASIDE.modal;
    addClass(modalDiv, ClassName.visibilityHidden);
  }
}

export default ElementActivator;
