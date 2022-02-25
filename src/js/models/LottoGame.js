import Lotto from './Lotto';
import { isValidCharge, getRandomNumber } from '../utils/validator';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';
import { deepCopy } from '../utils/copy';

class LottoGameModel {
  constructor() {
    this.lottoList = null;
  }

  getLottoList() {
    /** getter로 가져간 lottoList를 변경하여도 lottoList의 멤버에겐 영향이 없다. */
    return deepCopy(this.lottoList);
  }

  createLottoList(chargeInput) {
    /** 정상적이지 않은 로또가 하나라도 존재한다면, 멤버는 빈 값이고 사용자는 금액을 다시 입력하여야 한다. */
    try {
      const lottoList = [];
      const availableLottoAmount = this.exchangeChargeToLottoAmount(chargeInput);
      for (let lottoCount = 0; lottoCount < availableLottoAmount; lottoCount = lottoCount + 1) {
        const lottoNumbers = this.createLottoNumbers();
        const lotto = Lotto.create(lottoNumbers);
        lottoList.push(lotto);
      }
      this.lottoList = lottoList;
    } catch ({ message }) {
      alert(message);
    }
  }

  createLottoNumbers() {
    const lottoArray = new Set();

    while (lottoArray.size < NUMBER.LOTTO_NUMBER_LENGTH) {
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
