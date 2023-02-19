import Validation from '../Validation';

class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    Validation.validateLottoNumbers(lottoNumbers);
    this.#lottoNumbers = lottoNumbers.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  countMatchingNumbers(winningNumbers) {
    return winningNumbers.filter((number) => this.#lottoNumbers.includes(number)).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#lottoNumbers.includes(bonusNumber);
  }
}

export default Lotto;
