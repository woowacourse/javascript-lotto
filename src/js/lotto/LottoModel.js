import { shuffle } from "../utils.js";

export default class LottoModel {
  constructor() {
    this.lottoList = []; // [ { number: [0, ] } ]
    this.price = 0;
  }

  setPrice(price) {
    this.price = price;
  }

  createLotto() {
    const baseNumbers = Array.from({ length: 45 }, (_, i) => i + 1);

    shuffle(baseNumbers);

    return {
      number: baseNumbers.slice(0, 6).sort((a, b) => a - b),
    };
  }

  manaulPurchase(manualNumbers) {
    this.lottoList.push({ number: [...manualNumbers] });
  }

  autoPurchase(leftLottoCount) {
    this.lottoList = [...this.lottoList].concat(
      [...Array(leftLottoCount)].map(() => this.createLotto())
    );
  }
}
