import { LOTTO } from "../utils/constants.js";
import ResultLottoDatas from "./resultLottoDatas.js";

export default class CalculateUserLotto {

  static setLottoNumberResult(lottoNumbers) {
    this.lottoNumbersResult = ResultLottoDatas.getLottoList()
    .map((numbers) => Array.from(numbers))
    .map((numbers) => numbers.filter((number) => lottoNumbers.includes(number)));
  }

  static setBonusNumbersResult(bonusNumber) {
    this.bonusNumbersResult = ResultLottoDatas.getLottoList()
      .map((numbers) => Array.from(numbers))
      .map((numbers) => numbers.filter((numbers) => bonusNumber.includes(numbers)));
  }

  static distinguishLottoNumber() {
    this.userLottoResult = Array.from({ length: 5 }, () => 0);
    this.winLottoMoney = 0;
    this.lottoNumbersResult
      .map((numbers) => numbers.length)
      .map((correctNumber, bonusNumberIndex) => 
        correctNumber === LOTTO.FIVE_CORRECT && this.bonusNumbersResult[bonusNumberIndex].length > 0 
          ? correctNumber = LOTTO.FIVE_BONUS_CORRECT 
          : correctNumber)
      .map((correctNumber) => this.countCorrectLotto(correctNumber));
    ResultLottoDatas.setUserLottoResult(this.userLottoResult);
    this.calculateReturnRate();
  }

  static countCorrectLotto(correctNumber) {
    switch (correctNumber) {
      case LOTTO.THREE_CORRECT :
        this.winLottoMoney += LOTTO.THREE_CORRECT_PRICE;
        this.userLottoResult[0]++;
      break;
      case LOTTO.FOUR_CORRECT :
        this.winLottoMoney += LOTTO.FOUR_CORRECT_PRICE;
        this.userLottoResult[1]++;
      break;
      case LOTTO.FIVE_CORRECT :
        this.winLottoMoney += LOTTO.FIVE_CORRECT_PRICE;
        this.userLottoResult[2]++;
      break;
      case LOTTO.FIVE_BONUS_CORRECT:
        this.winLottoMoney += LOTTO.FIVE_BONUS_CORRECT_PRICE;
        this.userLottoResult[3]++;
      break;
      case LOTTO.SIX_CORRECT :
        this.winLottoMoney += LOTTO.SIX_CORRECT_PRICE;
        this.userLottoResult[4]++;
      break;
    }
  }

  static calculateReturnRate() {
    const purchaseMoney = ResultLottoDatas.getPurchaseMoney();
    const ReturnRate = this.winLottoMoney - purchaseMoney < 0 ? 0 : (this.winLottoMoney - purchaseMoney) / purchaseMoney * 100;
    ResultLottoDatas.setUserWinRate(ReturnRate);
  }

};