import {
  LOTTO_DEFINITION,
  LOTTO_PRIZE_DEFINITION,
} from '../Constant/definition.js';
import Lotto from './Lotto.js';
import { sortAscending } from '../../Utils/sorting.js';
import { makeNotDuplicatedRandomNumbers } from '../../Utils/math.js';

class LottoManager {
  #lottoList;

  constructor() {}

  getLottoList() {
    return this.#lottoList;
  }

  makeLottoList(lottoTickets) {
    this.#lottoList = Array.from({ length: lottoTickets }, () => {
      const numbers = makeNotDuplicatedRandomNumbers(
        LOTTO_DEFINITION.NUMBER_COUNTS,
        {
          min: LOTTO_DEFINITION.MIN_NUMBER,
          max: LOTTO_DEFINITION.MAX_NUMBER,
        }
      );
      sortAscending(numbers);
      return new Lotto(numbers);
    });
  }

  compareWinningLotto(winningLotto) {
    const result = {
      FIRST_PRIZE: 0,
      SECOND_PRIZE: 0,
      THIRD_PRIZE: 0,
      FOURTH_PRIZE: 0,
      FIFTH_PRIZE: 0,
      NONE: 0,
    };
    const matchingCounts = this.#lottoList.map((lotto) =>
      winningLotto.countMatchingNumbers(lotto)
    );
    const hasBonusNumbers = this.#lottoList.map((lotto) =>
      winningLotto.checkBonusNumber(lotto)
    );
    matchingCounts.forEach((counts, index) => {
      const hasBonusNumber = hasBonusNumbers[index];
      const lottoResult = this.#countLottoResult(hasBonusNumber, counts);
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
