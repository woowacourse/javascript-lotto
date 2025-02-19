import { BONUS_NUMBER_ERROR_MESSAGE } from "../src/constants/errorMessage";
import validateBonusNumber from "../src/validation/validateBonusNumber";

describe("보너스 번호 유효성 검사", () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  test("빈 값을 입력할 경우 에러 발생", () => {
    expect(() => validateBonusNumber("", lottoNumbers)).toThrow(BONUS_NUMBER_ERROR_MESSAGE.EMPTY);
  });
  test("숫자가 아닌 경우 에러 발생", () => {
    //given
    const inputBonusNumber = "a";
    expect(() => validateBonusNumber(inputBonusNumber, lottoNumbers)).toThrow(BONUS_NUMBER_ERROR_MESSAGE.NUMBER);
  });
  test("1~45 사이 숫자가 아닌 경우 에러 발생", () => {
    //given
    const inputBonusNumber = "50";
    expect(() => validateBonusNumber(inputBonusNumber, lottoNumbers)).toThrow(BONUS_NUMBER_ERROR_MESSAGE.RANGE);
  });
  test("보너스 번호가 로또 번호와 중복되는 경우 에러 발생", () => {
    const bonusNumberInput = "3";
    expect(() => validateBonusNumber(bonusNumberInput, lottoNumbers)).toThrow(BONUS_NUMBER_ERROR_MESSAGE.DUPLICATE);
  });
});
