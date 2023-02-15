class Lotto {
  constructor(money, number) {
    if (money % 1000) throw new Error('로또는 1000원 단위로 입력을 해주셔야 됩니다.');
    this.lottoMoney = money;
    this.lottoNumber = number;
  }

  randomNumberLotto() {
    const randomNumber = Array.from({ length: 6 }, () => Math.floor(Math.random() * 46));
    if (this.compareSameNumberInLotto()) return randomNumber;
    this.randomNumberLotto();
  }

  compareSameNumberInLotto(randomNumber) {
    return [...new Set(randomNumber)].length === 6;
  }
}

export default Lotto;
