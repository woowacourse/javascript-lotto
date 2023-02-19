import { shuffle } from '../../utils/Random';
import Lotto from './Lotto';

class LottoFactory {
  createRandomLotto() {
    const allLottoNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
    const lottoNumbers = shuffle(allLottoNumbers).slice(0, 6);
    return new Lotto(lottoNumbers);
  }

  sellLottos(money) {
    const amount = money / 1000;
    return Array(amount)
      .fill()
      .map(() => this.createRandomLotto());
  }
}

export default LottoFactory;
