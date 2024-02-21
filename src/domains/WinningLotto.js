import Validator from './validators/Validator';

class WinningLotto {
  #lottoNumbers = [];

  #bonusNumber = 0;

  constructor(lottoNumbersInput, bonusNumberInput) {
    Validator.validateLottoTickets(lottoNumbersInput);
    this.#lottoNumbers = lottoNumbersInput;

    Validator.validateBonusNumber(lottoNumbersInput, bonusNumberInput);
    this.#bonusNumber = bonusNumberInput;
  }

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
