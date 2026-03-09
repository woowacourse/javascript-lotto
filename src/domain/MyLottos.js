import { PRIZE } from "../constants/constant.js";
import { calculateLottoCount } from "../service/calculateLottoCount.js";
import { getLottos } from "../service/getRandomLotto.js";
import { Validator } from "../validator/Validator.js";

class MyLotto {
  #money;
  #randomLotto = [];

  constructor(money, randomLotto) {
    Validator.validatePurchaseMoney(money);
    this.#money = money;
    this.#randomLotto = randomLotto;
  }

  static createMyLotto(money) {
    const count = calculateLottoCount(money);
    const randomLottos = getLottos(count);

    return new MyLotto(money, randomLottos);
  }

  getProfit(result) {
    const totalPrize =
      result.FIRST * PRIZE.FIRST +
      result.SECOND * PRIZE.SECOND +
      result.THIRD * PRIZE.THIRD +
      result.FOURTH * PRIZE.FOURTH +
      result.FIFTH * PRIZE.FIFTH;
    
    const profit = ((totalPrize / this.#money) * 100);
    
    return profit;
  }

  getMoney() {
    return this.#money;
  }

  getRandomLotto() {
    return [...this.#randomLotto];
  }
}

export default MyLotto;
