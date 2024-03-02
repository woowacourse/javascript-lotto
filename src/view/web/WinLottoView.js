import { $, $$ } from '../../util/domSelector';
import NUMBER from '../../constants/number';

const WinLottoView = {
  renderWinLottoSection() {
    this.renderInfo();
    this.renderNumbersInputs();
  },

  renderInfo() {
    $('#lotto-numbers-length').textContent = NUMBER.LOTTO_NUMBERS_LENGTH;
    $('#bonus-numbers-length').textContent = NUMBER.LOTTO_BONUS_LENGTH;
  },

  renderNumbersInputs() {
    const numberInputHTML = `<input class="number-input" type="number" />`;
    const numbersInputs = Array.from({ length: NUMBER.LOTTO_NUMBERS_LENGTH }, () => numberInputHTML).join('');
    const bonusNumbersInputs = Array.from({ length: NUMBER.LOTTO_BONUS_LENGTH }, () => numberInputHTML).join('');

    $('#winning-numbers-inputs').insertAdjacentHTML('afterbegin', numbersInputs);
    $('#bonus-number').insertAdjacentHTML('afterbegin', bonusNumbersInputs);
  },

  resetWinningLottoNumbers() {
    $$('.number-input').forEach((input) => (input.value = ''));
    $('.number-input').focus();
  },
};

export default WinLottoView;
