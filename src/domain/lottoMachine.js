import Lotto from "./lotto.js";
import drawRandomNumbers from "../util/randomNumbers.js";
class LottoMachine {
  getLottoCount(input) {
    const lottoCount = input / 1000;
    return lottoCount;
  }

  drawLotto(count) {
    return Array.from({ length: count }).map(() => {
      const randomNumber = drawRandomNumbers(6);
      return new Lotto(randomNumber);
    });
  }
}

export default LottoMachine;
