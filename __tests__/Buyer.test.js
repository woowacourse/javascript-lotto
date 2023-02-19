import Buyer from '../src/domain/Buyer';
import Lotto from '../src/domain/Lotto';
import LottoFactory from '../src/domain/LottoFactory';
import LottoResult from '../src/domain/LottoResult';
import WinningLotto from '../src/domain/WinningLotto';

const mockLottoFactory = (lottos) => {
  const remainLottos = [...lottos];

  return new (class extends LottoFactory {
    createRandomLotto() {
      return remainLottos.shift();
    }
  })();
};

describe('Buyer', () => {
  context('Buyer가 돈을 가지고 있을 때', () => {
    it.each([
      { money: 8000, amount: 8 },
      { money: 1000, amount: 1 },
    ])(
      '$money원을 가지고 있을 때 $amount개의 로또를 구매할 수 있어야 한다.',
      ({ money, amount }) => {
        const buyer = new Buyer(money);
        buyer.buyLottos();

        expect(buyer.getLottos()).toHaveLength(amount);
      },
    );
  });

  context('Buyer가 로또를 가지고 있을 때', () => {
    it('보상 금액에 대해 수익률을 계산할 수 있어야 한다.', () => {
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
      const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
      const lottoResult = new LottoResult(winningLotto);

      // when
      buyer.buyLottos(lottoFactory);
      buyer.receiveRewards(lottoResult);
      const profitRate = buyer.getProfitRate();

      // then
      expect(profitRate).toBe(6001);
    });
  });
});
