import {
  BONUS,
  CONVERT_TO_COUNT_INFO,
  MATCH_COUNT_INFO,
  MATCH_NUMBER,
  WINNER_PRICE,
} from "../utils/constants.js";
import Lotto from "./Lotto.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
    this.result = {
      [MATCH_COUNT_INFO.THREE]: [WINNER_PRICE.FIFTH, 0],
      [MATCH_COUNT_INFO.FOUR]: [WINNER_PRICE.FOURTH, 0],
      [MATCH_COUNT_INFO.FIVE]: [WINNER_PRICE.THIRD, 0],
      [MATCH_COUNT_INFO.BONUS]: [WINNER_PRICE.SECOND, 0],
      [MATCH_COUNT_INFO.SIX]: [WINNER_PRICE.FRIST, 0],
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
      if (matchCount < MATCH_NUMBER.THREE) {
        return;
      }
      if (matchCount === MATCH_NUMBER.FIVE) {
        this.#checkBonusNumber(lotto, bonusNumber);
      }
      this.result[CONVERT_TO_COUNT_INFO[matchCount]][1]++;
    });
  }

  #checkBonusNumber(lotto, bonusNumber) {
    if (lotto.includes(bonusNumber)) {
      this.result[CONVERT_TO_COUNT_INFO[BONUS]][1]++;
      return;
    }
  }
}
