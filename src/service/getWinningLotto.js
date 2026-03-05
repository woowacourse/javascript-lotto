import { Validator } from "../validator/Validator.js";
import { InputView } from "../view/input.js";

export async function getWinningLotto() {
  try {
    const winningNumber = await InputView.inputWinningNumber();
    Validator.validateWinningNumber(winningNumber);
    return winningNumber;
  } catch (error) {
    console.log(error.message);
    return getWinningLotto();
  }
}
