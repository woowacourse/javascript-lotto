import Validation from '../Validation';
import Lotto from './lotto/Lotto';

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

  countMatchingNumbers(lotto) {
    const countFn = (count, lottoNumber) =>
      lotto.getLottoNumbers().includes(lottoNumber) ? count + 1 : count;
    return this.getLottoNumbers().reduce(countFn, 0);
  }

  hasBonusNumber(lotto) {
    return lotto.getLottoNumbers().includes(this.bonusNumber);
  }
}

export default WinningLotto;
