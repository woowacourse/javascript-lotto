import LottoGame from '../src/controller/LottoGame';

describe('로또 게임 기능 테스트', () => {
  test('구입 금액에 해당하는 만큼 1장에 1,000원인 로또를 발행한다.', () => {
    const money = 5000;
    const game = new LottoGame();
    const lottoTickets = game.createLotto(money);
    expect(lottoTickets.length).toBe(5);
  });

  test('당첨 번호가 정상적으로 생성된다.', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const game = new LottoGame();

    expect(game.createWinningNumbers(numbers)).toEqual(numbers);
  });

  test('보너스 번호가 정상적으로 생성된다.', () => {
    const number = 7;
    const game = new LottoGame();

    expect(game.createBonusNumber(number)).toEqual(number);
  });
});
