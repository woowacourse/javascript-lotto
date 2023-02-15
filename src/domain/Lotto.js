class Lotto {
  constructor(money, number) {
    if (money % 1000) throw new Error('로또는 1000원 단위로 입력을 해주셔야 됩니다.');
    this.lottoMoney = money;
    this.lottoNumber = number;
  }

  countLotto(money) {
    return Number(money) / 1000;
  }

  makeLotto() {
    const number = this.countLotto(this.lottoMoney);
    this.lottoNumber = Array.from({ length: number }, () => this.randomNumberLotto());
  }

  sortedNumber(number) {
    return number.sort((a, b) => a - b);
  }

  randomNumberLotto() {
    const randomNumber = Array.from({ length: 6 }, () => Math.floor(Math.random() * 46));
    if (this.checkRepeatedNumber(randomNumber)) return this.sortedNumber(randomNumber);
    this.randomNumberLotto();
  }

  checkRepeatedNumber(randomNumber) {
    return [...new Set(randomNumber)].length === 6;
  }

  compareNumber(winningNumber, bonusNumber) {
    const ranks = [];
    this.lottoNumber.forEach(numbers => {
      const matchedNumber = numbers.filter(number => winningNumber.includes(number)).length;
      if (matchedNumber === 5) return ranks.push(this.bouseNumberChecked(numbers, bonusNumber));
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
