import { pickRandomNumberInRange } from "../utils/pickRandomNumberInRange.js";
import Lotto from "./Lotto.js";

class LottoStore {
  #lottoRules;

  constructor(lottoRules) {
    this.#lottoRules = lottoRules;
  }

  publishLottos(amount) {
    const numericAmount = Number(amount);
    this.#lottoRules.validateForAmount(numericAmount);

    const lottoCount = numericAmount / this.#lottoRules.getLottoPrice();

    const lottos = Array.from({ length: lottoCount }).map(() => {
      const lottoNumbers = this.#makeLottoNumbers();
      return new Lotto(lottoNumbers, this.#lottoRules);
    });

    return lottos;
  }

  #makeLottoNumbers() {
    const numbers = [];

    while (numbers.length < this.#lottoRules.getLottoLength()) {
      const randomNumber = pickRandomNumberInRange(
        this.#lottoRules.getMinNumber(),
        this.#lottoRules.getMaxNumber()
      );
      if (numbers.includes(randomNumber)) continue;
      numbers.push(randomNumber);
    }

    return numbers;
  }
}

export default LottoStore;
