import LottoCenter from "../src/LottoCenter.js";

test.each([
  [[[1, 2, 3, 4, 5, 6]], 1, "1등"],
  [[[1, 2, 3, 4, 5, 9]], 1, "2등"],
  [[[1, 2, 3, 4, 5, 10]], 1, "3등"],
  [[[1, 2, 3, 4, 7, 10]], 1, "4등"],
  [[[1, 2, 3, 8, 7, 10]], 1, "5등"],
])("일치하는 개수에 맞는 등수의 값이 증가한다.", (lottos, expected, key) => {
  const winningCounts = LottoCenter.getWinningCounts(lottos, {
    winning: [1, 2, 3, 4, 5, 6],
    bonus: 9,
  });

  expect(winningCounts[key]).toBe(expected);
});

test("꽝이면 증가하지 않는다.", () => {
  const lottos = [
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
  ];
  const winningInfo = {
    winning: [1, 2, 3, 4, 5, 6],
    bonus: 9,
  };
  const winningCounts = LottoCenter.getWinningCounts(lottos, winningInfo);
  const expected = [0, 0, 0, 0, 0];

  expect(Object.values(winningCounts)).toEqual(expected);
});
