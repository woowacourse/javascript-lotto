import Lotto from './Lotto';
import { isValidCharge, getRandomNumber } from '../utils/validator';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';

class LottoGameModel {
  constructor() {
    this.lottoList = [];
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
      lottoArray.add(getRandomNumber());
    }

    return [...lottoArray];
  }

  exchangeChargeToLottoAmount(charge) {
    if (isValidCharge(charge)) {
      return Math.floor(charge / NUMBER.LOTTO_PRICE);
    }
    throw new Error(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
  }
}

export default LottoGameModel;
