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
