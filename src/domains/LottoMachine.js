import generateRandomNumber from "../utils/generateRandomNumber.js";
import Lotto from "./Lotto.js";

class LottoMachine {
  #lottos = [];

  constructor(lottoCount) {
    this.#lottos = this.#generateLottos(lottoCount);
  }

  #generateLottos(lottoCount) {
    const generateLotto = () => this.#generateLotto().sort((a, b) => a - b);
    return Array.from({ length: lottoCount }, () => new Lotto(generateLotto()));
  }

  #generateLotto() {
    const lotto = [];

    while (lotto.length < 6) {
      const randomNumber = generateRandomNumber(1, 45);

      if (!lotto.includes(randomNumber)) {
        lotto.push(randomNumber);
      }
    }

    return lotto;
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;
