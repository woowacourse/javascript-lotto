import Lotto from "./Lotto.js";
import LottoValidator from "./LottoValidator.js";

class WinningLotto {
  #isWinningNumber;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    LottoValidator.validateLottoNumbers(numbers);
    LottoValidator.validateBonusNumber(bonusNumber);
    LottoValidator.validateUniqueElements([...numbers, bonusNumber]);

    this.#setIsWinningNumber(numbers);
    this.#bonusNumber = bonusNumber;
  }

  getLottosRanks(lottos) {
    return lottos.map((lotto) => this.#getLottoRank(lotto));
  }

  #getLottoRank(lotto) {
    const matchCount = this.#getMatchCount(lotto);

    const hasBonusNumber = lotto.getNumbers().includes(this.#bonusNumber);

    return this.#getLottoRankByMatchCountAndHasBonusNumber(
      matchCount,
      hasBonusNumber
    );
  }

  #getLottoRankByMatchCountAndHasBonusNumber(matchCount, hasBonusNumber) {
    if (matchCount < 3) return -1;
    if (matchCount === 3) return 5;
    if (matchCount === 4) return 4;
    if (matchCount === 5 && !hasBonusNumber) return 3;
    if (matchCount === 5 && hasBonusNumber) return 2;
    if (matchCount === 6) return 1;
  }
  #getMatchCount(lotto) {
    return lotto
      .getNumbers()
      .reduce(
        (count, number) => count + (this.#isWinningNumber[number] ? 1 : 0),
        0
      );
  }

  #setIsWinningNumber(numbers) {
    this.#isWinningNumber = new Array(Lotto.MAX_LOTTO_NUMBER + 1).fill(false);

    numbers.forEach((number) => (this.#isWinningNumber[number] = true));
  }
}

export default WinningLotto;
