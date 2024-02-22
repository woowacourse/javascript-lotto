import PurchaseLottoService from '../src/domain/service/PurchaseLottoService.js';

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

  test('구매 금액을 받았을 때, 로또를 해당 장수만큼 생성한다.', () => {
    const PURCHASE_MONEY = '7000';
    expect(new PurchaseLottoService(PURCHASE_MONEY).getLottos().length).toBe(7);
  });
});
