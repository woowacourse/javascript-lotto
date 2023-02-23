import Lotto from "../src/domain/Lotto";

describe("복권이 당첨번호, 보너스번호와 일치하는지 테스트", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  test("복권과 당첨번호(유저입력)이 일치하는 개수가 3개인 경우 9 반환", () => {
    expect(lotto.matchNumbers([1, 2, 3, 7, 8, 9])).toEqual(9);
  });

  test("복권과 당첨번호(유저입력)이 일치하는 개수가 없는 경우 12 반환", () => {
    expect(lotto.matchNumbers([7, 8, 9, 10, 11, 12])).toEqual(12);
  });

  test("복권과 당첨번호(유저입력)이 일치하는 개수가 6개인 경우 6 반환", () => {
    expect(lotto.matchNumbers([1, 2, 3, 4, 5, 6])).toEqual(6);
  });

  test("보너스번호가 복권에 있으면 true", () => {
    expect(lotto.matchBonus(1)).toBeTruthy();
  });

  test("보너스번호가 복권에 없으면 false", () => {
    expect(lotto.matchBonus(7)).toBeFalsy();
  });
});
