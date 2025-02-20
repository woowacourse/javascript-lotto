import { LOTTO_NUMBER_LENGTH } from '../src/constants/common.js';
import Lotto from '../src/Model/Lotto.js';

describe('로또 ', () => {
  test('6자리 숫자로 로또를 만든다', () => {
    const lottoNumbers = Array.from({ length: LOTTO_NUMBER_LENGTH }, (_, i) => i + 1);
    const lotto = new Lotto(lottoNumbers);

    expect(lotto).toBeDefined();
  });

  test('로또 번호 숫자 오름차순 정렬 테스트', () => {
    const lottoNumbers = Array.from({ length: LOTTO_NUMBER_LENGTH }, (_, i) => LOTTO_NUMBER_LENGTH - i);
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.numbers).toEqual(lottoNumbers.sort((a, b) => a - b));
  });
});
