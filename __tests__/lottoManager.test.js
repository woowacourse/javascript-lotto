import LottoManager from "../src/LottoManager";

let lottoManager;
beforeEach(() => {
  const price = 5000;
  lottoManager = new LottoManager(price);
});

test("구입 금액에 해당하는 만큼 로또를 발행해야 한다", () => {
  lottoManager.generateLottos();
  expect(lottoManager.lottos.length).toBe(5);
});

test("당첨 번호와 보너스 번호가 중복되는 경우 예외를 발생시킨다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 1;

  expect(() =>
    lottoManager.validateBonusNumberUnique(winningNumbers, bonusNumber)
  ).toThrow("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
});

test("사용자의 로또와 당첨 번호가 몇 개 동일한지 비교한다.", () => {
  const userLottos = [
    [1, 2, 3, 4, 5, 6],
    [1, 3, 4, 5, 6, 7],
    [1, 4, 5, 6, 7, 8],
    [1, 5, 6, 7, 8, 9],
    [1, 6, 7, 8, 9, 10],
    [1, 7, 8, 9, 10, 11],
  ];
  const winningNumber = [1, 2, 3, 4, 5, 6];
  const countResults = lottoManager.countMatchingNumbers(
    userLottos,
    winningNumber
  );

  expect(countResults.threeMatch).toBe(1);
  expect(countResults.fourMatch).toBe(1);
  expect(countResults.fiveMatch).toBe(1);
  expect(countResults.sixMatch).toBe(1);
});
