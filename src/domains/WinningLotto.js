import Validator from './validators/Validator';

class WinningLotto {
  #lottoNumbers = [];

  #bonusNumber = 0;

  constructor(lottoNumbersInput, bonusNumberInput) {
    Validator.checkWinningLottoNumbers(lottoNumbersInput);
    this.#lottoNumbers = lottoNumbersInput
      .split(',')
      .map((lottoNumberInput) => Number(lottoNumberInput));

    Validator.checkBonusNumber(this.#lottoNumbers, bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
  }

  // {number[]}lottoTicket
  #hasBonusNumber(lottoTicket) {
    return lottoTicket.includes(this.#bonusNumber);
  }

  #countMatchedNumber(lottoTicket) {
    return lottoTicket.filter((number) => this.#lottoNumbers.includes(number))
      .length;
  }

  compareLotto(lottoTicket) {
    return {
      isBonus: this.#hasBonusNumber(lottoTicket),
      matchedCount: this.#countMatchedNumber(lottoTicket),
    };
  }
}

export default WinningLotto;
