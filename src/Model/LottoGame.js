class LottoGame {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculateStatistics(lottoList) {
    const grade = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 0: 0 };

    lottoList.getLottoList().forEach((lotto) => {
      const gradeNum = this.#match(lotto);
      grade[gradeNum]++;
    });

    return grade;
  }
  #calculateMatchCount(lotto) {
    let matchingCount = 0;
    let hasBonus = false;
    lotto.getNumbers().forEach((number) => {
      if (this.#winningNumbers.includes(number)) {
        matchingCount++;
      }
    });
    if (lotto.getNumbers().includes(this.#bonusNumber)) hasBonus = true;
    return {
      matchingCount,
      hasBonus,
    };
  }
  #match(lotto) {
    const { matchingCount, hasBonus } = this.#calculateMatchCount(lotto);

    // 1 등 6 개
    // 2 등 5 개, 보너스 O
    // 3 등 5 개, 보너스 X
    // 4 등 4 개
    // 5 등 3 개

    if (matchingCount === 6) return 1;
    if (matchingCount === 5 && hasBonus) return 2;
    if (matchingCount === 5) return 3;
    if (matchingCount === 4) return 4;
    if (matchingCount === 3) return 5;
    return 0;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
  getWinningNumbers() {
    return [...this.#winningNumbers];
  }
}

export default LottoGame;
