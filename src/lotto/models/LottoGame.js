export default class LottoGame {
  #lottoItemList = [];

  addLottoItem(numberList) {
    this.#lottoItemList.push({ numberList });
  }
}
