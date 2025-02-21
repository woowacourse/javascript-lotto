import LottoTicket from "../src/domain/LottoTicket.js";

let userLotto;
beforeEach(() => {
  const price = 5000;
  userLotto = new LottoTicket(price);
});

test("구입 금액에 해당하는 만큼 로또를 발행해야 한다", () => {
  expect(userLotto.lottos.length).toBe(5);
});
