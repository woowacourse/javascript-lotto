import { $, $$ } from '../../util/domSelector';

const WinLottoView = {
  renderNumbersInputs() {
    const numberInput = `<input class="number-input" type="number" />`;
    const numbersInputs = Array.from({ length: 6 }, () => numberInput).join('');
    $('#winning-numbers-inputs').insertAdjacentHTML('afterbegin', numbersInputs);
    $('#bonus-number').insertAdjacentHTML('afterbegin', numberInput);
  },

  resetWinningLottoNumbers() {
    $$('.number-input').forEach((input) => (input.value = ''));
    $('.number-input').focus();
  },
};

export default WinLottoView;
