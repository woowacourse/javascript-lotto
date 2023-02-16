import Validation from '../Validation';
import Lotto from './Lotto';

class WinningLotto {
  constructor(lottoNumbers, bonusNumber) {
    this.lotto = new Lotto(lottoNumbers);
    this.bonusNumber = bonusNumber;

    Validation.validateBonusNumberDistinct(lottoNumbers, bonusNumber);
  }

  getLottoNumbers() {
    return this.lotto.getLottoNumbers();
  }

  getBonusNumber() {
    return this.bonusNumber;
  }
}

export default WinningLotto;
