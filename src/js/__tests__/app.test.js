import LottoGame from "../controller/LottoGame.js";

describe("테스트 그룹 ", () => {
  test("구입할 금액에 따른 로또 티켓 객체를 만들 수 있다.", () => {
    const game = new LottoGame();
    expect(game.makeLottoTicket(3)).toBe(game.lottos.length);
  });
});
