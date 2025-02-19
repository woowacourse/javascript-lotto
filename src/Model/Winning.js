class Winning {
  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers.sort((a, b) => a - b);
    this.bonusNumber = bonusNumber;
  }

  getRank(boughtLotto) {
    let count = 0;
    for (let i = 0; i < 6; i++) {
      if (this.winningNumbers[i] === boughtLotto[i]) {
        count += 1;
      }
    }
    if (count === 6) {
      return 1;
    }
    if (count === 5) {
      if (boughtLotto.includes(this.bonusNumber)) {
        return 2;
      }
      return 3;
    }
    if (count === 4) {
      return 4;
    }
    if (count === 3) {
      return 5;
    }
  }
}

export default Winning;
