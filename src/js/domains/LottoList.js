import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';
import { RANK_KEYS, RANK_PRICE } from '../constants/win';
import { isValidCharge, isValidWinningNumber } from '../utils/validator';
import Lotto from './Lotto';

class LottoList {
  constructor() {
    this.lottoList = null;
  }

  getLottoList() {
    return this.lottoList;
  }

  createLottoList(chargeInput) {
    /** 정상적이지 않은 로또가 하나라도 존재한다면, 멤버는 빈 값이고 사용자는 금액을 다시 입력하여야 한다. */
    const availableLottoAmount = this.exchangeChargeToLottoAmount(chargeInput);
    const lottoList = [...new Array(availableLottoAmount)].map(() => new Lotto());
    this.lottoList = lottoList;
  }

  exchangeChargeToLottoAmount(charge) {
    if (isValidCharge(charge)) {
      return Math.floor(charge / NUMBER.LOTTO_PRICE);
    }
    throw new Error(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
  }

  computeWinResultStatistics(winningNumbers, bonusNumber) {
    if (isValidWinningNumber([...winningNumbers, bonusNumber])) {
      const statisticsArray = this.lottoList.map((lotto) =>
        lotto.computeWinResult(winningNumbers, bonusNumber)
      );

      const totalProceeds = statisticsArray.reduce(
        (prev, current) => prev + RANK_PRICE[current],
        0
      );
      return { statistics: this.changeStatisticsMap(statisticsArray), totalProceeds };
    }
    throw new Error(ERROR_MESSAGE.WIN_NUMBER_IS_INVALIDATE);
  }

  changeStatisticsMap(statisticsArray) {
    const statisticsMap = {};

    Object.keys(RANK_KEYS).forEach((key) => {
      statisticsMap[key] = 0;
    });

    statisticsArray.forEach((result) => {
      statisticsMap[result] = statisticsMap[result] + 1;
    });

    return statisticsMap;
  }
}
export default LottoList;
