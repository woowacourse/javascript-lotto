import LottoMachine from '../../src/domain/LottoMachine.js';
import SORT from '../../src/constant/sort.js';

describe('LottoMachine 테스트', () => {
  test('generateLottoNumbers가 6개의 오름차순으로 정렬된 숫자를 반환한다.', () => {
    const lottos = LottoMachine.generateLottos(10000);
    const length = 6;

    lottos.forEach(lotto => {
      const lottoNumbers = lotto.getNumbers();

      expect(lottoNumbers.length).toBe(length);
      expect(Array.isArray(lottoNumbers)).toBeTruthy();
      expect(lottoNumbers).toEqual(lottoNumbers.sort(SORT.ascendingOrder));
    });
  });
});
