import { LOTTO, SELECTOR } from "../constants/constants.js";
import Lotto from "../models/Lotto.js";
import validateMoney from "../validations/PurchaseLottos.js";
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];
  #winLottos = [0, 0, 0, 0, 0, 0, 0]; // [0개 일치, 1개 일치, ... 5개 일치 , 6개 일치]
  #winLottosWithBonus = 0;

  get inputMoney() {
    return this.#inputMoney;
  }

  set inputMoney(money) {
    validateMoney(money);
    this.#inputMoney = money;
  }

  get lottos() {
    return this.#lottos;
  }

  set lottos(lottos) {
    this.#lottos = lottos;
  }

  get lottoQuantity() {
    return this.#inputMoney / LOTTO.PRICE;
  }

  get winLottos() {
    return this.#winLottos;
  }

  get winLottosWithBonus() {
    return this.#winLottosWithBonus;
  }

  generateLottos() {
    return Array(this.lottoQuantity)
      .fill()
      .map(() => {
        const lotto = new Lotto();
        lotto.numbers = lotto.pickNumbers();
        return lotto;
      });
  }

  getProfit() {
    let profit = this.#winLottos.reduce(
      (acc, winLottoCount, index) =>
        (acc += winLottoCount * LOTTO.WINNING_PRIZE[index]),
      0
    );
    profit += this.#winLottosWithBonus * LOTTO.WINNING_PRIZE_WITH_BONUS;
    return profit;
  }

  countWinLottos(winningNumbers, bonusNumber) {
    this.#lottos.map(({ numbers }) => {
      const set = new Set([...numbers, ...winningNumbers]);
      const coincideNumberCount =
        LOTTO.NUMBER_QUANTITY + LOTTO.NUMBER_QUANTITY - set.size;
      if (coincideNumberCount === 5 && numbers.includes(bonusNumber)) {
        this.#winLottosWithBonus += 1;
        return;
      }
      this.#winLottos[coincideNumberCount]++;
    });
  }

  resetMachine() {
    this.#inputMoney = 0;
    this.#lottos = [];
    this.#winLottos = [0, 0, 0, 0, 0, 0, 0];
    this.#winLottosWithBonus = 0;
  }

  resetWinLottos() {
    this.#winLottos = [0, 0, 0, 0, 0, 0, 0];
    this.#winLottosWithBonus = 0;
  }
}
