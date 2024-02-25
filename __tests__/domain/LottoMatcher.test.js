import LottoMatcher from '../../src/domain/LottoMatcher';

describe('로또 매칭 테스트', () => {
  test('발행된 로또와 당첨 번호, 보너스 번호를 비교하여 당첨 결과(1등 ~ 5등)를 확인한다.', () => {
    const lottoTicketsArray = [
      [5, 8, 9, 12, 18, 24],
      [1, 2, 4, 12, 18, 42],
      [1, 4, 12, 18, 24, 28],
      [2, 12, 18, 24, 28, 29],
      [2, 4, 12, 18, 24, 28],
    ];
    const winningNumber = [2, 4, 12, 18, 24, 28];
    const bonusNumber = 29;
    const result = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };

    const lottoMatcher = new LottoMatcher(winningNumber, bonusNumber);
    lottoMatcher.processMatches(lottoTicketsArray);

    expect(lottoMatcher.matchingResult).toEqual(result);
  });
});
