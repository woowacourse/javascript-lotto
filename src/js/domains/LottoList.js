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

  computeStatisticsAndProfitRatio(winningNumbers, bonusNumber) {
    if (isValidWinningNumber([...winningNumbers, bonusNumber])) {
      const statistics = this.computeStatistics(winningNumbers, bonusNumber);

      const profitRatio = this.computeProfitRatio(statistics);

      return { statistics, profitRatio };
    }
    throw new Error(ERROR_MESSAGE.WIN_NUMBER_IS_INVALIDATE);
  }

  computeStatistics(winningNumbers, bonusNumber) {
    const statisticsArray = this.lottoList.map((lotto) =>
      lotto.computeWinResult(winningNumbers, bonusNumber)
    );

    const statisticsMap = this.changeStatisticsMap(statisticsArray);

    return statisticsMap;
  }

  computeProfitRatio(statistics) {
    const lottoPurchaseAmount = this.lottoList.length * NUMBER.LOTTO_PRICE;

    const profitAmount = Object.keys(statistics).reduce((prev, currentKey) => {
      const count = statistics[currentKey];

      const price = RANK_PRICE[currentKey];

      return prev + count * price;
    }, 0);

    return (profitAmount / lottoPurchaseAmount) * 100;
  }

  /** 배열 형태 ex) ['1등','1등','2등','3등','꽝','꽝'] 를*/
  /** 객체 형태 ex) {'1등' : 2, '2등' : 1} 로 바꾼다*/
  changeStatisticsMap(statisticsArray) {
    const statisticsMap = {};

    Object.values(RANK_KEYS).forEach((key) => {
      statisticsMap[key] = 0;
    });

    statisticsArray.forEach((result) => {
      statisticsMap[result] = statisticsMap[result] + 1;
    });

    return statisticsMap;
  }
}
export default LottoList;
