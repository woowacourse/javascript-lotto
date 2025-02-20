import { MIN_PRICE } from '../src/constants/common.js';
import LottoMachine from '../src/Model/LottoMachine.js';

describe('로또 머신 테스트', () => {
  test('구입 금액만큼 로또 발행 테스트', () => {
    const count = 2;
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.generateLotto(MIN_PRICE * count);

    expect(lottos.length).toBe(count);
  });

  test('중복되지 않는 로또 번호 저장 테스트', () => {
    const lottoMachine = new LottoMachine();
    const lottoNumbers = [1];
    const randomNumber = 1;
    const result = [...lottoNumbers];
    lottoMachine.saveUniqueLottoNumber(result, randomNumber);

    expect(result.length).toEqual(lottoNumbers.length);
  });
});
