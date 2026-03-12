import { LOTTO_PRICE, PRIZE } from "../constants/lottoInfo.js";
import { makeLottos } from "../domain/LottoMachine.js";
import { calProfitRate } from "../domain/WinningRate.js";

class LottoController {
  #purchasedLottos;
  #rankCount;
  #totalPrize;

  issueLottos(lottoCount) {
    this.#purchasedLottos = makeLottos(lottoCount);
    return this.#purchasedLottos.map((lotto) => lotto.getNumbers());
  }

  updateWinningResult(winningLotto, bonusNum) {
    const rankCount = Array(6).fill(0);
    let totalPrize = 0;

    this.#purchasedLottos.forEach((lotto) => {
      const rank = lotto.getRank(winningLotto, bonusNum);
      rankCount[rank] += 1;
      totalPrize += PRIZE[rank];
    });

    this.#rankCount = rankCount;
    this.#totalPrize = totalPrize;
  }

  getWinningResult() {
    const purchasedPrice = this.#purchasedLottos.length * LOTTO_PRICE;

    return {
      rankCount: this.#rankCount,
      profitRate: calProfitRate(purchasedPrice, this.#totalPrize),
    };
  }
}

export default LottoController;
