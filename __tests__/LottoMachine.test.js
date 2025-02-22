import { MIN_PRICE } from '../src/constants/common.js';
import LottoMachine from '../src/Model/LottoMachine.js';

describe('로또 머신 테스트', () => {
  test('구입 금액만큼 로또 수량을 발행한다.', () => {
    const count = 2;
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.generateLotto(MIN_PRICE * count);

    expect(lottos.length).toBe(count);
  });

  test('새로 발행한 로또 숫자가 기존에 발행된 로또 숫자와 동일한 경우 로또 번호 배열에 추가되지 않는다.', () => {
    const lottoMachine = new LottoMachine();
    const lottoNumbers = [1];
    const randomNumber = 1;
    const result = [...lottoNumbers];
    lottoMachine.saveUniqueLottoNumber(result, randomNumber);

    expect(result.length).toEqual(lottoNumbers.length);
  });
});
