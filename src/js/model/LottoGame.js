import Lotto from "./Lotto.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
  }

  getLottoList() {
    return this.lottos;
  }

  getLottoCount() {
    return this.lottos.length;
  }

  generateLottoTicket(count) {
    for (let i = 0; i < count; i += 1) {
      const lotto = new Lotto();
      lotto.generateRandomNumber();
      this.lottos.push(lotto);
    }
  }
}
