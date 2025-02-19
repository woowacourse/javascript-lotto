import LottoManager from "../src/LottoManager";

let lottoManager;
beforeEach(() => {
  const userLottos = [
    [1, 2, 3, 4, 5, 6],
    [1, 3, 4, 5, 6, 10],
    [1, 3, 4, 5, 6, 7],
    [1, 4, 5, 6, 7, 8],
    [1, 5, 6, 7, 8, 9],
    [1, 6, 7, 8, 9, 10],
    [1, 7, 8, 9, 10, 11],
  ];
  const winningNumber = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  lottoManager = new LottoManager(userLottos, winningNumber, bonusNumber);
});

test("당첨 번호와 보너스 번호가 중복되는 경우 예외를 발생시킨다.", () => {
  const userLottos = [];
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 1;

  lottoManager = new LottoManager(userLottos, winningNumbers, bonusNumber);

  expect(() => lottoManager.validateBonusNumberUnique()).toThrow(
    "보너스 번호는 당첨 번호와 중복되면 안됩니다."
  );
});

test("사용자의 로또와 당첨 번호가 몇 개 동일한지 비교한다.", () => {
  const countResults = lottoManager.countMatchingNumbers();

  expect(countResults).toEqual([6, 5, 5, 4, 3]);
});

test("사용자의 로또에 보너스 번호가 존재하는지 확인한다.", () => {
  const countResults = lottoManager.countMatchingNumbers();

  expect(lottoManager.containsBonusNumbers(countResults)).toEqual([
    false,
    true,
  ]);
});

test("당첨 내역을 계산한다.", () => {
  const countResults = lottoManager.countMatchingNumbers();
  const isContainBonusNumbers = lottoManager.containsBonusNumbers(countResults);
  lottoManager.calculateWinnings(countResults, isContainBonusNumbers);

  expect(lottoManager.prizeResult).toEqual({
    firstPrize: 1,
    secondPrize: 1,
    thirdPrize: 1,
    fourthPrize: 1,
    fifthPrize: 1,
  });
});

test("로또 수익률을 게산한다", () => {
  const price = 7000;
  expect(lottoManager.calculateROI(price)).toBe("29022114.29");
});
