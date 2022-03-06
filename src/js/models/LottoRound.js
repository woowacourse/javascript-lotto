import Lotto from './Lotto';
import {
  isValidNumber,
  isEnoughCharge,
  isDivisibleCharge,
  getRandomNumber,
  hasUniqueElement,
} from '../utils/validator';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';

class LottoRoundModel {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.lottoList = [];
    this.winningResult = [0, 0, 0, 0, 0, 0, 0];
  }

  getLottoList() {
    return this.lottoList;
  }

  createLottoList(chargeInput) {
    try {
      const availableLottoAmount = this.exchangeChargeToLottoAmount(chargeInput);
      const newLottoList = new Array(availableLottoAmount).fill().map(() => {
        const lottoNumbers = this.createLottoNumbers();
        return Lotto.create(lottoNumbers);
      });
      this.lottoList = newLottoList;
    } catch ({ message }) {
      throw message;
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
    if (!isEnoughCharge(charge)) {
      throw new Error(ERROR_MESSAGE.CHARGE_IS_NOT_ENOUGH);
    }

    if (!isDivisibleCharge(charge)) {
      throw new Error(ERROR_MESSAGE.CHARGE_IS_NOT_DIVISIBLE);
    }
    return charge / NUMBER.LOTTO_PRICE;
  }

  getRoundResult(winningNumbers) {
    if (!isValidNumber(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.WIN_NUMBER_IS_INVALIDATE);
    }
    if (!hasUniqueElement(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBER_IS_EXIST);
    }
    this.winningResult = [0, 0, 0, 0, 0, 0, 0];
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
    this.winningResult[NUMBER.EARNING_RATE_INDEX] = Math.floor(
      (totalWinningMoney / totalCharge) * 100
    );
  }
}

export default LottoRoundModel;
