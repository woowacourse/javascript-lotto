import LOTTO_SETTING from '../Constants/lottoSetting';
import ERROR_MESSAGE from '../Constants/Messages/errorMessage';
import generateRandomNumberFromRange from '../Utils/generateRandomNumberFromRange';
import RewardGenerator from './RewardGenerator';
import AppError from '../Error/AppError';
import Lotto from './Lotto';
import LOTTO_REWARD from '../Constants/lottoReward';

export default class LottoMachine {
  #money;

  #totalPrize = 0;

  #boughtLottos;

  #rewardGenerator;

  constructor(money) {
    this.#rewardGenerator = new RewardGenerator();
    this.#money = money;
    this.#validateMoney();
    this.#makeLottoByMoney();
  }

  #validateMoney() {
    if (this.#money < LOTTO_SETTING.MIN_PRICE) {
      throw new AppError(ERROR_MESSAGE.INVALID_MIN_MONEY);
    }
  }

  #makeLottoByMoney() {
    const totalBoughtLottoCount = Math.floor(this.#money / LOTTO_SETTING.MIN_PRICE);

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

    const totalRewardResult = this.#rewardGenerator.getTotalRewardResult();

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

  getRateOfIncome() {
    return Number(((this.#totalPrize / this.#money) * 100).toFixed(1)).toLocaleString();
  }
}
