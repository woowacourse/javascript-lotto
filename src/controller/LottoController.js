import { PRIZE } from "../constants/lottoInfo.js";
import { makeLottos } from "../domain/LottoMachine.js";
import { calProfitRate } from "../domain/WinningRate.js";

class LottoController {
  #lottoCount;
  #purchasedLottos;
  #rankCount = Array(6).fill(0);
  #totalPrize = 0;

  constructor(lottoCount) {
    this.#lottoCount = lottoCount;
  }

  issueLottos() {
    this.#purchasedLottos = makeLottos(this.#lottoCount);
    return this.#purchasedLottos.map((lotto) => lotto.toString());
  }

  updateWinningResult(winningLotto, bonusNum) {
    this.#purchasedLottos.forEach((lotto) => {
      const rank = lotto.getRank(winningLotto, bonusNum);
      this.#rankCount[rank] += 1;
      this.#totalPrize += PRIZE[rank];
    });
  }

  getWinningResult() {
    const purchasedPrice = this.#lottoCount * 1000;

    return {
      rankCount: this.#rankCount,
      profitRate: calProfitRate(purchasedPrice, this.#totalPrize).toFixed(2),
    };
  }
}

export default LottoController;
