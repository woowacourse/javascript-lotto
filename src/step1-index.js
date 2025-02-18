import generateLottoNumber from "./lotto/generateLottoNumber.js";
import { retryUntilValidInput } from "./utils/input.js";
import { validationLottoPrice } from "./validation/index.js";
import { readLottoPriceInput } from "./View/input.js";

const app = async () => {
  const result = await retryUntilValidInput({
    readUserInput: readLottoPriceInput,
    validator: validationLottoPrice,
  });
  const lottoNumbers = generateLottoNumber();
};

app();
