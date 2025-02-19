class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getCorretNumber(targetNumber) {
    let correctNumber = 0;
    for (let i = 0; i < 6; i += 1) {
      if (targetNumber.includes(this.numbers[i])) {
        correctNumber += 1;
      }
    }
    return correctNumber;
  }
}

export default Lotto;
