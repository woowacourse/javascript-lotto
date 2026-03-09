import LottoMachine from "../src/Domain/LottoMachine.js";
import Lotto from "../src/Domain/Lotto.js";
import LuckyNumbers from "../src/Domain/LuckyNumbers.js";

describe("Validation 테스트", () => {
  test.each([
    { input: "abcde", message: "숫자 아님" },
    { input: "999", message: "1000원 이상 체크" },
    { input: "", message: "빈 문자열" },
  ])("구입 금액 예외 테스트: ", ({ input }) => {
    const random = () => [1, 2, 3, 4, 5, 6]
    return expect(() => LottoMachine.issueLottos(input, random)).toThrow(
      /^\[ERROR\]/,
    );
  });

  test.each([
    { input: "1,2,3,4,5,6", expected: [1, 2, 3, 4, 5, 6] },
  ])("당첨 번호 정상 테스트: $input", ({ input, expected }) => {
    const numbers = input.split(",");
    const lotto = new Lotto(numbers);
    return expect(lotto.getNumbers()).toEqual(expected);
  });

  test.each([
    { input: "1,2,3,4,5", message: "당첨 번호 개수 부족" },
    { input: "0,1,2,3,4,5", message: "당첨 번호 하한 범위 이탈" },
    { input: "1,2,3,4,5,46", message: "당첨 번호 상한 범위 이탈" },
    { input: "a,b,c,d,e,f", message: "당첨 번호 숫자 아님" },
  ])('당첨 번호 예외 테스트: "$input", $message', ({ input }) => {
    const numbers = input.split(",");
    return expect(() => new Lotto(numbers)).toThrow(
      /^\[ERROR\]/,
    );
  });

  test.each([
    { input: 'a', winningNumbers: [1, 2, 3, 4, 5, 6], message: '보너스 번호 숫자 아님' },
    { input: '0', winningNumbers: [1, 2, 3, 4, 5, 6], message: '보너스 번호 하한 이탈' },
    { input: '46', winningNumbers: [1, 2, 3, 4, 5, 6], message: '보너스 번호 상한 이탈' },
    { input: '1', winningNumbers: [1, 2, 3, 4, 5, 6], message: '당첨 번호와 중복' },
  ])('보너스 번호 예외 테스트: "$input", $message', ({ input, winningNumbers }) => {
    return expect(() => new LuckyNumbers(winningNumbers, input)).toThrow(
      /^\[ERROR\]/,
    );
  });
}); 
