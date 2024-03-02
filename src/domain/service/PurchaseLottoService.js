import CONDITION from '../../constant/Condition';
import ERROR from '../../constant/Error';
import LottoNumberList from '../entity/LottoNumberList';

class PurchaseLottoService {
  #purchaseCount;
  #lottos;

  constructor(purchaseMoneyString) {
    this.#validate(purchaseMoneyString);
    this.#purchaseCount = this.#calcPurchaseCount(purchaseMoneyString);
    this.#makeLottos();
  }

  #validate(moneyString) {
    this.#validateNumber(moneyString);
    this.#validateMultiple(moneyString);
    this.#validateBlank(moneyString);
  }

  #validateNumber(moneyString) {
    if (isNaN(moneyString)) {
      throw new Error(ERROR.beNumber);
    }
  }

  #validateMultiple(moneyString) {
    if (Number(moneyString) % CONDITION.pricePerLotto !== 0) {
      throw new Error(ERROR.beMultiple);
    }
  }

  #validateBlank(moneyString) {
    if (!moneyString) {
      throw new Error(ERROR.beNotBlank);
    }
  }

  #calcPurchaseCount(moneyString) {
    return Number(moneyString) / CONDITION.pricePerLotto;
  }

  #getLotto() {
    const lottoAllNumber = Array(CONDITION.lottoNumberMax)
      .fill(CONDITION.lottoNumberMin)
      .map((lottoNumberMin, index) => lottoNumberMin + index);
    const mixLottoAllNumber = lottoAllNumber.sort(() => Math.random() - 0.5);
    const randoms = [...Array(CONDITION.countOfNumberInTicket)].map(() =>
      mixLottoAllNumber.pop(),
    );
    return new LottoNumberList([...randoms]);
  }

  #makeLottos() {
    this.#lottos = [...Array(this.#purchaseCount)].map(() => this.#getLotto());
  }

  getLottos() {
    return this.#lottos.map(lotto => lotto.getNumbers());
  }

  getPurchaseCount() {
    return this.#purchaseCount;
  }
}

export default PurchaseLottoService;
