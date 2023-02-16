const LottoGame = require('../src/domain/LottoGame');

describe('LottoGame 생성 테스트', () => {
  test('구입 금액으로 8000원이 들어왔을 때 8장의 로또가 발행된다.', () => {
    const userBudget = 8000;
    const lottoGame = new LottoGame(userBudget);

    expect(lottoGame.getLottoTickets().length).toBe(8);
  });
});
