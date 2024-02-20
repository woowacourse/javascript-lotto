import LottoGame from '../src/controller/LottoGame';
import Lotto from '../src/domain/Lotto';

describe('로또 게임 기능 테스트', () => {
  test('구입 금액에 해당하는 만큼 1장에 1,000원인 로또를 발행한다.', () => {
    const money = 5000;
    const game = new LottoGame();
    const lottoTickets = game.createLotto(money);
    expect(lottoTickets.length).toBe(5);
  });
});
