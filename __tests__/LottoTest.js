import Lotto from "../src/model/Lotto.js";

describe("당첨 번호 비교 test", () => {
  test("일치 개수가 3개일 때", () => {
    expect(
      new Lotto([1, 2, 3, 4, 5, 6]).calculateMatchCount([1, 2, 3, 7, 8, 9])
    ).toBe(3);
  });
  test("일치 개수가 4개일 때", () => {
    expect(
      new Lotto([1, 2, 3, 4, 5, 6]).calculateMatchCount([1, 2, 3, 4, 8, 9])
    ).toBe(4);
  });
  test("일치 개수가 5개일 때", () => {
    expect(
      new Lotto([1, 2, 3, 4, 5, 6]).calculateMatchCount([1, 2, 3, 4, 5, 9])
    ).toBe(5);
  });
  test("일치 개수가 6개일 때", () => {
    expect(
      new Lotto([1, 2, 3, 4, 5, 6]).calculateMatchCount([1, 2, 3, 4, 5, 6])
    ).toBe(6);
  });
});

describe("당첨 번호 및 보너스 번호 비교 test", () => {
  test("5개 일치 및 보너스 볼 일치", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    const winningNumbers = [1, 2, 3, 4, 5, 45];
    const bonusNumber = 6;

    expect(lotto.calculateMatchCount(winningNumbers)).toBe(5);
    expect(lotto.hasBonusNumber(bonusNumber)).toBe(true);
  });

  test("5개 일치하지만, 보너스 볼은 불일치", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningNumbers = [1, 2, 3, 4, 5, 45];
    const bonusNumber = 44;

    expect(lotto.calculateMatchCount(winningNumbers)).toBe(5);
    expect(lotto.hasBonusNumber(bonusNumber)).toBe(false);
  });
});

describe("로또 유효성 검증 test", () => {
  test("로또 번호 개수가 6개가 아닌 경우", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 6, 7])).toThrow("[ERROR]");
  });

  test("중복된 번호가 포함된 경우", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow("[ERROR]");
  });

  test("로또 번호가 1~45 범위를 벗어난 경우", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 46])).toThrow("[ERROR]");
  });
});
