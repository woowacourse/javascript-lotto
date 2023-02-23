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
    domList.buyBtn.addEventListener('click', this.buyLotto.bind(this));
    domList.resultBtn.addEventListener('click', this.calculateStatistics.bind(this));
    domList.retryBtn.addEventListener('click', this.restartGame.bind(this));
    domList.closeModalBtn.addEventListener('click', this.closeModal.bind(this));
  }

  init() {
    this.addEvents();
  }

  buyLotto() {
    try {
      ui.hideMoneyValidationText();
      const moneyInput = domList.moneyInput.value;
      inputValidator.validateMoneyInput(moneyInput);
      this.#lottoMachine.buyLotto(+moneyInput);
      ui.showRestUI(this.#lottoMachine.lottos);
    } catch (error) {
      ui.showMoneyValidationText(error);
    }
  }

  calculateStatistics() {
    const numberInputs = [...domList.targetNumberInputs];
    const winningNumberInput = [...numberInputs].map(input => input.value);
    winningNumberInput.pop();
    const bonusNumberInput = numberInputs[numberInputs.length - 1].value;

    try {
      ui.hideTargetNumberValidationText();
      inputValidator.validateWinningNumberInput(winningNumberInput.join(','));
      inputValidator.validateBonusNumberInput(bonusNumberInput);
      ui.showFinalResult(this.#lottoMachine.calculateStatistics(winningNumberInput, bonusNumberInput));
    } catch (error) {
      ui.showTargetNumberValidationText(error);
    }
  }

  restartGame() {
    ui.hideRestUI();
    resetAllInputValues();
    ui.closeModal();
  }

  closeModal() {
    ui.closeModal();
  }
}

export default WebLottoController;
