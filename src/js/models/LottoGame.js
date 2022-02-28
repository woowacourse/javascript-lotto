import Lotto from './Lotto';
import { isValidCharge, getRandomNumber } from '../utils/validator';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';

class LottoGameModel {
  constructor() {
    this.lottoList = [];
    this.winningResult = [0, 0, 0, 0, 0, 0, 0];
  }

  getLottoList() {
    /** getter로 가져간 lottoList를 변경하여도 lottoList의 멤버에겐 영향이 없다. */
    return this.lottoList.deepCopy();
  }

  createLottoList(chargeInput) {
    /** 정상적이지 않은 로또가 하나라도 존재한다면, 멤버는 빈 값이고 사용자는 금액을 다시 입력하여야 한다. */
    try {
      const availableLottoAmount = this.exchangeChargeToLottoAmount(chargeInput);
      const newLottoList = new Array(availableLottoAmount).fill().map(() => {
        const lottoNumbers = this.createLottoNumbers();
        return Lotto.create(lottoNumbers);
      });
      this.lottoList = newLottoList;
    } catch ({ message }) {
      alert(message);
    }
  }

  createLottoNumbers() {
    const lottoArray = new Set();

    while (lottoArray.size < NUMBER.LOTTO_NUMBER_AMOUNT) {
      lottoArray.add(getRandomNumber(lottoArray));
    }

    return [...lottoArray];
  }

  exchangeChargeToLottoAmount(charge) {
    if (isValidCharge(charge)) {
      return Math.floor(charge / NUMBER.LOTTO_PRICE);
    }
    throw new Error(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
  }

  getGameResult(winningNumbers) {
    this.lottoList.forEach((lotto) => {
      this.updateLottoRankResult(lotto, winningNumbers);
    });
    this.updateLottoEarningRate();
    return this.winningResult;
  }

  updateLottoRankResult(lotto, winningNumbers) {
    this.winningResult[lotto.result(winningNumbers)] += 1;
  }

  updateLottoEarningRate() {
    const totalCharge = this.lottoList.length * NUMBER.LOTTO_PRICE;
    const totalWinningMoney =
      NUMBER.FIRST_GRADE_PRIZE * this.winningResult[NUMBER.FIRST_GRADE_INDEX] +
      NUMBER.SECOND_GRADE_PRIZE * this.winningResult[NUMBER.SECOND_GRADE_INDEX] +
      NUMBER.THIRD_GRADE_PRIZE * this.winningResult[NUMBER.THIRD_GRADE_INDEX] +
      NUMBER.FOURTH_GRADE_PRIZE * this.winningResult[NUMBER.FOURTH_GRADE_INDEX] +
      NUMBER.FIFTH_GRADE_PRIZE * this.winningResult[NUMBER.FIFTH_GRADE_INDEX];
    this.winningResult[NUMBER.EARNING_RATE_INDEX] = Math.floor(totalWinningMoney / totalCharge);
  }
}

export default LottoGameModel;
