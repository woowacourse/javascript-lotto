import LottoMatcher from '../../src/domain/LottoMatcher';

describe('로또 매칭 테스트', () => {
  test('발행된 로또 티켓마다 당첨 번호와 보너스 번호를 비교한 총 결과를 확인한다.', () => {
    const tickets = [
      [5, 8, 9, 12, 18, 24],
      [1, 2, 4, 12, 18, 42],
      [1, 4, 12, 18, 24, 28],
      [2, 12, 18, 24, 28, 29],
      [2, 4, 12, 18, 24, 28],
    ];
    const winningNumber = [2, 4, 12, 18, 24, 28];
    const bonusNumber = 29;
    const answer = {
      6: 1,
      '5+보너스': 1,
      5: 1,
      4: 1,
      3: 1,
    };

    const matchingResult = new LottoMatcher(tickets, [winningNumber, bonusNumber]).matchingResult;
    expect(matchingResult).toEqual(answer);
  });
});
