import { convertCountToString } from "../utils/constants.js";
import Lotto from "./Lotto.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
    this.result = {
      "3개": [5000, 0],
      "4개": [50000, 0],
      "5개": [1500000, 0],
      "5개 + 보너스볼": [30000000, 0],
      "6개": [2000000000, 0],
    };
  }

  getLottoList() {
    return this.lottos;
  }

  getLottoCount() {
    return this.lottos.length;
  }

  generateLottoTicket(count) {
    this.lottos = Array.from({ length: count }).map(() => {
      const lotto = new Lotto();
      lotto.generateRandomNumber();
      return lotto.numbers;
    });
  }

  generateResult(winningNumbers, bonusNumber) {
    this.lottos.forEach((lotto) => {
      const matchCount = lotto.filter((number) => winningNumbers.includes(number)).length;
      if (matchCount < 3) {
        return;
      }
      if (matchCount === 5) {
        if (lotto.includes(bonusNumber)) {
          this.result[convertCountToString["bonus"]][1]++;
          return;
        }
      }
      this.result[convertCountToString[matchCount]][1]++;
    });
    console.log(this.result);
  }
}
