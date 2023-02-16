import LottoMachine from '../../src/domain/LottoMachine.js';

describe('LottoMachine 테스트', () => {
  test.each([
    [LottoMachine.generateLottoNumbers()],
    [LottoMachine.generateLottoNumbers()],
    [LottoMachine.generateLottoNumbers()],
  ])(
    'generateLottoNumbers가 6개의 오름차순으로 정렬된 숫자를 반환한다.',
    lottoNumbers => {
      const length = 6;
      const sortedLottoNumbers = lottoNumbers.sort((a, b) => a - b);
      const lottoNumberType = 'number';

      expect(lottoNumbers.length).toBe(length);
      lottoNumbers.forEach(lottoNumber =>
        expect(typeof lottoNumber).toBe(lottoNumberType)
      );
      expect(lottoNumbers).toEqual(sortedLottoNumbers);
    }
  );
});
