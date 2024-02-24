import executeOrRetryAsync from '../utils/executeOrRetryAsync.js';
import bonusNumberValidator from '../validator/BonusNumberValidator.js';
import commonValidator from '../validator/CommonValidator.js';
import lottoNumberValidator from '../validator/LottoNumberValidator.js';
import InputView from '../view/InputView.js';

class WinningLottoGenerator {
  async #readAndValidateWinningLottoNumbers() {
    const winningLottoNumbersInput = await InputView.readWinningLottoNumber();
    commonValidator.validate(winningLottoNumbersInput);
    lottoNumberValidator.validate(winningLottoNumbersInput);

    return winningLottoNumbersInput.map(Number);
  }

  async #readAndValidateBonusNumber(winningLottoNumbers) {
    const bonusNumberInput = await InputView.readBonusNumber();
    commonValidator.validate(bonusNumberInput.trim());
    bonusNumberValidator.validate({
      winningLottoNumbers,
      bonusNumber: bonusNumberInput,
    });

    return Number(bonusNumberInput);
  }

  async createWinningLotto() {
    const winningLottoNumbers = await executeOrRetryAsync({
      asyncFn: this.#readAndValidateWinningLottoNumbers,
      handleError: console.log,
    });
    const bonusNumber = await executeOrRetryAsync({
      asyncFn: () => this.#readAndValidateBonusNumber(winningLottoNumbers),
      handleError: console.log,
    });

    return { winningLottoNumbers, bonusNumber };
  }
}

export default WinningLottoGenerator;
