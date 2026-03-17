import Lotto from "../src/domain/Lotto.js";
import { formatLottoNumbers } from "../src/utils/formatter.js";

describe("formatLottoNumbers 테스트", () => {
  test("Lotto 인스턴스의 번호를 포맷에 맞춰 변환", () => {
    const lotto = new Lotto([1, 8, 23, 31, 42, 45]);
    const result = formatLottoNumbers(lotto);
    expect(result).toBe("1, 8, 23, 31, 42, 45");
  });

  test("Lotto 객체가 아닌 null이나 undefined가 전달되면 에러가 발생", () => {
    expect(() => formatLottoNumbers(null)).toThrow();
    expect(() => formatLottoNumbers(undefined)).toThrow();
  });
});
