import { shuffle } from '../../utils/Random';
import Lotto from './Lotto';

class LottoFactory {
  /**
   * @returns {Lotto}
   */
  createRandomLotto() {
    const allLottoNumbers = Array.from({ length: Lotto.NUMBER_UPPER_BOUND }, (_, i) => i + 1);
    const lottoNumbers = shuffle(allLottoNumbers).slice(0, Lotto.LENGTH);
    return new Lotto(lottoNumbers);
  }
}

export default LottoFactory;
