import Lotto from "../src/domain/Lotto.js";
import LottoNumber from "../src/domain/LottoNumber.js";

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

describe("로또 번호 유효성 테스트", () => {
  const strValue = [" ", "a"];
  const floatValue = 0.4;
  const boundaryValue = [0, 46];

  test.each([strValue, floatValue, ...boundaryValue])(
    "입력된 각 로또 번호는 1이상 45이하의 정수가 아니면 오류를 발생시킨다.",
    (wrongValue) => {
      expect(() => new LottoNumber(wrongValue)).toThrow("[ERROR]");
    }
  );
});
