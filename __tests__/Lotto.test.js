import Lotto from "../src/domain/Lotto.js";

describe("로또 기능 테스트", () => {
  test("숫자 6개를 가진 로또를 생성한다.", () => {
    const lotto = new Lotto();
    expect(lotto.getNumbers()).toHaveLength(6);
  });

  test("쉼표로 구분된 로또 번호 문자열이 들어오면 숫자 배열로 바꿔서 저장한다.", () => {
    const numbersStr = "1,9,12,15,28,45";
    const lotto = new Lotto(numbersStr);
    const expectNumbers = [1, 9, 12, 15, 28, 45];

    expect(lotto.getNumbers()).toEqual(expectNumbers);
  });
});
