import getRank from "../src/getRank";

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
    expect(getRank(lottoNumbers, winningNumbers, bonus)).toBe(expected);
  });
});
