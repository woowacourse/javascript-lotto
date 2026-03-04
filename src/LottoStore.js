import Lotto from "./Lotto.js";
import { generateRandomNumber } from "./utils.js";

class LottoStore {
  static purchaseLottos(amount) {
    const lottoNumbersArray = [];
    return lottoNumbersArray.map((lottoNumbers) => new Lotto(lottoNumbers));
  }

  static createRandomLotto() {
    const numbers = Array.from({ length: 6 }).map(() => generateRandomNumber());
    return new Lotto(numbers);
  }
}

export default LottoStore;
