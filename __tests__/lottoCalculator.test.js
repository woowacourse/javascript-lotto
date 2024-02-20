import LottoCalculator from '../src/domains/LottoCalculator';

describe('당첨 번호와 발행 번호 비교하는 테스트', () => {
  test('당첨 번호와 발행 번호를 비교시 3개가 일치한다.', () => {
    const lottoNumbers = {
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };
    const generatedLottos = [1, 2, 3, 7, 8, 9];

    const lottoCalculator = new LottoCalculator(lottoNumbers, generatedLottos);

    const result = lottoCalculator.compare(
      lottoNumbers.winningNumbers,
      generatedLottos,
    );

    expect(result).toEqual(3);
  });

  test('보너스 번호가 일치하면 true를 반환한다.', () => {
    const lottoNumbers = {
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };
    const generatedLottos = [1, 2, 3, 4, 5, 7];

    const lottoCalculator = new LottoCalculator(lottoNumbers, generatedLottos);

    const isEqualBonusNumber = lottoCalculator.isEqualBonusNumber(
      lottoNumbers.bonusNumber,
      generatedLottos,
    );

    expect(isEqualBonusNumber).toEqual(true);
  });
});
