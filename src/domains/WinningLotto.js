import Validator from './validators/Validator';

class WinningLotto {
  #lottoNumbers = [];

  #bonusNumber = 0;

  // TODO: Validator를 숫자를 검사할건지, 문자를 검사할 건지 정해야 한다. (파라미터 타입 통일)
  constructor(lottoNumbersInput, bonusNumberInput) {
    Validator.validateWinningNumbersForm(lottoNumbersInput);

    const lottoNumbers = lottoNumbersInput
      .split(',')
      .map((numberInput) => Number(numberInput));

    Validator.validateLottoTickets(lottoNumbers);
    this.#lottoNumbers = lottoNumbers;

    const bonuseNumber = Number(bonusNumberInput);
    Validator.validateBonusNumber(lottoNumbers, bonuseNumber);

    this.#bonusNumber = bonuseNumber;
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
