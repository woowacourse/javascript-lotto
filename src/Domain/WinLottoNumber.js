import LottoNumber from './LottoNumber';

const DUPLICATE_MESSAGE = '당첨번호에 중복된 숫자가 존재합니다.';

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
    // TODO: 숫자형에 대한 검사
    this.validInRangeWrapper(this.#bonusNumber);
    this.#validDuplicate();
  }

  #validDuplicate() {
    if (this.getLottoNumbers().includes(this.#bonusNumber)) {
      throw new Error(DUPLICATE_MESSAGE);
    }
  }

  getWinLottoNumbers() {
    return {
      winNumbers: this.getLottoNumbers(),
      bonusNumber: this.#bonusNumber,
    };
  }
}
