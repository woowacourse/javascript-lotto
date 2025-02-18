import { generateLottoNumberSets } from "./lotto/store.js";
import { retryUntilValidInput } from "./utils/input.js";
import {
  validationLottoPrice,
  validationWinningNumbers,
} from "./validation/index.js";
import { readLottoPriceInput, readWinningNumbersInput } from "./View/input.js";
import { printLottoNumbers } from "./View/output.js";

const app = async () => {
  const lottoPrice = await retryUntilValidInput({
    readUserInput: readLottoPriceInput,
    validator: validationLottoPrice,
  });

  const lottoNumbers = generateLottoNumberSets(lottoPrice);
  printLottoNumbers(lottoNumbers);

  const winningNumbers = await retryUntilValidInput({
    readUserInput: readWinningNumbersInput,
    validator: validationWinningNumbers,
  });
};

app();
