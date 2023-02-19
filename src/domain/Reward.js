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
    const winningNumbers = winningLotto.getLottoNumbers();
    return lotto.countMatchingNumbers(winningNumbers) === this.matchingNumbers;
  }
}

export default Reward;
