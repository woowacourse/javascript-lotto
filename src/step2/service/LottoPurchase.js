import LottoShop from "../domain/LottoShop";

export default class LottoPurchase {
  constructor(setLottoList) {
    this.setLottoList = setLottoList;
  }

  purchaseLotto(purchaseAmount) {
    const lottoList = LottoShop.purchaseLotto(purchaseAmount);
    this.setLottoList({ lottoList });
    return lottoList;
  }
}
