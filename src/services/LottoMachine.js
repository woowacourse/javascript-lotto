import Lotto from "../models/Lotto.js";
import pickUniqueNumbersInRange from "../utils/Random.js";

class LottoMachine {
  #generatedLottos;

  constructor(lottoCount) {
    this.#generatedLottos = this.#generateLottos(lottoCount);
  }

  getLottoTickets() {
    const lottos = this.#generatedLottos.map((lotto) => {
      return lotto.getNumbers();
    });

    return lottos;
  }

  #generateLottos(lottoCount) {
    const lottos = [];
    for (let _ = 0; _ < lottoCount; _++) {
      const numbers = pickUniqueNumbersInRange(1, 45, 6);
      lottos.push(new Lotto(numbers));
    }

    return lottos;
  }
}

export default LottoMachine;
