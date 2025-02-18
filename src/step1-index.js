import { retryUntilValidInput } from "./utils/input.js";
import { readLottoPriceInput } from "./View/input.js";
import { validationLottoPrice } from "./validation/index.js";

const app = async () => {
  const result = await retryUntilValidInput({
    readUserInput: readLottoPriceInput,
    validator: validationLottoPrice,
  });
  console.log(result);
};

app();
