import CONDITION from '../../constant/Condition';
import ERROR from '../../constant/Error';
import Lotto from '../entity/Lotto';

class PurchaseLottoService {
  #purchaseCount;

  #lottos;

  constructor(purchaseMoneyString) {
    this.#validate(purchaseMoneyString);
    this.#purchaseCount = this.#calcPurchaseCount(Number(purchaseMoneyString));
    this.#makeLottos();
  }

  #validate(moneyString) {
    this.#validateNotNumber(moneyString);
    this.#validateMultiple(moneyString);
  }

  #validateNotNumber(moneyString) {
    if (Number.isNaN(moneyString)) {
      throw new Error(ERROR.beNumber);
    }
  }

  #validateMultiple(moneyString) {
    if (Number(moneyString) % CONDITION.pricePerLotto !== 0) {
      throw new Error(ERROR.beMultiple);
    }
  }

  getPurchaseCount() {
    return this.#purchaseCount;
  }

  #calcPurchaseCount(money) {
    return money / CONDITION.pricePerLotto;
  }

  getLottos() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  #getLotto() {
    const randoms = new Set([]);
    const min = CONDITION.lottoNumberMin;
    const max = CONDITION.lottoNumberMax;

    while (randoms.size < CONDITION.countOfNumberInTicket) {
      randoms.add(this.#makeRandom(min, max));
    }
    return new Lotto([...randoms]);
  }

  #makeLottos() {
    this.#lottos = [...Array(this.#purchaseCount)].map(() => this.#getLotto());
  }

  #makeRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default PurchaseLottoService;
