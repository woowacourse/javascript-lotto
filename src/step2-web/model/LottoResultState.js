import { LOTTO_RANK_INITIAL_RESULT } from "../../step1-console/constants/lotto.js";
import Observable from "../abstract/Observable.js";

const createInitialLottoResult = () => ({
  rankResult: { ...LOTTO_RANK_INITIAL_RESULT },
  profitRate: 0,
  isResultModalOn: false,
});

export default class LottoResultState extends Observable {
  #lottoResult = createInitialLottoResult();

  getState() {
    return this.#lottoResult;
  }

  setState(lottoResult) {
    this.#lottoResult = {
      ...this.#lottoResult,
      ...lottoResult,
    };

    this.notify();
  }

  reset() {
    this.setState(createInitialLottoResult());
  }
}
