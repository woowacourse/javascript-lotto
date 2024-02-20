import Lotto from '../src/domain/Lotto';
import LottoMachine from '../src/domain/LottoMachine';

describe('구입 금액만큼 로또 발행', () => {
  let lottoMachine;

  beforeEach(() => {
    lottoMachine = new LottoMachine();
  });

  test('구입 금액이 1000 미만이라면 에러를 발생시킨다.', () => {
    const purchaseAmount = 999;

    expect(() => lottoMachine.publishLottos(purchaseAmount)).toThrow(
      '구입금액은 1000 이상이어야 합니다.'
    );
  });

  test.each([
    [1000, 1],
    [2000, 2],
    [3000, 3]
  ])(
    '구입 금액이 1000 이상이라면 발행 수량만큼 로또를 발행한다.',
    (purchaseAmount, quantity) => {
      const lottos = lottoMachine.publishLottos(purchaseAmount);

      expect(lottos.length).toBe(quantity);
      expect(lottos.every((lotto) => lotto instanceof Lotto)).toBe(true);
    }
  );
});
