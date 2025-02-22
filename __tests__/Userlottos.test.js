import UserLottos from "../src/domain/UserLottos.js";

test("구입 금액에 해당하는 만큼 로또를 발행해야 한다", () => {
  const price = 5000;
  const userLotto = new UserLottos(price);

  expect(userLotto.lottos.length).toBe(5);
});
