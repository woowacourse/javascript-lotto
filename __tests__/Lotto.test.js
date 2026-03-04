import Lotto from "../src/Lotto";

describe("Lotto 클래스 유닛 테스트", () => {
  describe("getNumbers", () => {
    test("로또 객체의 숫자를 반환한다.", () => {
      // given
      const numbers = [1, 2, 3, 4, 5, 6];

      // when
      const lotto = new Lotto(numbers);

      // then
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
