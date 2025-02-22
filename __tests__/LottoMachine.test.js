import { MIN_PRICE, LOTTO_NUMBER_LENGTH } from '../src/constants/common.js';
import LottoMachine from '../src/Model/LottoMachine.js';

describe('로또 머신 테스트', () => {
  test('구입 금액만큼 로또 발행 테스트', () => {
    const count = 2;
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.generateLotto(MIN_PRICE * count);

    expect(lottos.length).toBe(count);
  });

  test('로또 한장에 중복되지 않는 번호가 저장되었는지 테스트', () => {
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.generateLotto(MIN_PRICE);

    lottos.forEach((lotto) => {
      const uniqueNumbers = new Set(lotto.numbers);
      expect(uniqueNumbers.size).toBe(LOTTO_NUMBER_LENGTH);
    });
  });
});
