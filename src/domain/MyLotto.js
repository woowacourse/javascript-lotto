class MyLotto {
  #money;
  #randomLotto = [];

  constructor(money, randomLotto) {
    this.#money = money;
    this.#randomLotto = randomLotto;
  }

  getMoney() {
    return this.#money;
  }

  getRandomLotto() {
    return [...this.#randomLotto];
  }
}

export default MyLotto;
