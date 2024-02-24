import NUMBERS from "./constants/numbers.js";

class WinningLotto {
  #isWinningNumberBooleans;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#setIsWinningNumber(numbers);
    this.#bonusNumber = bonusNumber;
  }

  getLottosRanks(lottos) {
    return lottos.map((lotto) => this.#getLottoRank(lotto));
  }

  #getLottoRank(lotto) {
    const matchCount = this.#getMatchCount(lotto);

    const hasBonusNumber = lotto.includes(this.#bonusNumber);

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

  #getMatchCount(lottoNumbers) {
    return lottoNumbers.reduce(
      (count, number) =>
        count + (this.#isWinningNumberBooleans[number] ? 1 : 0),
      0
    );
  }

  #setIsWinningNumber(numbers) {
    this.#isWinningNumberBooleans = new Array(NUMBERS.maxLottoNumber + 1).fill(
      false
    );

    numbers.forEach((number) => (this.#isWinningNumberBooleans[number] = true));
  }
}

export default WinningLotto;
