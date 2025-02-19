import { MIN_PRICE } from '../src/constants/common.js';
import LottoMachine from '../src/Model/LottoMachine.js';

describe('로또 머신 테스트', () => {
  test('구입 금액만큼 로또 발행 테스트', () => {
    const count = 2;
    const lottoMachine = new LottoMachine(MIN_PRICE * count);
    const lottos = lottoMachine.generateLotto();

    expect(lottos.length).toBe(count);
  });
});
