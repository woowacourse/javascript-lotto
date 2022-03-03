import { LOTTO } from '../constants/constants.js';
import Lotto from '../models/Lotto.js';
import validateMoney from '../validations/PurchaseLottos.js';
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];
  #winLottos = [0, 0, 0, 0, 0, 0, 0]; // 인덱스의 숫자가 일치하는 숫자의 갯수와 동일
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

  getProfit() {
    const winningPrize = [0, 0, 0, 5000, 50000, 1500000, 2000000000];
    const winningPrizeWithBonus = 30000000;

    let profit = 0;
    this.#winLottos.map((item, index) => {
      profit += item * winningPrize[index];
    });
    profit += this.#winLottosWithBonus * winningPrizeWithBonus;
    return profit;
  }

  operateLottoMachine() {
    this.#lottos = this.generateLottos();
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
    this.#winLottos = [0, 0, 0, 0, 0, 0];
    this.#winLottosWithBonus = 0;
  }
}
