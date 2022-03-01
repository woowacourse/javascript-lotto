import { LOTTO } from "../utils/constants.js";

export default class UserLottoModel {
  #lottoNumbersResult;
  #bonusNumbersResult;
  #lottoResult = Array.from({ length: 5 }, () => 0);
  #winLottoMoney = 0;

  initLottoResult() {
    this.#lottoResult = Array.from({ length: 5 }, () => 0);
    this.#winLottoMoney = 0;
  }

  setLottoNumberResult(purchaseLottoList, lottoNumbers) {
    this.#lottoNumbersResult = purchaseLottoList
    .map((numbers) => Array.from(numbers))
    .map((numbers) => numbers.filter((number) => lottoNumbers.includes(number)));
  }

  setBonusNumbersResult(purchaseLottoList, bonusNumber) {
    this.#bonusNumbersResult = purchaseLottoList
      .map((numbers) => Array.from(numbers))
      .map((numbers) => numbers.filter((numbers) => bonusNumber.includes(numbers)));
  }

  distinguishLottoNumber() {
    this.initLottoResult();
    this.#lottoNumbersResult
      .map((numbers) => numbers.length)
      .map((correctNumber, bonusNumberIndex) => correctNumber === 5 && this.#bonusNumbersResult[bonusNumberIndex].length > 0 ?  correctNumber = 5.5 : correctNumber)
      .map((correctNumber) => this.countCorrectLotto(correctNumber));
  }

  countCorrectLotto(correctNumber) {
    switch (correctNumber) {
      case LOTTO.THREE_CORRECT :
        this.#winLottoMoney += LOTTO.THREE_CORRECT_PRICE;
        this.#lottoResult[0]++;
      break;
      case LOTTO.FOUR_CORRECT :
        this.#winLottoMoney += LOTTO.FOUR_CORRECT_PRICE;
        this.#lottoResult[1]++;
      break;
      case LOTTO.FIVE_CORRECT :
        this.#winLottoMoney += LOTTO.FIVE_CORRECT_PRICE;
        this.#lottoResult[2]++;
      break;
      case LOTTO.FIVE_BONUS_CORRECT:
        this.#winLottoMoney += LOTTO.FIVE_BONUS_CORRECT_PRICE;
        this.#lottoResult[3]++;
      break;
      case LOTTO.SIX_CORRECT :
        this.#winLottoMoney += LOTTO.SIX_CORRECT_PRICE;
        this.#lottoResult[4]++;
      break;
    }
  }

  calculateReturnRate(purchaseMoney) {
    return (this.#winLottoMoney - purchaseMoney) < 0 ? 0 : (this.#winLottoMoney - purchaseMoney) / purchaseMoney * 100;
  }

  getLottoResult() {
    return this.#lottoResult;
  }

  getWinLottoMoney() {
    return this.#winLottoMoney;
  }

};
