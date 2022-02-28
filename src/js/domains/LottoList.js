import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';
import { deepCopy } from '../utils/copy';
import { isValidCharge } from '../utils/validator';
import Lotto from './Lotto';

class LottoList {
  constructor() {
    this.lottoList = null;
  }

  getLottoList() {
    /** getter로 가져간 lottoList를 변경하여도 lottoList의 멤버에겐 영향이 없다. */
    return deepCopy(this.lottoList);
  }

  createLottoList(chargeInput) {
    /** 정상적이지 않은 로또가 하나라도 존재한다면, 멤버는 빈 값이고 사용자는 금액을 다시 입력하여야 한다. */
    const availableLottoAmount = this.#exchangeChargeToLottoAmount(chargeInput);
    const lottoList = [...new Array(availableLottoAmount)].map(() => new Lotto());
    this.lottoList = lottoList;
  }

  #exchangeChargeToLottoAmount(charge) {
    if (isValidCharge(charge)) {
      return Math.floor(charge / NUMBER.LOTTO_PRICE);
    }
    throw new Error(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
  }
}
export default LottoList;
