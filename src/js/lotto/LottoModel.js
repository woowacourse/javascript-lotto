import { shuffle } from "../utils.js";
import { LOTTO_PRICE } from "./constants/lotto_constants.js";

export default class LottoModel {
  constructor() {
    this.lottoList = null;
    this.price = 0;
    this.numOfLottoes = 0;
  }

  init(price) {
    this.lottoList = []; //[ { number: [0, ] } ]
    this.price = price;
    this.numOfLottoes = price / LOTTO_PRICE;
  }

  createLotto() {
    const baseNumbers = Array.from({ length: 45 }, (_, i) => i + 1);

    shuffle(baseNumbers);

    return {
      number: baseNumbers.slice(0, 6).sort((a, b) => a - b),
    };
  }

  buy() {
    const numOfLottoes = this.price / 1000;
    this.lottoList = [...Array(numOfLottoes)].map(() => this.createLotto());
  }
}
