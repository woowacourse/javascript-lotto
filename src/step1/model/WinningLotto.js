import LottoResult from "./LottoResult.js";
import { LOTTO, RANK, RANK_CONDITION } from "../constant/index.js";
import { LOTTO_ERROR_MESSAGE } from "../constant/message.js";

class WinningLotto {
  #lottoNumbers;
  #bonus;

  constructor(numbers, bonus) {
    this.#lottoNumbers = numbers;
    this.#validate(numbers, bonus);
    this.#bonus = bonus;
  }

  #validate(numbers, bonus) {
    this.#validateUniq(numbers.getNumbers(), bonus);
    this.#validateRange(bonus);
  }

  #validateUniq(numbers, bonus) {
    const uniqueNumbers = new Set([...numbers, bonus]);
    if (uniqueNumbers.size !== numbers.length + 1) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }

  #validateRange(bonus) {
    if (bonus < LOTTO.MIN_NUMBER || bonus > LOTTO.MAX_NUMBER) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
    }
  }

  getNumbers() {
    return this.#lottoNumbers.getNumbers();
  }

  evaluateLotto(lotto) {
    const uniqueNumbers = new Set([
      ...lotto.getNumbers(),
      ...this.#lottoNumbers.getNumbers(),
    ]);

    const matchedNumberCount =
      lotto.getNumbers().length * 2 - uniqueNumbers.size;
    const hasBonusNumber = lotto.getNumbers().includes(this.#bonus);

    return Object.entries(RANK_CONDITION).find(
      ([_, condition]) =>
        matchedNumberCount === condition.count &&
        hasBonusNumber === condition.hasBonus,
    )?.[0];
  }

  evaluateLottos(lottos) {
    const rankResults = lottos.map((lotto) => this.evaluateLotto(lotto));

    const rankCounts = Object.values(RANK).reduce((acc, rank) => {
      acc[rank] = 0;
      return acc;
    }, {});

    rankResults.forEach((rank) => {
      if (rank) rankCounts[rank]++;
    });

    return new LottoResult(rankCounts);
  }
}

export default WinningLotto;
