import { AMOUNT, BONUS, LOTTO_NUMBER, REWARD } from "../utils/constants.js";
import { getRandomNumber } from "../utils/general.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
    this.profitRate = 0;
    this.result = {
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      [BONUS]: 0,
    };
  }

  getLottoList() {
    return this.lottos;
  }

  getLottoCount() {
    return this.lottos.length;
  }

  #getTicketAmount() {
    return this.getLottoCount() * AMOUNT.UNIT;
  }

  #getLottoNumbers() {
    const numbers = [];
    while (numbers.length < LOTTO_NUMBER.LENGTH) {
      const randomNumber = getRandomNumber(LOTTO_NUMBER.RANGE_MIN, LOTTO_NUMBER.RANGE_MAX);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }

  generateLottoTickets(count) {
    this.lottos = Array.from({ length: count }, () => this.#getLottoNumbers());
  }

  generateResult(winningNumbers, bonusNumber) {
    this.#resetResult();
    this.#calculateMatchCount(winningNumbers, bonusNumber);
    this.#calculateProfitRate();
  }

  #calculateMatchCount(winningNumbers, bonusNumber) {
    this.lottos.forEach((lotto) => {
      const matchCount = lotto.filter((number) => winningNumbers.includes(number)).length;
      if (matchCount < 3) {
        return;
      }
      if (matchCount === 5 && lotto.includes(bonusNumber)) {
        this.result[BONUS]++;
        return;
      }
      this.result[matchCount]++;
    });
  }

  #calculateProfitRate() {
    const totalProfit = Object.keys(this.result)
      .map((key) => {
        return this.result[key] * REWARD[key];
      })
      .reduce((a, b) => a + b, 0);

    this.profitRate = Math.floor(
      ((totalProfit - this.#getTicketAmount()) / this.#getTicketAmount()) * 100,
    );
  }

  #resetResult() {
    Object.keys(this.result).forEach((key) => (this.result[key] = 0));
    this.profitRate = 0;
  }
}
