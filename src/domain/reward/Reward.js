class Reward {
  constructor(matchingNumbers, money) {
    this.matchingNumbers = matchingNumbers;
    this.money = money;
  }

  getMatchingNumber() {
    return this.matchingNumbers;
  }

  getMoney() {
    return this.money;
  }

  canReceive(lotto, winningLotto) {
    return winningLotto.countMatchingNumbers(lotto) === this.matchingNumbers;
  }

  getTitle() {
    return `${this.matchingNumbers}개 (${this.money.toLocaleString()}원)`;
  }
}

export default Reward;
