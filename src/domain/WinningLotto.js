import Validation from '../Validation';
import Lotto from './Lotto';

class WinningLotto {
  constructor(lottoNumbers, bonusNumber) {
    this.lotto = new Lotto(lottoNumbers);
    this.bonusNumber = bonusNumber;
    Validation.validateNumberRange(bonusNumber);
    Validation.validateBonusNumberDistinct(lottoNumbers, bonusNumber);
  }
}

export default WinningLotto;
