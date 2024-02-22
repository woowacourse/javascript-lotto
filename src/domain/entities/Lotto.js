class Lotto {
  #numberList;

  constructor(numberList) {
    this.#numberList = numberList;
    this.#sortLottoNumbers();
  }

  #sortLottoNumbers() {
    this.#numberList.sort((a, b) => a - b);
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
