import { ErrorMessage } from "../src/constants/Constants.js";
import Validation from "../src/utils/Validation.js";

describe("Validation 테스트", () => {
  describe("구입 금액 입력값 예외 테스트", () => {
    test("값이 0 이하인 경우 예외 발생", () => {
      const PURCHASE_AMOUNT = [0, -1000, -2000, -1561];

      PURCHASE_AMOUNT.forEach((amount) => {
        expect(() => Validation.checkPurchaseAmount(amount)).toThrow(
          ErrorMessage.MINMUM_VALUE
        );
      });
    });
  });

  test("값이 천원 단위가 아닌 경우 예외 발생", () => {
    const PURCHASE_AMOUNT = [100, 2200, 3330, 4444];

    PURCHASE_AMOUNT.forEach((amount) => {
      expect(() => Validation.checkPurchaseAmount(amount)).toThrow(
        ErrorMessage.MONEY_VALUE
      );
    });
  });

  test('값이 숫자가 아닌 문자를 포함하는 경우 예외 발생', () => {
    const PURCHASE_AMOUNT = ['A1', '2B', ' ', '', 'ABC', '1 2 3'];

    PURCHASE_AMOUNT.forEach((amount) => {
      expect(() => Validation.checkMoneyInputType(amount)).toThrow(
        ErrorMessage.MONEY_INPUT_TYPE
      )
    })
  });

  describe('당첨 번호 입력값 예외 테스트', () => { 
    test('숫자가 아닌 문자를 입력한 경우 예외 발생', () => {
      const INPUTS = ['1,2,3,4,1A,5', '5,6,7,A1,8,9', '1,,2,4,5,6', '1, ,2,3,4,5'];

      INPUTS.forEach((input) => {
        const NUMBERS = input.split(',').map(Number);

        expect(() => Validation.checkLottoNumber(NUMBERS)).toThrow(ErrorMessage.LOTTO_VALUE);
      })
    });
   })
});
