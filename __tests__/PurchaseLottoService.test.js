import ERROR from '../src/constant/Error.js';
import CONDITION from '../src/constant/Condition.js';

class PurchaseLottoService {
  #purchaseCount;
  #lottos;

  constructor(purchaseMoneyString) {
    this.#validate(purchaseMoneyString);
    this.#purchaseCount = this.#calcPurchaseCount(purchaseMoneyString);
    // TODO
    // this.#makeLottos();
  }

  #validate(moneyString) {
    this.#validateNotNumber(moneyString);
    this.#validateMultiple(moneyString);
  }

  #validateNotNumber(moneyString) {
    if (isNaN(moneyString)) {
      throw new Error(ERROR.beNumber);
    }
  }

  #validateMultiple(moneyString) {
    if (Number(moneyString) % CONDITION.pricePerLotto !== 0) {
      throw new Error(ERROR.beMultiple);
    }
  }

  #calcPurchaseCount(moneyString) {
    return Number(moneyString) / CONDITION.pricePerLotto;
  }

  #makeLotto() {
    const randoms = new Set([]);
    const min = CONDITION.lottoNumberMin;
    const max = CONDITION.lottoNumberMax;

    while (randoms.size < CONDITION.countOfNumberInTicket) {
      randoms.add(this.#makeRandom(min, max));
    }
    return Array(...randoms);
  }

  #makeRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getPurchaseCount() {
    return this.#purchaseCount;
  }
}

describe('로또 구매 클래스 테스트', () => {
  test('성공 케이스', () => {
    const PURCHASE_MONEY = '8000';
    expect(() => new PurchaseLottoService(PURCHASE_MONEY)).not.toThrow();
  });

  test.each([
    ['8000', 8],
    ['10000', 10],
  ])(
    '구입 금액을 입력했을 때, 올바른 구매 장수를 리턴한다.',
    (PURCHASE_MONEY, EXPECTED_PURCHASE_COUNT) => {
      const purchaseCount = new PurchaseLottoService(
        PURCHASE_MONEY,
      ).getPurchaseCount();

      expect(purchaseCount).toBe(EXPECTED_PURCHASE_COUNT);
    },
  );

  test.each(['1x', 'a'])(
    '숫자형이 아닌 입력을 구매금액으로 받았을 때, 에러를 발생시킨다.',
    MONEY_STRING => {
      expect(() => new PurchaseLottoService(MONEY_STRING)).toThrow('[Error]');
    },
  );

  test.each(['1100', '1500'])(
    '1000의 배수가 아닌 입력을 구매금액으로 받았을 때, 에러를 발생시킨다.',
    MONEY_STRING => {
      expect(() => new PurchaseLottoService(MONEY_STRING)).toThrow('[Error]');
    },
  );
});
