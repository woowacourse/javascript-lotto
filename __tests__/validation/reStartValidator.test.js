import validateReStart from "../../src/validations/validate/reStartValidate.js";
import { Y_OR_NO_ERROR_MESSAGE } from "../../src/constants/constants.js";
import {YES} from "../../src/constants/constants.js";
import { NO } from "../../src/constants/constants.js";

test.each([1.5, "hi"])(`${YES}나 ${NO}가 아닐 시 에러 발생`, (input) => {
    expect(() => validateReStart(input)).toThrow(Y_OR_NO_ERROR_MESSAGE);
  });
  