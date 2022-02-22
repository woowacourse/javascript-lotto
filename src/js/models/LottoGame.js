import Lotto from "./Lotto";
import { isValidCharge, getRandomNumber } from "../utils/validator";

class LottoGame {
  constructor() {
    this.lottoList = [];
  }

  createLottoList(availableLottoAmount) {
    for (let i = 0; i < availableLottoAmount; i++) {
      try {
        const lottoNumbers = this.createLottoNumbers();
        const lotto = Lotto.create(lottoNumbers);
        this.lottoList.push(lotto);
      } catch ({ message }) {
        console.log(message);
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
    throw new Error("금액은 1000원 이상이어야합니다.");
  }

  getAvailableLottoAmount(charge) {
    return Math.floor(charge / 1000);
  }
}

export default LottoGame;
