import Lotto from '../src/Model/Lotto.js';
import { getLottoNumberArray } from '../src/util/createNumber.js';

describe('로또', () => {
  test('6자리 정렬되지 않은 숫자 배열을 오름차순으로 정렬한다.', () => {
    const lottoNumbers = getLottoNumberArray();
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.numbers).toEqual(lottoNumbers.sort((a, b) => a - b));
  });
});
