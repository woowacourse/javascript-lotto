import { $, $$ } from '../utils/dom.js';
import LottoValidator from '../validators/LottoValidator.js';

class LottoNumbersForm {
  static setLottoNumbers() {
    const winningNumbers = Array.from($$('.lotto-number-input')).map((input) =>
      Number(input.value),
    );
    const bonusNumber = Number($('#bonus-number-input').value);
    return { winningNumbers, bonusNumber };
  }

  static validateLottoNumbers(lottoNumbers) {
    try {
      LottoValidator.validateWinningNumbers(lottoNumbers.winningNumbers);
      LottoValidator.validateBonusNumber(
        lottoNumbers.winningNumbers,
        lottoNumbers.bonusNumber,
      );
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  }
}

export default LottoNumbersForm;
