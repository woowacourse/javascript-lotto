import { shuffle } from '../../utils/Random';
import Lotto from './Lotto';

class LottoFactory {
  /**
   * @returns {Lotto}
   */
  createRandomLotto() {
    const allLottoNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
    const lottoNumbers = shuffle(allLottoNumbers).slice(0, 6);
    return new Lotto(lottoNumbers);
  }
}

export default LottoFactory;
