class LottoChecker {
  matchLottoNumbers(lotto, winLotto) {
    const lottoNumbers = lotto.getNumbers();
    return lottoNumbers.filter((value) => winLotto.getNumbers().includes(value)).length;
  }

  #getRankIndex(matchCount = 0, matchBonus = false) {
    if (matchCount === WINNER.FIFTH.MATCH_COUNT) return WINNER.FIFTH.INDEX;
    if (matchCount === WINNER.FOURTH.MATCH_COUNT) return WINNER.FOURTH.INDEX;
    if (matchCount === WINNER.THIRD.MATCH_COUNT && matchBonus) return WINNER.THIRD.INDEX;
    if (matchCount === WINNER.SECOND.MATCH_COUNT) return WINNER.SECOND.INDEX;
    return WINNER.FIRST.INDEX;
  }

  #hasBonus(lotto = {}, bonusNumber = 0) {
    return lotto.getNumbers().includes(bonusNumber);
  }

  getResult(winLotto = {}, bonusNumber = 0) {
    const winningNumber = this.#lottos.reduce(
      (acc, lotto) => {
        const matchCount = this.matchLottoNumbers(lotto, winLotto);
        if (matchCount >= WINNER.FIFTH.MATCH_COUNT) {
          const rankIndex = this.#getRankIndex(matchCount, this.#hasBonus(lotto, bonusNumber));
          acc[rankIndex] += 1;
        }
        return acc;
      },
      Array.from({ length: Object.keys(WINNER) }.length, () => 0)
    );
    return winningNumber.reverse();
  }

  getAllLottosNumbers() {
    return [...this.#lottos.map((lotto) => lotto.getNumbers())];
  }
}

export default LottoChecker;
