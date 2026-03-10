import { resultCalculator } from "./ResultCalculator.js";
import { calculateProfitRate } from "./CalculateProfitRate.js";
import { LOTTO_COST } from "../constants/config.js";

class LottoResult {
  #lottoResult;

  constructor(winningLottoManager, lottoBundle) {
    this.#calculateResult(winningLottoManager, lottoBundle);
  }

  #calculateResult(winningLottoManager, lottoBundle) {
    this.#lottoResult = lottoBundle.map((lotto) => {
      return winningLottoManager.compareWithWinningLotto(lotto);
    });
  }

  getResult(lottoCount) {
    const resultData = resultCalculator(this.#lottoResult);
    const profitRate = calculateProfitRate(resultData, lottoCount * LOTTO_COST);

    return { resultData, profitRate };
  }
}

export default LottoResult;
