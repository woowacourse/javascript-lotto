import WinLottoNumber from "../src/Domain/WinLottoNumber";

describe("WinLottoNumber 클래스에 대한 테스트 코드 작성", () => {
  test("보너스 번호를 입력받았을때, 당첨 번호와 겹치는 숫자 있을시에 예외처리한다.", () => {
    const winNumbers = [1, 2, 3, 4, 5, 6];
    const winLottoNumber = new WinLottoNumber(winNumbers);
    const invalidInput = 6;

    expect(() => winLottoNumber.validBonusNumber(invalidInput)).toThrow();
  });

  test.each([0, 46])(
    "입력 받은 보너스 번호가 1미만 45를 초과하는 %i 인 경우 예외 처리 한다.",
    (invalidInput) => {
      const winNumbers = [1, 2, 3, 4, 5, 6];
      const winLottoNumber = new WinLottoNumber(winNumbers);

      expect(() => winLottoNumber.validBonusNumber(invalidInput)).toThrow();
    }
  );
});
