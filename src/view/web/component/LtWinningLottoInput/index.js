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
  #value = null;

  static get observedAttributes() {
    return ['placeholder'];
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    if (!(value instanceof WinningLotto)) {
      this.#value = null;
      this.$winningNumberInputs.forEach(($input) => {
        $input.value = null;
      });
      this.$bonusNumberInput.value = null;
      return;
    }
    this.#value = value;

    value.getLottoNumbers().forEach((lottoNumber, index) => {
      this.$winningNumberInputs[index].value = lottoNumber;
    });
    this.$bonusNumberInput.value = value.getBonusNumber();
  }

  #validate() {
    const lottoNumbers = this.$winningNumberInputs.map(($input) => Number($input.value));
    const bonusNumber = Number(this.$bonusNumber.value);

    try {
      this.#value = new WinningLotto(lottoNumbers, bonusNumber);
    } catch (error) {
      this.setValidation(error.message);
      return;
    }
    this.setValidation(null);
  }

  setValidation(message) {
    super.setValidation(message);
    const $firstInput = this.shadowRoot.querySelector('lt-text-input');
    $firstInput.errorMessage = message;
  }

  formResetCallback() {
    this.value = null;
    this.setValidation(null);
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
