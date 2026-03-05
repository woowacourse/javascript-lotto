import Lotto from "../src/Lotto";

describe("로또 발행 테스트", () => {
  test("로또를 생성한다.", () => {
    // given
    const lotto = new Lotto([6, 5, 4, 3, 2, 1]);

    // when & then
    expect(lotto).toBeInstanceOf(Lotto);
  });

  test("0이 입력된 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [0, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow("[ERROR]");
  });

  test("음의 정수가 입력된 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [-1, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow("[ERROR]");
  });
});
