import Validator from "../Validator.js";
import LottoGame from "../Model/LottoGame.js";

import LottoList from "../Model/LottoList.js";
import Rate from "../Model/Rate.js";

export default class LottoService {
  #validator;
  #lottoList;
  #purchaseAmount;

  constructor() {
    this.#validator = new Validator();
    this.#lottoList = null;
    this.#purchaseAmount = 0;
  }

  purchaseLottos(purchasePrice) {
    this.#validator.validatePrice(purchasePrice);

    this.#purchaseAmount = purchasePrice / 1000;

    this.#lottoList = new LottoList(this.#purchaseAmount);

    return this.#lottoList.getLottoList();
  }

  calculateResult(winningNumbers, bonusNumber) {
    this.#validator.validateLottoNumbers(winningNumbers);
    this.#validator.validateBonusNumber(winningNumbers, bonusNumber);

    const lottoGame = new LottoGame(winningNumbers, bonusNumber);

    const statistics = lottoGame.calculateStatistics(this.#lottoList);

    const rate = new Rate(statistics, this.#purchaseAmount);

    return {
      statistics: statistics,
      yieldRate: rate.getRate(),
    };
  }
}
