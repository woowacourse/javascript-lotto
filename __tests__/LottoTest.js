import Lotto from "../src/model/Lotto.js";

describe("Lotto 클래스 도메인 테스트", () => {
  test("로또 번호에 소수가 포함되면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6.5]);
    }).toThrow("[ERROR]"); 
  });

  test("로또 번호에 숫자가 아닌 값이 포함되면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, "j"]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 NaN이 포함되면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, NaN]);
    }).toThrow("[ERROR]");
  });
});