import executeOrRetryAsync from '../utils/executeOrRetryAsync.js';
import bonusNumberValidator from '../validator/bonusNumberValidator.js';
import commonValidator from '../validator/commonValidator.js';
import lottoNumberValidator from '../validator/lottoNumberValidator.js';

class WinningLottoGenerator {
  #input;
  #isWeb;

  constructor({ inputView, isWeb }) {
    this.#input = inputView;
    this.#isWeb = isWeb;
  }

  // async createWinningLotto() {
  //   const winningLottoNumbers = await executeOrRetryAsync({
  //     asyncFn: () => this.#readAndValidateWinningLottoNumbers(),
  //     handleError: this.#isWeb ? alert : console.log,
  //   });
  //   const bonusNumber = await executeOrRetryAsync({
  //     asyncFn: () => this.#readAndValidateBonusNumber(winningLottoNumbers),
  //     handleError: this.#isWeb ? alert : console.log,
  //   });
  //   return { winningLottoNumbers, bonusNumber };
  // }

  async createWinningLotto() {
    if (this.#isWeb) {
      return this.#createWinningLottoForWeb();
    } else {
      return this.#createWinningLottoWithRetry();
    }
  }

  async #createWinningLottoForWeb() {
    try {
      const winningLottoNumbers = await this.#readAndValidateWinningLottoNumbers();
      const bonusNumber = await this.#readAndValidateBonusNumber(winningLottoNumbers);
      return { winningLottoNumbers, bonusNumber };
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  async #createWinningLottoWithRetry() {
    const winningLottoNumbers = await executeOrRetryAsync({
      asyncFn: () => this.#readAndValidateWinningLottoNumbers(),
      handleError: console.log,
    });
    const bonusNumber = await executeOrRetryAsync({
      asyncFn: () => this.#readAndValidateBonusNumber(winningLottoNumbers),
      handleError: console.log,
    });
    return { winningLottoNumbers, bonusNumber };
  }

  async #readAndValidateWinningLottoNumbers() {
    const winningLottoNumbersInput = await this.#input.readWinningLottoNumber();
    commonValidator.validate(winningLottoNumbersInput);
    lottoNumberValidator.validate(winningLottoNumbersInput);

    return winningLottoNumbersInput.map(Number);
  }
  async #readAndValidateBonusNumber(winningLottoNumbers) {
    const bonusNumberInput = await this.#input.readBonusNumber();
    commonValidator.validate(bonusNumberInput.trim());
    bonusNumberValidator.validate({
      winningLottoNumbers,
      bonusNumber: bonusNumberInput,
    });

    return Number(bonusNumberInput);
  }
}

export default WinningLottoGenerator;
