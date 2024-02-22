import LottoNumber from "./LottoNumber";

export default class WinLottoNumber extends LottoNumber {
  #bonusNumber;

  constructor(numbers) {
    super(numbers);
  }

  setBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
    this.#validBonusNumber();
  }

  #validBonusNumber() {
    this.validInRangeWrapper(this.#bonusNumber);
    this.#validDuplicate();
  }

  #validDuplicate() {
    if (this.getLottoNumbers().includes(this.#bonusNumber)) {
      throw new Error("❌");
    }
  }

  getWinLottoNumbers() {
    return {
      winNumbers: this.getLottoNumbers(),
      bonusNumber: this.#bonusNumber,
    };
  }
}
