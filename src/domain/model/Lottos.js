import {
  profitByRank,
  PRICE_UNIT,
  errorMessage,
} from '../../constants/constants';
import utils from '../../utils';
import randomNumberGenerator from '../../utils/randomNumberGenerator';
import validator from '../validation/validator';
import Lotto from './Lotto';

export default class Lottos {
  #lottos;

  #ranks;

  constructor(priceInput) {
    if (!validator.purchasePrice(priceInput))
      throw new Error(errorMessage.PURCHASE_PRICE_ERROR);

    const lottoCount = utils.calculateLottoCount(priceInput);

    this.#lottos = new Array(lottoCount)
      .fill()
      .map(() => new Lotto(randomNumberGenerator.generateLottoNumbers()));
    this.#ranks = new Array(profitByRank.length).fill(0);
  }

  getLottos() {
    return this.#lottos;
  }

  getAllRanks() {
    return this.#ranks;
  }

  calculateAllRanks(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      lotto.calculateRank(winningNumbers, bonusNumber);

      this.#setRanks(lotto.getRank());
    });
  }

  #setRanks(lottoRank) {
    if (lottoRank === undefined) return;

    const rankIndex = lottoRank - 1;

    this.#ranks[rankIndex] += 1;
  }

  getProfitRate() {
    const profitRate = this.#calculateProfitRate();
    return profitRate;
  }

  #calculateProfitRate() {
    const profit = this.#calculateProfit();
    const purchasedPrice = this.#lottos.length * PRICE_UNIT;

    return ((profit / purchasedPrice) * 100).toFixed(1);
  }

  #calculateProfit() {
    return this.#ranks.reduce((profit, rankCount, index) => {
      const currentRankProfit = rankCount * profitByRank[index];

      return profit + currentRankProfit;
    }, 0);
  }
}
