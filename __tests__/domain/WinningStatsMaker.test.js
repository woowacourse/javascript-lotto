import WinningStatsMaker from '../../src/domain/WinningStatsMaker';

describe('당첨 결과 생성 테스트', () => {
  const winningStatsMaker = new WinningStatsMaker();
  test('발행된 로또 티켓과 당첨 번호가 6개 일치하면 1등이다.', () => {
    const ticket = [1, 2, 3, 4, 5, 6];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const rank = winningStatsMaker.judgeWinning(ticket, { winningNumbers, bonusNumber });

    expect(rank).toBe(1);
  });

  test('발행된 로또 티켓과 당첨 번호가 5개 일치하고, 보너스 번호가 일치하면 2등이다.', () => {
    const ticket = [1, 2, 3, 4, 5, 7];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const rank = winningStatsMaker.judgeWinning(ticket, { winningNumbers, bonusNumber });

    expect(rank).toBe(2);
  });

  test('발행된 로또 티켓과 당첨 번호가 5개 일치하고, 보너스 번호가 일치하지 않으면 3등이다.', () => {
    const ticket = [1, 2, 3, 4, 5, 8];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const rank = winningStatsMaker.judgeWinning(ticket, { winningNumbers, bonusNumber });

    expect(rank).toBe(3);
  });

  test('발행된 로또 티켓과 당첨 번호가 4개 일치하면 4등이다.', () => {
    const ticket = [1, 2, 3, 4, 8, 9];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const rank = winningStatsMaker.judgeWinning(ticket, { winningNumbers, bonusNumber });

    expect(rank).toBe(4);
  });

  test('발행된 로또 티켓과 당첨 번호가 3개 일치하면 5등이다.', () => {
    const ticket = [1, 2, 3, 11, 12, 23];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const rank = winningStatsMaker.judgeWinning(ticket, { winningNumbers, bonusNumber });

    expect(rank).toBe(5);
  });

  test('발행된 로또 티켓과 당첨 번호가 3개 미만으로 일치하면 6등이다.(5등 미만인 경우 당첨 통계에 들어가지 않기 위해 6등을 부여한다.)', () => {
    const ticket = [1, 2, 10, 11, 12, 23];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const rank = winningStatsMaker.judgeWinning(ticket, { winningNumbers, bonusNumber });

    expect(rank).toBe(6);
  });
});
