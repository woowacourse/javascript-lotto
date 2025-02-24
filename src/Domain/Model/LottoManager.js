import { LOTTO_PRIZE_DEFINITION } from '../Constant/definition.js';
import Lotto from './Lotto.js';
import { sortAscending } from '../../Utils/sorting.js';

class LottoManager {
  #lottoList;

  constructor() {
    this.#lottoList = [];
  }

  getLottoList() {
    return [...this.#lottoList];
  }

  makeLottoList(lottoTickets, generateNumbers) {
    this.#lottoList = Array.from({ length: lottoTickets }, () => {
      const numbers = generateNumbers();
      sortAscending(numbers);
      return new Lotto(numbers);
    });
  }

  compareWinningLotto(winningLotto) {
    const result = Object.values(LOTTO_PRIZE_DEFINITION).reduce(
      (acc, prize) => ({ ...acc, [prize]: 0 }),
      {}
    );
    this.#lottoList.forEach((lotto) => {
      const matchCounts = winningLotto.countMatchingNumbers(lotto);
      const hasBonusNumber = winningLotto.checkBonusNumber(lotto);
      const lottoResult = this.#countLottoResult(hasBonusNumber, matchCounts);
      result[lottoResult] += 1;
    });
    return result;
  }

  #countLottoResult(hasBonusNumber, counts) {
    if (counts === 6) {
      return LOTTO_PRIZE_DEFINITION.FIRST_PRIZE;
    } else if (counts === 5 && hasBonusNumber) {
      return LOTTO_PRIZE_DEFINITION.SECOND_PRIZE;
    } else if (counts === 5 && !hasBonusNumber) {
      return LOTTO_PRIZE_DEFINITION.THIRD_PRIZE;
    } else if (counts === 4) {
      return LOTTO_PRIZE_DEFINITION.FOURTH_PRIZE;
    } else if (counts === 3) {
      return LOTTO_PRIZE_DEFINITION.FIFTH_PRIZE;
    } else {
      return LOTTO_PRIZE_DEFINITION.NONE;
    }
  }
}

export default LottoManager;
