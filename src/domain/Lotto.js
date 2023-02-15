class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
    return this.numbers;
  }

  matcher(winningNumber, bonusNumber) {
    const bonus = this.numbers.includes(bonusNumber);
    const match = this.numbers.filter((number) => winningNumber.includes(number)).length;
    return { match, bonus };
  }
}

export default Lotto;
