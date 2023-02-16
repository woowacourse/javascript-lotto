import Validation from '../Validation';

class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers.sort((a, b) => a - b);
    Validation.validateDistinctNumbers(this.lottoNumbers);
    Validation.validateNumberArray(this.lottoNumbers);
    Validation.validateNumbersRange(this.lottoNumbers);
  }

  getLottoNumbers() {
    return this.lottoNumbers;
  }

  countMatchingNumbers(winningNumbers) {
    return winningNumbers.filter((number) => this.lottoNumbers.includes(number)).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.lottoNumbers.includes(bonusNumber);
  }
}

export default Lotto;
