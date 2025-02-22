import LottoComparer from "../src/domain/LottoComparer.js";

test("사용자의 로또와 당첨 번호가 몇 개 동일한지 비교한다.", () => {
  const generatedLottos = [
    [1, 2, 3, 4, 5, 6],
    [1, 3, 4, 5, 6, 10],
    [1, 3, 4, 5, 6, 7],
    [1, 4, 5, 6, 7, 8],
    [1, 5, 6, 7, 8, 9],
    [1, 6, 7, 8, 9, 10],
    [1, 7, 8, 9, 10, 11],
  ];
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  const lottoComparer = new LottoComparer(winningNumbers, bonusNumber);
  const compareResult = lottoComparer.lottoCompareResult(generatedLottos);

  expect(compareResult).toEqual([
    { matchCount: 6, hasBonus: false },
    { matchCount: 5, hasBonus: false },
    { matchCount: 5, hasBonus: true },
    { matchCount: 4, hasBonus: false },
    { matchCount: 3, hasBonus: false },
  ]);
});
