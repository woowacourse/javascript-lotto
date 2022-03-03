const winningCountsInit = {
  '1th': 0,
  '2th': 0,
  '3th': 0,
  '4th': 0,
  '5th': 0,
};
export default class WinningLottoCounter {
  #winningCounts;
  #winningLotto;

  constructor() {
    this.#winningCounts = { ...winningCountsInit };
    this.#winningLotto = {
      winningNumbers: [],
      bonusNumber: null,
    };
  }

  get winningCounts() {
    return this.#winningCounts;
  }

  setWinningLotto({ winningNumbers, bonusNumber }) {
    this.#winningLotto.winningNumbers = [...winningNumbers];
    this.#winningLotto.bonusNumber = bonusNumber;
  }

  calculateWinningCounts(boutghtLottos) {
    const tempWinningCounts = { ...winningCountsInit };
    boutghtLottos.forEach((lotto) => {
      let hitCount = this.#winningLotto.winningNumbers.reduce((acc, num) => {
        if (lotto.has(num)) {
          acc += 1;
        }
        return acc;
      }, 0);
      switch (hitCount) {
        case 6:
          tempWinningCounts['1th'] += 1;
          break;
        case 5:
          if (lotto.has(this.#winningLotto.bonusNumber)) {
            tempWinningCounts['2th'] += 1;
          } else {
            tempWinningCounts['3th'] += 1;
          }
          break;
        case 4:
          tempWinningCounts['4th'] += 1;
          break;
        case 3:
          tempWinningCounts['5th'] += 1;
          break;
        default:
          break;
      }
      this.#winningCounts = { ...tempWinningCounts };
    });
  }
}
