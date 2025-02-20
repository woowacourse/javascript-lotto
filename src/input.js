import readLineAsync from "./readLineAsync.js";
import {
  validateIsNumeric,
  validateMaximumValue,
  validateMinimumValue,
  validatePurchaseUnit,
} from "./validate.js";

export const inputPrice = async () => {
  try {
    const price = Number(await readLineAsync("구입금액을 입력해 주세요."));
    validateIsNumeric(price);
    validateMinimumValue(price);
    validatePurchaseUnit(price);
    validateMaximumValue(price);
    return price;
  } catch (error) {
    console.log(error.message);
    return await inputPrice();
  }
};
