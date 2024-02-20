import Lotto from "../src/Domain/Lotto";

describe("단일 로또에 대한 테스트", () => {
  test.each([
    [0, [0, 1, 2, 3, 4, 5]],
    [46, [1, 2, 3, 4, 5, 46]],
  ])(
    "1 이상 45 이하의 숫자가 아닌 경우 %i 예외 처리 한다.",
    (_, invalidLottoNumbers) => {
      expect(() => new Lotto(invalidLottoNumbers)).toThrow("❌");
    }
  );
});
