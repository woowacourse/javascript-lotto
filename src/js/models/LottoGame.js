import Lotto from './Lotto';
import { isValidCharge, getRandomNumber } from '../utils/validator';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';

class LottoGameModel {
  constructor() {
    this.lottoList = [];
  }

  getLottoList() {
    return this.lottoList;
  }

  createLottoList(chargeInput) {
    const availableLottoAmount = this.inputCharge(chargeInput);

    for (let lottoCount = 0; lottoCount < availableLottoAmount; lottoCount = lottoCount + 1) {
      try {
        const lottoNumbers = this.createLottoNumbers();
        const lotto = Lotto.create(lottoNumbers);
        this.lottoList.push(lotto);
      } catch ({ message }) {
        alert(message);
      }
    }
  }

  createLottoNumbers() {
    const lottoArray = new Set();

    while (lottoArray.size < NUMBER.LOTTO_NUMBER_LENGTH) {
      lottoArray.add(getRandomNumber());
    }

    return [...lottoArray];
  }

  inputCharge(charge) {
    if (isValidCharge(charge)) {
      return this.getAvailableLottoAmount(charge);
    }
    throw new Error(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
  }

  getAvailableLottoAmount(charge) {
    return Math.floor(charge / NUMBER.LOTTO_PRICE);
  }
}

export default LottoGameModel;
