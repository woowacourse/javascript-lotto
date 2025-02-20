import Lotto from "../src/domain/Lotto.js";
import LottoComparer from "../src/domain/LottoComparer.js";

let lottoComparer;
beforeEach(() => {
  const userLottos = [
    new Lotto([1, 2, 3, 4, 5, 6]),
    new Lotto([1, 3, 4, 5, 6, 10]),
    new Lotto([1, 3, 4, 5, 6, 7]),
    new Lotto([1, 4, 5, 6, 7, 8]),
    new Lotto([1, 5, 6, 7, 8, 9]),
    new Lotto([1, 6, 7, 8, 9, 10]),
    new Lotto([1, 7, 8, 9, 10, 11]),
  ];
  const winningNumber = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  const winningLotto = {
    winningNumbers: winningNumber,
    bonusNumber: bonusNumber,
  };
  lottoComparer = new LottoComparer(userLottos, winningLotto);
});

test("사용자의 로또와 당첨 번호가 몇 개 동일한지 비교한다.", () => {
  const countResults = lottoComparer.countMatchingNumbers();

  expect(countResults).toEqual([6, 5, "bonus", 4, 3]);
});
