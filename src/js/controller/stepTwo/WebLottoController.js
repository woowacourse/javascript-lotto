import LottoMachine from '@lotto/model/LottoMachine';
import inputValidator from '@lotto/validator/InputValidator';
import preventFormFromSubmitting from '@lotto/utils/preventFormFromSubmitting';
import ui from '@lotto/view/stepTwo/ui';

class WebLottoController {
  #lottoMachine;

  constructor() {
    preventFormFromSubmitting();
    this.#lottoMachine = new LottoMachine();
    this.init();
  }

  addEvent({ element, event, type }) {
    element.addEventListener(type, event);
  }

  bindAllEvents() {
    this.addEvent({ element: ui.getDomWithName('buyBtn'), event: () => this.buyLotto(), type: 'click' });
    this.addEvent({
      element: ui.getDomWithName('resultBtn'),
      event: () => this.calculateStatistics(),
      type: 'click',
    });
    this.addEvent({ element: ui.getDomWithName('retryBtn'), event: () => this.restartGame(), type: 'click' });
    this.addEvent({
      element: ui.getDomWithName('closeModalBtn'),
      event: () => this.closeModal(),
      type: 'click',
    });
  }

  init() {
    this.bindAllEvents();
  }

  buyLotto() {
    try {
      ui.hideMoneyValidationText();
      const moneyInput = ui.domList.moneyInput.value;
      inputValidator.validateMoneyInput(moneyInput);
      this.#lottoMachine.buyLotto(+moneyInput);
      ui.showRestUI(this.#lottoMachine.lottos);
    } catch (error) {
      ui.showMoneyValidationText(error);
    }
  }

  calculateStatistics() {
    const numberInputs = [...ui.domList.targetNumberInputs];
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
    ui.resetAllInputValues();
    ui.closeModal();
  }

  closeModal() {
    ui.closeModal();
  }
}

export default WebLottoController;
