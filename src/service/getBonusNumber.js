import { Validator } from "../validator/Validator.js";
import { InputView } from "../view/input.js";

export async function getBonusNumber(winningNumber) {
  try {
    const bonusNumber = await InputView.inputBonusNumber();
    Validator.validateBonusNumber(winningNumber, bonusNumber);
    return bonusNumber;
  } catch (error) {
    console.log(error.message);
    return getBonusNumber(winningNumber);
  }
}
