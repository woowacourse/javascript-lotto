const LottoGame = require('../src/domain/LottoGame');

describe('LottoGame 생성 테스트', () => {
  test('구입 금액으로 8000원이 들어왔을 때 8장의 로또가 발행된다.', () => {
    const userBudget = 8000;
    const lottoGame = new LottoGame(userBudget);

    expect(lottoGame.getLottoTickets().length).toBe(8);
  });
});

describe('맞춘 개수와 보너스 번호 여부로 등수를 가져온다.', () => {
  const lottoGame = new LottoGame(1000);

  test.each([
    [6, false, 1],
    [5, true, 2],
    [5, false, 3],
    [4, false, 4],
    [3, false, 5],
  ])('당첨 기준에 해당하는 등수를 가져온다.', (matchedNumberCount, hasBonusNumber, expected) => {
    expect(lottoGame.getLottoRank(matchedNumberCount, hasBonusNumber)).toBe(expected);
  });

  test.each([
    [0, false],
    [1, true],
    [2, false],
  ])('당첨 기준에 해당하지 않으면 0을 반환한다.', (matchedNumberCount, hasBonusNumber) => {
    expect(lottoGame.getLottoRank(matchedNumberCount, hasBonusNumber)).toBe(0);
  });
});
