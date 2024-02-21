import LottoMachine from '../../src/domain/LottoMachine';
import Money from '../../src/domain/Money';

describe('로또 머신 테스트', () => {
  test('구입 금액에 해당하는 만큼 로또를 발행하는가', () => {
    const money = new Money(8000);
    const lottoMachine = new LottoMachine(money);

    expect(lottoMachine.lottos.length).toBe(8);
  });
});
