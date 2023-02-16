import Validation from '../Validation';

class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers.sort((a, b) => a - b);
    Validation.validateLottoNumbers(this.lottoNumbers);
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
