import Lotto from './Lotto';

class LotteryMachine {
  #amount;

  constructor(purchaseAmount) {
    this.#amount = parseInt(purchaseAmount, 10) / 1000;
  }

  makeLottery() {
    return Array.from({ length: this.#amount }).map(() => this.makeLotto());
  }

  makeLotto() {
    const lotto = [];
    while (lotto.length < 6) {
      const randomNumber = Math.ceil(Math.random() * 45);
      if (lotto.includes(randomNumber)) continue;
      lotto.push(randomNumber);
    }
    return new Lotto(lotto);
  }
}

export default LotteryMachine;
