import Lotto from "./Lotto.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
  }

  getLottoList() {
    return this.lottos;
  }

  getLottosLength() {
    return this.lottos.length;
  }

  makeLottoTicket(count) {
    for (let i = 0; i < count; i += 1) {
      const lotto = new Lotto();
      lotto.makeRandomNumber();
      this.lottos.push(lotto);
    }
  }
}
