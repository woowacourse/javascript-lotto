import Lotto from "../src/Lotto.js";
import LottoComparisonManager from "../src/LottoComparisonManager.js";

let lottoComparisonManager;
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

  lottoComparisonManager = new LottoComparisonManager(
    userLottos,
    winningNumber,
    bonusNumber
  );
});

test("사용자의 로또와 당첨 번호가 몇 개 동일한지 비교한다.", () => {
  const countResults = lottoComparisonManager.countMatchingNumbers();

  expect(countResults).toEqual([6, 5, 5, 4, 3]);
});

test("사용자의 로또에 보너스 번호가 존재하는지 확인한다.", () => {
  const countResults = lottoComparisonManager.countMatchingNumbers();

  expect(lottoComparisonManager.containsBonusNumbers(countResults)).toEqual([
    false,
    true,
  ]);
});
