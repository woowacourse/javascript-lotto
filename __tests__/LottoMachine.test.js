import { LOTTO_RULE } from '../src/domain/constants.js';
import LottoMachine from '../src/domain/model/LottoMachine.js';

describe('구입 금액만큼 로또를 발행한다.', () => {
  let machine;
  const money = 8000;
  beforeEach(() => {
    machine = new LottoMachine();
    machine.createLottos(money);
  });

  test('구입 금액만큼 로또를 발행후 머신에서 보관한다.', () => {
    expect(machine.getLottos()).toHaveLength(money / LOTTO_RULE.PRICE);
  });

  test('머신에서 보관하고 있는 로또의 개수를 반환한다.', () => {
    expect(machine.getLottoQuantity()).toBe(money / LOTTO_RULE.PRICE);
  });
});
