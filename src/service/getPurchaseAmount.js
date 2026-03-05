import { InputView } from "../view/input.js";
import { Validator } from "../validator/Validator.js";

export async function getPurchaseAmount() {
  try {
    const money = await InputView.inputPurchaseAmount();
    Validator.validatePurchaseMoney(money);
    return money;
  } catch (error) {
    console.log(error.message);
    return getPurchaseAmount();
  }
}
