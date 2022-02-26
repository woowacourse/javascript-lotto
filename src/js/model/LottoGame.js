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
    this.lottos = [...Array(count)].map(() => {
      const lotto = new Lotto();
      lotto.generateRandomNumber();
      return lotto;
    });
  }
}
