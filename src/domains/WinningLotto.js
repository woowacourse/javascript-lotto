import Validator from './validators/Validator';

class WinningLotto {
  #lottoNumbers = [];

  #bonusNumber;

  constructor(lottoNumbers, bonusNumber) {
    Validator.validateLottoTickets(lottoNumbers);
    this.#lottoNumbers = lottoNumbers;

    Validator.validateBonusNumber(lottoNumbers, bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #hasBonusNumber(lottoTicket) {
    return lottoTicket.includes(this.#bonusNumber);
  }

  #countMatchedNumber(lottoTicket) {
    return lottoTicket.filter((number) => this.#lottoNumbers.includes(number))
      .length;
  }

  compareLottos(lottoTicket) {
    return {
      isBonus: this.#hasBonusNumber(lottoTicket),
      matchedCount: this.#countMatchedNumber(lottoTicket),
    };
  }
}

export default WinningLotto;
