import Validation from '../../Validation';

class Lotto {
  constructor(lottoNumbers) {
    Validation.validateLottoNumbers(lottoNumbers);
    this.lottoNumbers = lottoNumbers.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.lottoNumbers;
  }
}

export default Lotto;
