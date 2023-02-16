import Lotto from './Lotto.js';
import Validator from './Validator.js';
import getSameElementCount from '../utils/getSameElementCount.js';
import isExistData from '../utils/isExistData.js';
import { RANK_INDEX } from '../utils/constants.js';

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(lottoNumber, bonusNumber) {
    super(lottoNumber);
    this.#validateBonusNumber(lottoNumber, bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  calculateRank(lotto) {
    const sameElementCount = getSameElementCount(this.getLottoNumber(), lotto.getLottoNumber());
    if (sameElementCount === 6) return RANK_INDEX.FIRST;
    if (sameElementCount === 5 && isExistData(this.#bonusNumber, lotto.getLottoNumber())) return RANK_INDEX.SECOND;
    if (sameElementCount === 5) return RANK_INDEX.THIRD;
    if (sameElementCount === 4) return RANK_INDEX.FORTH;
    if (sameElementCount === 3) return RANK_INDEX.FIFTH;
    return RANK_INDEX.NONE;
  }

  #validateBonusNumber(lottoNumber, bonusNumber) {
    Validator.validateBonusNumberRange(bonusNumber);
    Validator.validateBonusNumberDuplicated(lottoNumber, bonusNumber);
  }
}

export default WinningLotto;
