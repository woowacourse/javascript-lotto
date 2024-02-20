class LottoMachine {
  #money
  #lottos

  constructor(money) {
    this.#money = money;
    this.#lottosDraw(money)

  }

  #lottosDraw(money){
    const count = money / 1000
    this.#lottos = Array(count).fill([]);
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;