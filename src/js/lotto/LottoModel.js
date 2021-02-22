import { shuffle } from "../utils.js";

export default class LottoModel {
  constructor() {
    this.lottoList = []; // [ { number: [0, ] } ]
    this.price = 0;
  }

  createLotto() {
    const baseNumbers = Array.from({ length: 45 }, (_, i) => i + 1);

    shuffle(baseNumbers);

    return {
      number: baseNumbers.slice(0, 6).sort((a, b) => a - b),
    };
  }

  buy(price) {
    const numOfLottoes = price / 1000;
    this.lottoList = [...Array(numOfLottoes)].map(() => this.createLotto());
    this.price = price;
  }
}
