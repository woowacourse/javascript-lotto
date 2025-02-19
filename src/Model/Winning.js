class Winning {
  rankHistory = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers.sort((a, b) => a - b);
    this.bonusNumber = bonusNumber;
  }

  calculateRank(boughtLotto) {
    let count = 0;
    for (let i = 0; i < 6; i++) {
      if (this.winningNumbers[i] === boughtLotto[i]) {
        count += 1;
      }
    }
    if (count === 6) {
      this.rankHistory.first += 1;
    }
    if (count === 5) {
      if (boughtLotto.includes(this.bonusNumber)) {
        this.rankHistory.second += 1;
      }
      this.rankHistory.third += 1;
    }
    if (count === 4) {
      this.rankHistory.fourth += 1;
    }
    if (count === 3) {
      this.rankHistory.fifth += 1;
    }
  }
}

export default Winning;
