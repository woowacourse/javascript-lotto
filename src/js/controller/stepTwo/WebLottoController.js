import LottoMachine from '@lotto/model/LottoMachine';
import inputValidator from '@lotto/validator/InputValidator';
import preventFormFromSubmitting from '@lotto/utils/preventFormFromSubmitting';
import ui from '@lotto/view/stepTwo/ui';
import domList from '@lotto/view/stepTwo/domList';
import resetAllInputValues from '@lotto/utils/resetAllInputValues';

class WebLottoController {
  #lottoMachine;

  constructor() {
    preventFormFromSubmitting();
    this.#lottoMachine = new LottoMachine();
    this.init();
  }

  addEvents() {
    this.buyLotto();
    this.calculateStatistics();
    this.restartGame();
    this.closeModal();
  }

  init() {
    this.addEvents();
  }

  buyLotto() {
    domList.buyBtn.addEventListener('click', event => {
      try {
        event.stopImmediatePropagation();
        ui.hideMoneyValidationText();
        const moneyInput = domList.moneyInput.value;
        inputValidator.validateMoneyInput(moneyInput);
        this.#lottoMachine.buyLotto(+moneyInput);
        ui.showRestUI(this.#lottoMachine.lottos);
      } catch (error) {
        ui.showMoneyValidationText(error);
      }
    });
  }

  calculateStatistics() {
    domList.resultBtn.addEventListener('click', event => {
      const numberInputs = [...domList.targetNumberInputs];
      const winningNumberInput = [...numberInputs].map(input => input.value);
      winningNumberInput.pop();
      const bonusNumberInput = numberInputs[numberInputs.length - 1].value;

      try {
        event.stopImmediatePropagation();
        ui.hideTargetNumberValidationText();
        inputValidator.validateWinningNumberInput(winningNumberInput.join(','));
        inputValidator.validateBonusNumberInput(bonusNumberInput);
        ui.showFinalResult(this.#lottoMachine.calculateStatistics(winningNumberInput, bonusNumberInput));
      } catch (error) {
        ui.showTargetNumberValidationText(error);
      }
    });
  }

  restartGame() {
    domList.retryBtn.addEventListener('click', event => {
      event.stopImmediatePropagation();
      ui.hideRestUI();
      resetAllInputValues();
      ui.closeModal();
    });
  }

  closeModal() {
    domList.closeModalBtn.addEventListener('click', event => {
      event.stopImmediatePropagation();
      ui.closeModal();
    });
  }
}

export default WebLottoController;
