import { countMatches, hasBonusMatch, calculateRank } from "./LottoMatcher.js";

describe("LottoMatcher 테스트", () => {
  const winningNumber = {
    winning: [1, 2, 3, 4, 5, 6],
    bonus: 7
  }

  test("로또 번호와 당첨 번호가 몇 개 일치하는지 정확한 개수를 계산한다.", () => {
    const numbers = [1, 2, 3, 10, 20, 30];

    expect(countMatches(numbers, winningNumber.winning)).toBe(3);
  });

  test("보너스 번호가 일치하는지 확인한다.", () => {
    const numbersWithBonusMatch = [1, 2, 3, 4, 5, 7];

    expect(hasBonusMatch(numbersWithBonusMatch, winningNumber.bonus)).toBe(true);

    const numbersWithoutBonusMatch = [1, 2, 3, 4, 5, 8];

    expect(hasBonusMatch(numbersWithoutBonusMatch, winningNumber.bonus)).toBe(false);
  });

  test("5개 일치 + 보너스 번호 시 2등이어야 한다.", () => {
    const number = [1, 2, 3, 4, 5, 7];

    expect(calculateRank(number, winningNumber)).toBe("second");
  });

  test("2개 이하로 일치하면 당첨되지 않는다.", () => {
    const number = [1, 2, 10, 11, 12, 13];

    expect(calculateRank(number, winningNumber)).toBe("none");
  });
});
