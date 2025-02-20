import { BONUS_NUMBER_ERROR_MESSAGES, LOTTO_CONDITION } from "../../src/constants/constants.js";
import validateBonusNumber from "../../src/validations/validate/bonusNumberValidate.js";

const winningNumbers = [1,2,3,4,5,6]
test.each([1.5, ''])('정수가 아닌 경우 에러 발생', (input) => {
    expect(() => validateBonusNumber(winningNumbers, input)).toThrow(BONUS_NUMBER_ERROR_MESSAGES.INTIGER);
  });
  
  test.each([LOTTO_CONDITION.MIN_NUMBER-1, LOTTO_CONDITION.MAX_NUMBER+1])(`${LOTTO_CONDITION.MIN_NUMBER}~${LOTTO_CONDITION.MAX_NUMBER}사이의 숫자가 아닌 경우 에러 발생`, (input) => {
    expect(() => validateBonusNumber(winningNumbers, input)).toThrow(BONUS_NUMBER_ERROR_MESSAGES.RANGE);
  });
  
  test.each([1,2])(`당첨 번호와 중복된 경우 에러 발생`, (input) => {
    expect(() => validateBonusNumber(winningNumbers, input)).toThrow(BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE);
  });
  