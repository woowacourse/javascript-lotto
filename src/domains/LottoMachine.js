import generateRandomNumber from "../utils/generateRandomNumber.js";
import Lotto from "./Lotto.js";

class LottoMachine {
  #lottos = [];

  constructor(lottoCount) {
    this.#lottos = this.#generateLottos(lottoCount);
  }

  #generateLottos(lottoCount) {
    const lotto = Array.from({ length: 6 }, () =>
      generateRandomNumber(1, 45)
    ).sort((a, b) => a - b);

    return Array.from({ length: lottoCount }, () => new Lotto(lotto));
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;
