export default class ResultLottoDatas {

  static setPurchaseMoney(purchaseMoney) {
    this.purchaseMoney = purchaseMoney;
  }

  static setLottoList(lottoList) {
    this.lottoList = lottoList;
  }

  static setUserLottoResult(userLottoResult) {
    this.userLottoResult = userLottoResult;
  }

  static setUserWinRate(ReturnRate) {
    this.ReturnRate = ReturnRate;
  }

  static getLottoList() {
    return this.lottoList;
  }

  static getPurchaseMoney() {
    return this.purchaseMoney;
  }

  static getUserLottoResult() {
    return this.userLottoResult;
  }

  static getUserReturnRate() {
    return this.ReturnRate;
  }

}