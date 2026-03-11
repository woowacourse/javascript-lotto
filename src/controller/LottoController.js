import { LOTTO_PRICE, LOTTO_SIZE, PRIZE } from "../constants/lottoInfo.js";
import { makeLottos } from "../domain/LottoMachine.js";
import { calProfitRate } from "../domain/WinningRate.js";

class LottoController {
  #lottoCount;
  #purchasedLottos;
  #rankCount = Array(LOTTO_SIZE).fill(0);
  #totalPrize = 0;

  constructor(lottoCount) {
    this.#lottoCount = lottoCount;
  }

  issueLottos() {
    this.#purchasedLottos = makeLottos(this.#lottoCount);
    return this.#purchasedLottos.map((lotto) => lotto.getNumbers());
  }

  updateWinningResult(winningLotto, bonusNum) {
    this.#purchasedLottos.forEach((lotto) => {
      const rank = lotto.getRank(winningLotto, bonusNum);
      this.#rankCount[rank] += 1;
      this.#totalPrize += PRIZE[rank];
    });
  }

  getWinningResult() {
    const purchasedPrice = this.#lottoCount * LOTTO_PRICE;

    return {
      rankCount: this.#rankCount,
      profitRate: calProfitRate(purchasedPrice, this.#totalPrize),
    };
  }
}

export default LottoController;
