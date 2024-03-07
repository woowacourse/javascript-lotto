import ERROR from '../src/constant/Error.js';
import PurchaseLottoService from '../src/domain/service/PurchaseLottoService.js';

describe('로또 구매 클래스 테스트', () => {
  test('성공 케이스', () => {
    const MONEY_STRING = '8000';
    expect(() => new PurchaseLottoService(MONEY_STRING)).not.toThrow();
  });

  test.each([
    ['8000', 8],
    ['10000', 10],
  ])(
    '구입 금액을 입력했을 때, 올바른 구매 장수를 리턴한다.',
    (MONEY_STRING, EXPECTED_PURCHASE_COUNT) => {
      const purchaseCount = new PurchaseLottoService(MONEY_STRING).getPurchaseCount();

      expect(purchaseCount).toBe(EXPECTED_PURCHASE_COUNT);
    },
  );

  test.each(['1x', 'a'])(
    '숫자형이 아닌 입력을 구매금액으로 받았을 때, 에러를 발생시킨다.',
    (MONEY_STRING) => {
      expect(() => new PurchaseLottoService(MONEY_STRING)).toThrow(ERROR.messageStartWith);
    },
  );

  test.each(['1100', '1500'])(
    '1000의 배수가 아닌 입력을 구매금액으로 받았을 때, 에러를 발생시킨다.',
    (MONEY_STRING) => {
      expect(() => new PurchaseLottoService(MONEY_STRING)).toThrow(ERROR.messageStartWith);
    },
  );

  test.each(['-5000', '0'])(
    '양수가 아닌 구매 금액을 받았을 때, 에러를 발생시킨다.',
    (MONEY_STRING) => {
      expect(() => new PurchaseLottoService(MONEY_STRING)).toThrow(ERROR.messageStartWith);
    },
  );
});
