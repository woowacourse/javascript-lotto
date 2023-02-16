class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
    return this.numbers;
  }

  // 개명 필요
  matcher(winningNumber, bonusNumber) {
    const bonus = this.numbers.includes(bonusNumber);
    const match = this.numbers.filter((number) => winningNumber.includes(number)).length;
    const lottoResult = [null, null, null, 5, 4, bonus ? 2 : 3, 1];
    return lottoResult[match];
  }
}

export default Lotto;
