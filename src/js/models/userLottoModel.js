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
      .map((correctNumber, index) => correctNumber === 5 && this.#bonusNumbersResult[index].length > 0 ?  correctNumber = 5.5 : correctNumber)
      .map((correctNumber) => this.countCorrectLotto(correctNumber));
  }

  countCorrectLotto(correctNumber) {
    switch (correctNumber) {
      case 3 :
        this.#winLottoMoney += 5000;
        this.#lottoResult[0]++;
      break;
      case 4 :
        this.#winLottoMoney += 50000;
        this.#lottoResult[1]++;
      break;
      case 5 :
        this.#winLottoMoney += 1500000;
        this.#lottoResult[2]++;
      break;
      case 5.5:
        this.#winLottoMoney += 30000000;
        this.#lottoResult[3]++;
      break;
      case 6 :
        this.#winLottoMoney += 2000000000;
        this.#lottoResult[4]++;
      break;
    }
  }

  calculateReturnRate(purchaseMoney) {
    return (this.#winLottoMoney - purchaseMoney) / purchaseMoney * 100;
  }

  getLottoResult() {
    return this.#lottoResult;
  }

  getWinLottoMoney() {
    return this.#winLottoMoney;
  }

};
