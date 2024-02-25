import LottoCalculator from '../src/domains/LottoCalculator';

describe('당첨 번호와 발행 번호 비교하는 테스트', () => {
  test('당첨 번호와 발행 번호를 비교시 3개가 일치한다.', () => {
    const lottoNumbers = {
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    const generatedLottos = [[1, 2, 3, 7, 8, 9]];

    const lottoCalculator = new LottoCalculator(lottoNumbers, generatedLottos);

    const result = lottoCalculator.countMatchedNumber(
      lottoNumbers.winningNumbers,
      generatedLottos[0],
    );

    expect(result).toEqual(3);
  });

  test('보너스 번호가 당첨 번호 리스트에 있으면 true를 반환한다.', () => {
    const lottoNumbers = {
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    const generatedLottos = [[1, 2, 3, 4, 5, 7]];

    const lottoCalculator = new LottoCalculator(lottoNumbers, generatedLottos);

    const isEqualBonusNumber = lottoCalculator.isEqualBonusNumber(
      lottoNumbers.bonusNumber,
      generatedLottos[0],
    );

    expect(isEqualBonusNumber).toEqual(true);
  });
});

describe('당첨 통계 테스트', () => {
  test('전체 로또 티켓과 당첨 번호를 비교하여 당첨 통계 객체의 값을 올바르게 증가시킨다.', () => {
    const lottoNumbers = {
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    const generatedLottos = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [1, 2, 3, 4, 7, 8],
      [1, 2, 3, 7, 8, 9],
      [1, 2, 7, 8, 9, 10],
      [1, 7, 8, 9, 10, 11],
    ];

    const lottoStatistics = {
      three: 1,
      four: 1,
      five: 0,
      fiveBonus: 1,
      six: 1,
    };

    const lottoCalculator = new LottoCalculator(lottoNumbers, generatedLottos);

    expect(lottoCalculator.lottoStatistics).toEqual(lottoStatistics);
  });
});

describe('수익률 계산 테스트', () => {
  test('당첨 통계를 바탕으로 총 수익률을 계산한다.(소수점 셋째 자리에서 반올림 한다.)', () => {
    const lottoNumbers = {
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    const generatedLottos = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [1, 2, 3, 4, 7, 8],
      [1, 2, 3, 7, 8, 9],
      [1, 2, 7, 8, 9, 10],
      [1, 7, 8, 9, 10, 11],
    ];

    const lottoCalculator = new LottoCalculator(lottoNumbers, generatedLottos);
    const totalProfit = lottoCalculator.calculateTotalProfit(6);

    expect(totalProfit).toEqual(3_383.43);
  });
});
