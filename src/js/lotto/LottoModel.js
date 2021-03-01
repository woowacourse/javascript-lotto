import { shuffle } from "../utils.js";
import { LOTTO_PRICE } from "./constants/lotto_constants.js";

export default class LottoModel {
  constructor() {
    this.lottoTickets = null;
    this.price = 0;
    this.numOfLottoes = 0;
  }

  init(price) {
    this.lottoTickets = []; //[ { number: [0, ] } ]
    this.price = price;
    this.numOfLottoes = price / LOTTO_PRICE;
  }

  getAutoSelectedNumbers(fixedNumbers, requiredLength) {
    if (requiredLength === 0) {
      return;
    }

    const baseNumbers = Array.from({ length: 45 }, (_, i) => i + 1).filter(
      (num) => !fixedNumbers.includes(num)
    );
    shuffle(baseNumbers);

    return baseNumbers.slice(0, requiredLength).sort((a, b) => a - b);
  }

  createLottoTicket(fixedNumbers) {
    this.lottoTickets.push({
      number: [
        ...fixedNumbers,
        ...this.getAutoSelectedNumbers(fixedNumbers, 6 - fixedNumbers.length),
      ],
    });
  }

  buy(purchaseFormElements) {
    [...Array(this.numOfLottoes)].forEach((_, index) => {
      const fixedNumbers = Array.from(
        purchaseFormElements[`lotto-number-${index}`]
      )
        .map(($input) => Number($input.value))
        .filter((value) => value !== 0);

      this.createLottoTicket(fixedNumbers);
    });
  }
}
