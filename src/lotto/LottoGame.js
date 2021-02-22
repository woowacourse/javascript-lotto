import {getRandomNumber} from "../utils/random.js"

export default class LottoGame {
  #lottoItemList = [];

  #getLottoNumberList() {
    const numberList = new Set();
    while(numberList.size < 6){
      numberList.add(getRandomNumber(1, 45))
    }

    return [...numberList];
  };

  initLottoItemList() {
    this.#lottoItemList = [];
  }

  addLottoItem() {
    const lottoNumberList = this.#getLottoNumberList()
    this.#lottoItemList.push(lottoNumberList);
  }

  get lottoItemList() {
    return this.#lottoItemList;
  }
}
