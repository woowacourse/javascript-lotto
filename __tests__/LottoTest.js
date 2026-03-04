import Lotto from "../src/Lotto.js";
import WinningLotto from "../src/WinningLotto.js";

describe("구매한 로또 번호와 당첨 로또 번호 비교 테스트", () => {
  test.each([
    {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonus: 7,
      expected: 1,
      desc: "6개 일치 → 1등",
    },
    {
      lottoNumbers: [1, 2, 3, 4, 5, 7],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonus: 7,
      expected: 2,
      desc: "5개 + 보너스 일치 → 2등",
    },
    {
      lottoNumbers: [1, 2, 3, 4, 5, 7],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonus: 9,
      expected: 3,
      desc: "5개 일치, 보너스 불일치 → 3등",
    },
    {
      lottoNumbers: [1, 2, 3, 4, 7, 8],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonus: 7,
      expected: 4,
      desc: "4개 일치 → 4등",
    },
    {
      lottoNumbers: [1, 2, 3, 7, 8, 9],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonus: 7,
      expected: 5,
      desc: "3개 일치 → 5등",
    },
    {
      lottoNumbers: [1, 2, 7, 8, 9, 10],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonus: 7,
      expected: null,
      desc: "2개 일치 → 낙첨",
    },
    {
      lottoNumbers: [1, 7, 8, 9, 10, 11],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonus: 7,
      expected: null,
      desc: "1개 일치 → 낙첨",
    },
    {
      lottoNumbers: [7, 8, 9, 10, 11, 12],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonus: 7,
      expected: null,
      desc: "0개 일치 → 낙첨",
    },
  ])("$desc", ({ lottoNumbers, winningNumbers, bonus, expected }) => {
    const lotto = new Lotto(lottoNumbers);
    const winningLotto = new WinningLotto(winningNumbers, bonus);
    expect(winningLotto.getRank(lotto)).toBe(expected);
  });
});

describe("당첨 내역 반환 테스트", () => {
  const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

  test("각 등수가 포함된 경우", () => {
    const purchasedLottos = [
      new Lotto([1, 2, 3, 4, 5, 6]), // 1등
      new Lotto([1, 2, 3, 4, 5, 7]), // 2등
      new Lotto([1, 2, 3, 4, 5, 8]), // 3등
      new Lotto([1, 2, 3, 4, 7, 9]), // 4등
      new Lotto([1, 2, 3, 8, 9, 10]), // 5등
      new Lotto([1, 7, 8, 9, 10, 11]), // 낙첨
      new Lotto([1, 2, 3, 4, 5, 6]), // 1등
    ];

    expect(getPrizeList(purchasedLottos, winningLotto)).toEqual([
      0, 2, 1, 1, 1, 1,
    ]);
  });

  test("전부 낙첨인 경우", () => {
    const purchasedLottos = [
      new Lotto([7, 8, 9, 10, 11, 12]),
      new Lotto([7, 8, 9, 10, 11, 13]),
      new Lotto([7, 8, 9, 10, 11, 14]),
    ];

    expect(getPrizeList(purchasedLottos, winningLotto)).toEqual([
      0, 0, 0, 0, 0, 0,
    ]);
  });
});
