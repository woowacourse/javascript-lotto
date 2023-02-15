import { shuffle } from '../utils/Random';
import Lotto from './Lotto';

class LottoFactory {
  constructor() {}

  createRandomLotto() {
    const allLottoNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
    const lottoNumbers = shuffle(allLottoNumbers).slice(0, 6);
    return new Lotto(lottoNumbers);
  }

  sellLottos(money) {
    if (money % 1000 !== 0) throw new Error('1000원 단위로 금액을 주어야 합니다.');
    const amount = money / 1000;
    if (amount <= 0) throw new Error('1개 이상 구매할 수 있는 금액을 주어야 합니다.');

    return Array(amount)
      .fill()
      .map(() => this.createRandomLotto());
  }
}

export default LottoFactory;
