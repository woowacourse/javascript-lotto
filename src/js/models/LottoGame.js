import Lotto from "./Lotto";

function isValidCharge(charge) {
  if (Number.isInteger(charge)) {
    return charge >= 1000;
  }
  return false;
}

function getAvailableLottoAmount(charge) {
  return Math.floor(charge / 1000);
}

class LottoGame {
  constructor() {
    this.lottoList = [];
  }

  createLottoList(availableLottoAmount) {
    for (let i = 0; i < availableLottoAmount; i++) {
      try {
        this.lottoList.push(Lotto.create(this.createLottoNumbers()));
      } catch ({ message }) {
        console.log(message);
      }
    }
  }

  createLottoNumbers() {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];

    return lottoNumbers;
  }

  inputCharge(charge) {
    if (isValidCharge(charge)) {
      return getAvailableLottoAmount(charge);
    }
    throw new Error("금액은 1000원 이상이어야합니다.");
  }
}

export default LottoGame;
