import Buyer from '../src/domain/Buyer';
import Lotto from '../src/domain/Lotto';
import LottoFactory from '../src/domain/LottoFactory';
import LottoResult from '../src/domain/LottoResult';

const mockLottoFactory = (lottos) => {
  const remainLottos = [...lottos];

  return new (class extends LottoFactory {
    createRandomLotto() {
      return remainLottos.shift();
    }
  })();
};

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

  test('사용자는 로또에 대한 보상을 받은 후 수익률을 계산할 수 있다.', () => {
    // given
    const money = 5000;
    const buyer = new Buyer(money);
    const lottoFactory = mockLottoFactory([
      new Lotto([1, 2, 3, 10, 11, 12]), // 3개
      new Lotto([20, 21, 22, 23, 24, 25]), // 0개
      new Lotto([1, 2, 3, 4, 5, 7]), // 5개+보너스 번호
      new Lotto([7, 8, 9, 10, 11, 12]), // 0개
      new Lotto([30, 31, 32, 33, 34, 35]), // 0개
    ]);
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);

    // when
    buyer.buyLottos(lottoFactory);
    buyer.receiveRewards(lottoResult);
    const profitRate = buyer.getProfitRate();

    // then
    expect(profitRate).toBe(6001);
  });
});

describe('Buyer 클래스 예외 테스트', () => {
  test.each([8800, 0, 100])(
    '로또 구매 금액과 맞아 떨어지 않을 경우 예외를 발생시킨다. (%p)',
    (money) => {
      const buyer = new Buyer(money);

      expect(() => buyer.buyLottos()).toThrowError();
    },
  );
});
