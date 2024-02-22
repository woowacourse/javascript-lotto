class Lotto {
  #numberList;

  constructor(numberList) {
    numberList.sort((a, b) => a - b);
    this.#numberList = numberList;
  }

  getMatchedAmount(winningNumbers, bonusNumber) {
    const matchedCount = this.#numberList.filter(number => winningNumbers.includes(number)).length;
    const isBonusMatched = this.#numberList.some(number => number === bonusNumber);
    return { matchedCount, isBonusMatched };
  }

  get numberList() {
    return this.#numberList;
  }
}

export default Lotto;
