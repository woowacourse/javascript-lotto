import Buyer from '../src/domain/Buyer';

describe('Buyer 클래스 테스트', () => {
  test('사용자는 로또를 구매할 수 있다.', () => {
    // given
    const money = 8000;
    const amount = 8;

    // when
    const buyer = new Buyer(money);
    buyer.buyLottos();

    // then
    expect(buyer.getLottos()).toHaveLength(amount);
  });
});

describe('Buyer 클래스 예외 테스트', () => {
  test.each([8800, 0, 100])(
    '로또 구매 금액과 맞아 떨어지 않을 경우 예외를 발생시킨다.',
    (money) => {
      const buyer = new Buyer(money);

      expect(() => buyer.buyLottos()).toThrowError();
    },
  );
});
