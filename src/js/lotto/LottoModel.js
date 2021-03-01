import { shuffle } from "../utils.js";

export default class LottoModel {
  constructor() {
    this.lottoList = []; // [ { number: [0, ] } ]
    this.price = 0;
  }

  resetLottoList() {
    this.lottoList = [];
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

  manualPurchase(manualPurcahseNumbers) {
    this.lottoList.push({
      number: [...manualPurcahseNumbers].sort((a, b) => a - b),
    });
  }

  autoPurchase() {
    const leftLottoCount = this.price / 1000 - this.lottoList.length;

    this.lottoList = [...this.lottoList].concat(
      [...Array(leftLottoCount)].map(() => this.createLotto())
    );
  }

  isEveryLottoPurchased() {
    return this.lottoList.length === this.price / 1000;
  }
}
