import Lotto from './Lotto';
import { shuffle } from '../utils/Random';
import { MAX_LOTTO_NUMBER, MONEY_UNIT, LOTTO_DIGITS } from '../constants';

class LottoFactory {
  createRandomLotto() {
    const allLottoNumbers = Array.from({ length: MAX_LOTTO_NUMBER }, (_, i) => i + 1);
    const lottoNumbers = shuffle(allLottoNumbers).slice(0, LOTTO_DIGITS);
    return new Lotto(lottoNumbers);
  }

  sellLottos(money) {
    const amount = money / MONEY_UNIT;
    return Array(amount)
      .fill()
      .map(() => this.createRandomLotto());
  }
}

export default LottoFactory;
