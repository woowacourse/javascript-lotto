import { NUMBER } from '../constants/number';
import { RANK } from '../constants/rank';
import { lottoNumberClosure } from '../utils/gameUtil';

class Lotto {
  constructor() {
    this.lottoNumbers = this.createLottoNumbers();
  }

  getLottoNumbers() {
    return this.lottoNumbers;
  }

  createLottoNumbers() {
    const getLottoNumber = lottoNumberClosure();
    return [...new Array(NUMBER.LOTTO_NUMBER_LENGTH)].map(() => getLottoNumber());
  }

  computeWinResult(winningNumbers, bonusNumber) {
    const { length: numberMatchCount } = this.lottoNumbers.filter((number) =>
      winningNumbers.includes(number)
    );
    const isMatchBonus = this.lottoNumbers.includes(bonusNumber);
    return RANK[`${numberMatchCount}${isMatchBonus}`] ?? RANK.UNRANK;
  }
}

export default Lotto;
