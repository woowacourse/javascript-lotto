// @ts-check

class Lotto {
  numbers;

  constructor(numbers) {
    this.numbers = numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
