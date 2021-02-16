export default class LottoGame {
  #lottoItemList = [];

  initLottoItemList() {
    this.#lottoItemList = [];
  }

  addLottoItem(numberList) {
    this.#lottoItemList.push({ numberList });
  }

  get lottoItemList() {
    return this.#lottoItemList;
  }
}
