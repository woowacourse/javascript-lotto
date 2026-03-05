import { Validator } from "../validator/Validator.js";
import { InputView } from "../view/input.js";

export async function getRetry() {
  try {
    const retry = await InputView.inputRetry();
    Validator.validateRetry(retry);
    return retry;
  } catch (error) {
    console.log(error.message);
    return getRetry();
  }
}
