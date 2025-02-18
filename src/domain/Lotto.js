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
}
export default Lotto;
