import Lotto from "./Lotto.js";
import { makeOneLotto } from "../utils/utils.js";

class LottoGame {
  constructor(amount) {
    this.result = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    this.lottoes = this.getLottos(amount);
  }

  getLottos(amount) {
    const allLottos = [];
    for (let i = 0; i < amount; i += 1) {
      const currentLotto = makeOneLotto();
      allLottos.push(new Lotto(currentLotto));
    }
    return allLottos;
  }
}

export default LottoGame;
