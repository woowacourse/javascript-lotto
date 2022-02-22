import Lotto from "./Lotto";
import { isValidCharge, getRandomNumber } from "../utils/validator";
import { ERROR_MESSAGE } from "../constants/errorMessage";
class LottoGameModel {
  constructor() {
    this.lottoList = [];
  }

  createLottoList(chargeInput) {
    const availableLottoAmount = this.inputCharge(chargeInput);

    for (let i = 0; i < availableLottoAmount; i++) {
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

    while (lottoArray.size < 6) {
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
    return Math.floor(charge / 1000);
  }
}

export default LottoGameModel;
