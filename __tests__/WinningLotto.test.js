import Lotto from "../src/step1/domains/Lotto";
import WinningLotto from "../src/step1/domains/WinningLotto";

describe("당첨 로또 도메인 테스트", () => {
  const TEST_CASES = ["", "harry", 0, 46, 1];

  test.each(TEST_CASES)(
    "유효하지 않은 보너스 번호를 설정할 경우 예외를 발생시킨다.",
    (bonusNumber) => {
      const NUMBERS = [1, 2, 3, 4, 5, 6];

      expect(() => {
        new WinningLotto(new Lotto(NUMBERS), bonusNumber);
      }).toThrow("[ERROR]");
    }
  );
});
