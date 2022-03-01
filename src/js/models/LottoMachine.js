import { LOTTO } from '../constants/constants.js';
import Lotto from '../models/Lotto.js';
import validateMoney from '../validations/PurchaseLottos.js';
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];
  #winningLottos = [0, 0, 0, 0, 0, 0]; // 인덱스의 숫자가 일치하는 숫자의 갯수와 동일
  #winningLottoWithBonus = 0;

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

  getProfit() {
    const winningPrize = [0, 0, 5000, 50000, 1500000, 2000000000];
    const winningPrizeWithBonus = 30000000;

    let profit = 0;
    this.#winningLottos.map((item, index) => {
      profit += item * winningPrize[index];
    });
    profit += this.#winningLottoWithBonus * winningPrizeWithBonus;
    return profit;
  }

  getProfitRate(profit, startMoney) {
    // (투자 후 금액 - 투자 원금) / 투자 원금 * 100
    return ((profit - startMoney) / startMoney) * 100;
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

  checkWinningLottos(winningNumbers, bonusNumber) {
    this.#lottos.map(({ numbers }) => {
      const set = new Set([...numbers, ...winningNumbers]);
      const coincideNumberQuantity =
        LOTTO.NUMBER_QUANTITY + LOTTO.NUMBER_QUANTITY - set.size;
      if (coincideNumberQuantity === 5 && numbers.includes(bonusNumber)) {
        this.#winningLottoWithBonus += 1;
        return;
      }
      this.#winningLottos[coincideNumberQuantity]++;
    });
  }
}
