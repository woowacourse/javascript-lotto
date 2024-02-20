import LottoCalculator from '../src/domains/LottoCalculator';

describe('당첨 번호와 발행 번호 비교하는 테스트', () => {
  test('당첨 번호와 발행 번호를 비교시 3개가 일치한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const lottoNumbers = [1, 2, 3, 7, 8, 9];

    const lottoCalculator = new LottoCalculator(winningNumbers, lottoNumbers);
    const result = lottoCalculator.compare(winningNumbers, lottoNumbers);

    expect(result).toEqual(3);
  });
});
