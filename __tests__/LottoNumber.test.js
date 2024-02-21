import LottoNumber from "../src/domain/LottoNumber.js";

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
