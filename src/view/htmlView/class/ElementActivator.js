import ClassName from "../util/ClassName";
import Elements from "../util/Elements";
import Events from "../util/Events";
import addClass from "../util/addClass";
import removeClass from "../util/removeClass";
import ButtonActivator from "./ButtonActivator";
import InputActivator from "./InputActivator";

class ElementActivator {
  static activatePriceForm() {
    ButtonActivator.activatePriceButton();
    InputActivator.activatePriceInput();
    InputActivator.activateBonusNumberInput();
  }

  static deactivatePriceForm() {
    ButtonActivator.deactivatePriceButton();
    InputActivator.deactivatePriceInput();
  }

  static activateWinningLottoForm() {
    const winningLottoForm = Elements.FORMS.winningLotto;
    removeClass(winningLottoForm, ClassName.visibilityHidden);
    ButtonActivator.activateWinningLottoButton();
    InputActivator.activateWinningLottoInput();
    InputActivator.activateBonusNumberInput();
  }

  static deactivateWinningLottoForm() {
    ButtonActivator.deactivateWinningLottoButton();
    InputActivator.deactivateWinningLottoInput();
    InputActivator.deactivateBonusNumberInput();
  }

  static activateModal() {
    const modalDiv = Elements.ASIDE.modal;
    removeClass(modalDiv, ClassName.visibilityHidden);
    ButtonActivator.activateModalButtons();
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
