class Lotto {
  constructor(numbers) {
    this.numbers = this.sortLottoNumber(numbers);
  }

  sortLottoNumber(numbers) {
    return numbers.sort();
  }

  getLottoNumbers() {
    return this.numbers;
  }

  getSameNumbers(givenLottoNumber) {
    return this.numbers.filter((number) => givenLottoNumber.includes(number))
      .length;
  }

  hasBonusNumber(bonusNumber) {
    return this.numbers.includes(bonusNumber);
  }
}

export default Lotto;
