import Validation from '../Validation.js';

class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
    Validation.validateDistinctNumbers(this.lottoNumbers);
    Validation.validateNumberArray(this.lottoNumbers);
    Validation.validateNumberRange(this.lottoNumbers);
  }

  countMatchingNumbers(winningNumbers) {
    return winningNumbers.filter((number) => this.lottoNumbers.includes(number)).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.lottoNumbers.includes(bonusNumber);
  }
}

export default Lotto;
