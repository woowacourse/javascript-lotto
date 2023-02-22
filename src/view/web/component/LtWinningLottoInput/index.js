import WinningLotto from '../../../../domain/WinningLotto';
import LtFormControl from '../LtFormControl';
import LtTextInput from '../LtTextInput';
import template from './index.html';

class LtWinningLottoInput extends LtFormControl {
  /** @type {HTMLFieldSetElement} */
  $winningNumbers;

  /** @type {HTMLFieldSetElement} */
  $bonusNumber;

  /** @type {LtTextInput[]} */
  $winningNumberInputs;

  /** @type {LtTextInput} */
  $bonusNumberInput;

  /** @type {WinningLotto | null} */
  #winningLotto = null;

  static get observedAttributes() {
    return ['placeholder'];
  }

  getWinningLotto() {
    return this.#winningLotto;
  }

  setWinningLotto(winningLotto) {
    if (!(winningLotto instanceof WinningLotto)) {
      this.#winningLotto = null;
      this.$winningNumberInputs.forEach(($input) => {
        $input.setText(null);
      });
      this.$bonusNumberInput.setText(null);
      return;
    }
    this.#winningLotto = winningLotto;

    winningLotto.getLottoNumbers().forEach((lottoNumber, index) => {
      this.$winningNumberInputs[index].setText(lottoNumber);
    });
    this.$bonusNumberInput.setText(winningLotto.getBonusNumber());
  }

  #validate() {
    const lottoNumbers = this.$winningNumberInputs.map(($input) => Number($input.getText()));
    const bonusNumber = Number(this.$bonusNumberInput.getText());

    try {
      this.#winningLotto = new WinningLotto(lottoNumbers, bonusNumber);
    } catch (error) {
      this.setValidation(false, error.message);
      return;
    }
    this.setValidation(true);
  }

  setValidation(valid, message = null) {
    super.setValidation(valid, message);
    /** @type {LtTextInput} */
    const $firstInput = this.shadowRoot.querySelector('lt-text-input');
    $firstInput.setErrorMessage(message);
  }

  formResetCallback() {
    this.setWinningLotto(null);
    this.setValidation(false);
  }

  getRenderContent() {
    return template;
  }

  render() {
    super.render();

    this.$winningNumberInputs = [...this.$winningNumbers.querySelectorAll('lt-text-input')];
    this.$bonusNumberInput = this.$bonusNumber.querySelector('lt-text-input');

    [...this.shadowRoot.querySelectorAll('lt-text-input')].forEach(($input) => {
      $input.addEventListener('change', (event) => {
        this.#validate();
      });
    });
  }
}

export default LtWinningLottoInput;
