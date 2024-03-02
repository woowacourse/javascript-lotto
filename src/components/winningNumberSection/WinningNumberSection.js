import './WinningNumberSection.css';
import CONFIG from '../../constants/config';
import Component from '../core/Component';
import { DOM_MESSAGE } from '../../constants/message';
import dom from '../../utils/dom';
import winningNumbersValidator from '../../validators/winningNumbersValidator';
import bonusNumberValidator from '../../validators/bonusNumberValidator';

class WinningNumberSection extends Component {
  template() {
    return `
        <div>${DOM_MESSAGE.LOTTO_NUMBERS_INPUT}</div>
        <form id="lottoNumberForm">
          <div id="lottoNumberWrapper">
            <div id="winningNumberWrapper">
              <div>${DOM_MESSAGE.WINNING_NUMBERS}</div>
              ${Array.from({ length: CONFIG.LOTTO_LENGTH })
                .map(() => `<input class="winningNumberInput" name="winningNumberInput" type="number" />`)
                .join(' ')}
              <div id="lottoNumberError" class="hidden"></div>
            </div>
            <div id="bonusNumberWrapper">
              <div>${DOM_MESSAGE.BONUS_NUMBER}</div>
              <input id="bonusNumberInput" name="bonusNumberInput" type="number"/>
            </div>
          </div>
          <button id="lottoResultButton" class="button">${DOM_MESSAGE.LOTTO_RESULT_BUTTON}</button>
        </form>`;
  }

  mounted() {
    dom.$('.winningNumberInput').focus();
  }

  setEvent() {
    const $lottoNumberForm = dom.$('#lottoNumberForm');
    const $lottoNumberError = dom.$('#lottoNumberError');
    $lottoNumberForm.addEventListener('submit', e => {
      e.preventDefault();
      const winningNumbers = this.readWinningNumbers();
      if (!winningNumbers) return;
      const bonusNumber = this.readBonusNumber(winningNumbers);
      if (!bonusNumber) return;
      $lottoNumberError.classList.add('hidden');
      this.props.lottoController.handleLottoResult(winningNumbers, bonusNumber);
      this.lottoResultModalOpen();
    });
  }

  readWinningNumbers() {
    const $lottoNumberForm = dom.$('#lottoNumberForm');
    const $lottoNumberError = dom.$('#lottoNumberError');
    const winningNumbersInputList = [...$lottoNumberForm.querySelectorAll('.winningNumberInput')];
    const winningNumbersInput = winningNumbersInputList.map(winningNumber => parseInt(winningNumber.value, 10));
    const winningNumbers = this.validateWinningNumbers(winningNumbersInput, $lottoNumberError);
    if (!winningNumbers) return false;
    return winningNumbers;
  }

  validateWinningNumbers(winningNumbers, $lottoNumberError) {
    try {
      winningNumbersValidator.validate(winningNumbers);
      return winningNumbers;
    } catch (error) {
      // eslint-disable-next-line no-param-reassign
      $lottoNumberError.textContent = error.message;
      $lottoNumberError.classList.remove('hidden');
      return false;
    }
  }

  readBonusNumber(winningNumbers) {
    const $lottoNumberForm = dom.$('#lottoNumberForm');
    const $lottoNumberError = dom.$('#lottoNumberError');
    const bonusNumberInput = $lottoNumberForm.elements.bonusNumberInput.value;
    const bonusNumber = this.validateBonusNumber({ bonusNumberInput, winningNumbers }, $lottoNumberError);
    if (!bonusNumber) return false;
    return bonusNumber;
  }

  validateBonusNumber(lottoNumbers, $lottoNumberError) {
    try {
      const { bonusNumberInput, winningNumbers } = lottoNumbers;
      const bonusNumber = parseInt(bonusNumberInput, 10);
      bonusNumberValidator.validate(bonusNumber, winningNumbers);
      return bonusNumber;
    } catch (error) {
      // eslint-disable-next-line no-param-reassign
      $lottoNumberError.textContent = error.message;
      $lottoNumberError.classList.remove('hidden');
      return false;
    }
  }

  lottoResultModalOpen() {
    const $lottoNumberError = document.getElementById('lottoNumberError');
    const $modalBackground = document.getElementById('modalBackground');
    const $lottoResultModal = document.getElementById('lottoResultModal');
    document.body.style.overflow = 'hidden';
    $lottoNumberError.classList.add('hidden');
    $modalBackground.classList.remove('hidden');
    $lottoResultModal.classList.remove('hidden');
  }
}

export default WinningNumberSection;
