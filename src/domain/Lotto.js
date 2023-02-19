class Lotto {
  lottoNumber;

  constructor() {
    this.lottoNumber = [];
  }

  countLotto(money) {
    return Number(money) / 1000;
  }

  get lottoNumber() {
    return this.lottoNumber;
  }

  setLottoNumber(number) {
    this.lottoNumber = number;
  }

  makeLotto(money) {
    const number = this.countLotto(money);
    this.setLottoNumber(Array.from({ length: number }, () => this.randomNumberLotto()));
  }

  sortedNumber(number) {
    return number.sort((a, b) => a - b);
  }

  randomNumberLotto() {
    const randomNumber = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45 + 1));
    if (this.checkRepeatedNumber(randomNumber)) return this.sortedNumber(randomNumber);
    return this.randomNumberLotto();
  }

  checkRepeatedNumber(randomNumber) {
    return [...new Set(randomNumber)].length === 6;
  }

  compareNumber(winningNumber, bonusNumber) {
    const ranks = [];
    this.lottoNumber.forEach(numbers => {
      const matchedNumber = numbers.filter(number => winningNumber.includes(String(number))).length;
      if (matchedNumber === 5) return ranks.push(this.bouseNumberChecked(numbers, Number(bonusNumber)));
      if (matchedNumber >= 3) ranks.push(matchedNumber);
    });
    return ranks;
  }
  bouseNumberChecked(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) return 7;
    return 5;
  }
}

export default Lotto;
