import { generateLottoNumberSets } from "./lotto/store.js";
import { retryUntilValidInput } from "./utils/input.js";
import { validationLottoPrice } from "./validation/index.js";
import { readLottoPriceInput } from "./View/input.js";
import { printLottoNumbers } from "./View/output.js";

const app = async () => {
  const lottoPrice = await retryUntilValidInput({
    readUserInput: readLottoPriceInput,
    validator: validationLottoPrice,
  });

  const lottoNumbers = generateLottoNumberSets(lottoPrice);
  printLottoNumbers(lottoNumbers);
};

app();
