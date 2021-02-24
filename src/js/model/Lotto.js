export default class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getMatchedCount(winningNumbers, bonusNumber) {
    let count = this.numbers.filter(number => winningNumbers.includes(number))
      .length;

    if (count === 5 && this.numbers.includes(bonusNumber)) {
      count += 0.5;
    }

    return count;
  }
}
