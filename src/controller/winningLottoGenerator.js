import executeOrRetryAsync from '../utils/executeOrRetryAsync.js';
import bonusNumberValidator from '../validator/bonusNumberValidator.js';
import commonValidator from '../validator/commonValidator.js';
import lottoNumberValidator from '../validator/lottoNumberValidator.js';
import inputView from '../view/inputView.js';

class WinningLottoGenerator {
  async #readAndValidateWinningLottoNumbers() {
    const winningLottoNumbersInput = await inputView.readWinningLottoNumber();
    commonValidator.validate(winningLottoNumbersInput);
    lottoNumberValidator.validate(winningLottoNumbersInput);

    return winningLottoNumbersInput.map(Number);
  }

  async #readAndValidateBonusNumber(winningLottoNumbers) {
    const bonusNumberInput = await inputView.readBonusNumber();
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
