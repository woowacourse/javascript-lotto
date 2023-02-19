import Validation from '../Validation';

class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers.sort((a, b) => a - b);
    Validation.validateLottoNumbers(this.lottoNumbers);
  }

  getLottoNumbers() {
    return this.lottoNumbers;
  }
}

export default Lotto;
