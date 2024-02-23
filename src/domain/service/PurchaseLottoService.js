import { makeRandom } from '../../Utils/Utils.js';
import CONDITION from '../../constant/Condition.js';
import ERROR from '../../constant/Error.js';
import LottoNumberList from '../entity/LottoNumberList.js';

class PurchaseLottoService {
  #purchaseCount;
  #lottos;

  constructor(
    purchaseMoneyString,
  ) {
    this.#validate(
      purchaseMoneyString,
    );
    this.#purchaseCount =
      this.#calcPurchaseCount(
        purchaseMoneyString,
      );
    this.#makeLottos();
  }

  #validate(moneyString) {
    this.#validateNumber(
      moneyString,
    );
    this.#validateMultiple(
      moneyString,
    );
  }

  #validateNumber(
    moneyString,
  ) {
    if (isNaN(moneyString)) {
      throw new Error(
        ERROR.beNumber,
      );
    }
  }

  #validateMultiple(
    moneyString,
  ) {
    if (
      Number(moneyString) %
        CONDITION.pricePerLotto !==
      0
    ) {
      throw new Error(
        ERROR.beMultiple,
      );
    }
  }

  #calcPurchaseCount(
    moneyString,
  ) {
    return (
      Number(moneyString) /
      CONDITION.pricePerLotto
    );
  }

  #getLotto() {
    const randoms = new Set(
      [],
    );
    const min =
      CONDITION.lottoNumberMin;
    const max =
      CONDITION.lottoNumberMax;

    while (
      randoms.size <
      CONDITION.countOfNumberInTicket
    ) {
      randoms.add(
        makeRandom.number(
          min,
          max,
        ),
      );
    }
    return new LottoNumberList(
      [...randoms],
    );
  }

  #makeLottos() {
    this.#lottos = [
      ...Array(
        this.#purchaseCount,
      ),
    ].map(() =>
      this.#getLotto(),
    );
  }

  getLottos() {
    return this.#lottos.map(
      lotto =>
        lotto.getNumbers(),
    );
  }

  getPurchaseCount() {
    return this
      .#purchaseCount;
  }
}

export default PurchaseLottoService;
