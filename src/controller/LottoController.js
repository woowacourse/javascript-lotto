import { PRIZE } from "../constants/lottoInfo.js";
import { makeLottos } from "../domain/LottoMachine.js";
import { calProfitRate } from "../domain/WinningRate.js";

class LottoController {
  #amount;
  #lottos;
  #rankCount = Array(6).fill(0);
  #totalPrize = 0;

  constructor(amount) {
    this.#amount = amount;
  }

  //로또 발행
  issueLottos() {
    this.#lottos = makeLottos(this.#amount);
    return this.#lottos.map((lotto) => lotto.toString());
  }

  // 등수 업데이트
  updateWinningResult(winningLotto, bonusNum) {
    this.#lottos.forEach((lotto) => {
      const rank = lotto.getRank(winningLotto, bonusNum);
      this.#rankCount[rank] += 1;
      this.#totalPrize += PRIZE[rank];
    });
  }

  // 당첨 통계, 수익률 반환
  getWinningResult() {
    return {
      rankCount: this.#rankCount,
      profitRate: calProfitRate(this.#amount, this.#totalPrize),
    };
  }
}

export default LottoController;
