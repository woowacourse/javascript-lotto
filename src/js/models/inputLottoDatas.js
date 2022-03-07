import CalculatePurchaseLotto from './calculatePurchaseLotto.js';
import CalculateUserLotto from "./calculateUserLotto.js";
import ResultLottoDatas from './resultLottoDatas.js';

export default class InputLottoDatas {
  #userLottoNumbers;
  #userBonusNumber;
  #purchaseMoney = 0; 

  initPurchaseLotto() {
    this.#purchaseMoney = 0;
    ResultLottoDatas.setPurchaseMoney(this.#purchaseMoney);
  }

  setUserLotto(userLottoNumbers, userBonusNumber) {
    this.#userLottoNumbers = userLottoNumbers;
    this.#userBonusNumber = userBonusNumber;
    CalculateUserLotto.setLottoNumberResult(this.#userLottoNumbers);
    CalculateUserLotto.setBonusNumbersResult(this.#userBonusNumber);
    CalculateUserLotto.distinguishLottoNumber();
  }  

  setPurchaseMoney(purchaseMoney) {
    this.#purchaseMoney = Number(purchaseMoney);
    CalculatePurchaseLotto.setLottoGameList(this.#purchaseMoney);
    ResultLottoDatas.setPurchaseMoney(this.#purchaseMoney);
  }
}