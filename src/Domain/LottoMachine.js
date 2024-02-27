import LOTTO_SETTING from '../Constants/lottoSetting.js';
import generateRandomNumberFromRange from '../Utils/generateRandomNumberFromRange.js';
import RewardGenerator from './RewardGenerator.js';
import Lotto from './Lotto.js';
import LOTTO_REWARD from '../Constants/lottoReward.js';

export default class LottoMachine {
  #totalPrize = 0;

  #boughtLottos;

  #rewardGenerator;

  constructor() {
    this.#rewardGenerator = new RewardGenerator();
  }

  makeLottoByMoney(money) {
    const totalBoughtLottoCount = Math.floor(money / LOTTO_SETTING.MIN_PRICE);

    this.#boughtLottos = Array.from({ length: totalBoughtLottoCount }, () => {
      const newLotto = this.#makeNewLotto();
      return new Lotto(newLotto).getLottoNumbers();
    });
  }

  #makeNewLotto() {
    const lottoSet = new Set();

    while (lottoSet.size !== LOTTO_SETTING.VALID_LENGTH) {
      const randomLottoNumber = generateRandomNumberFromRange(LOTTO_SETTING.MIN_NUM, LOTTO_SETTING.MAX_NUM);
      lottoSet.add(randomLottoNumber);
    }
    return [...lottoSet];
  }

  getLottos() {
    return [...this.#boughtLottos];
  }

  /**
   * 당첨 번호와 보너스 번호를 담은 객체를 인자로 받아서, 전체적인 등수 로직을 실행합니다.
   * @param { object{} } totalWinningLottoInfo
   * @returns { rewardResult[] }
   */

  getRewardResult(totalWinningLottoInfo) {
    this.#boughtLottos.forEach((lottoNumber) => {
      this.#rewardGenerator.calculateRewardRank(lottoNumber, totalWinningLottoInfo);
    });

    const totalRewardResult = this.#rewardGenerator.getTotalRewardResult().sort((a, b) => b.rank - a.rank);

    this.#calculateTotalPrize(totalRewardResult);

    return totalRewardResult;
  }

  #calculateTotalPrize(totalRewardResult) {
    totalRewardResult.forEach((rewardResult) => {
      if (rewardResult.count) {
        this.#totalPrize += LOTTO_REWARD[rewardResult.rank].prize;
      }
    });
  }

  getRateOfIncome(money) {
    return Number(((this.#totalPrize / money) * 100).toFixed(1)).toLocaleString();
  }
}
