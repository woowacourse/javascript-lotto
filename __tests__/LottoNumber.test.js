import LottoNumber from "../src/Domain/LottoNumber";

describe("단일 로또에 대한 테스트", () => {
  test.each([
    [0, [0, 1, 2, 3, 4, 5]],
    [46, [1, 2, 3, 4, 5, 46]],
  ])(
    "1 이상 45 이하의 숫자가 아닌 경우 %i 예외 처리 한다.",
    (_, invalidLottoNumbers) => {
      expect(() => new LottoNumber(invalidLottoNumbers)).toThrow("❌");
    }
  );

  test("로또 번호 내에서 중복 되는 숫자가 있을시에 예외 처리 된다.", () => {
    const numbers = [1, 1, 2, 3, 4, 5];

    expect(() => new LottoNumber(numbers)).toThrow("❌");
  });

  test("로또 번호가 6개를 넘어갈시에 예외 처리 된다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];

    expect(() => new LottoNumber(numbers)).toThrow("❌");
  });
});
