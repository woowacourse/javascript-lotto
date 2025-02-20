import { validateYorN } from "../src/validations/validate/ReStartValidate.js";
import { Y_OR_NO_ERROR_MESSAGE } from "../src/constants/constants.js";

test.each([1.5, "hi"])('y나 n가 아닐 시 에러 발생', (input) => {
    expect(() => validateYorN(input)).toThrow(Y_OR_NO_ERROR_MESSAGE);
  });
  