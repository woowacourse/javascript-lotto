import { LOTTO_NUMBER_LENGTH } from '../src/constants/common.js';
import Lotto from '../src/Model/Lotto.js';

describe('로또', () => {
  test('6자리 정렬되지 않은 숫자 배열을 오름차순으로 정렬한다.', () => {
    const lottoNumbers = Array.from({ length: LOTTO_NUMBER_LENGTH }, (_, i) => LOTTO_NUMBER_LENGTH - i);
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.numbers).toEqual(lottoNumbers.sort((a, b) => a - b));
  });
});
