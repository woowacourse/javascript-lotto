import { makeLottoNumbers, calcuateUserProfitRate, calculateLottoStatus } from '../helper/lotto.js';

export default class LottoUser {
  #buyedLottos = [];
  #profitRate = 0;
  #lottoStatus = [];

  reset() {
    this.#buyedLottos = [];
    this.#profitRate = 0;
    this.#lottoStatus = [];
  }

  buyLotto(quantity) {
    for (let i = 0; i < quantity; i += 1) {
      this.#buyedLottos = [...this.#buyedLottos, makeLottoNumbers()];
    }
  }

  setLottoResult(regularNumbers, bonusNumber) {
    this.#lottoStatus = calculateLottoStatus(this.#buyedLottos, regularNumbers, bonusNumber);
    this.#profitRate = calcuateUserProfitRate(this.#lottoStatus, this.#buyedLottos.length);
  }

  getBuyedLottos() {
    return this.#buyedLottos;
  }

  getProfitRate() {
    return this.#profitRate;
  }

  getLottoStatus() {
    return this.#lottoStatus;
  }
}
