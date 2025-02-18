import { calculatePrizeResult } from "./lotto/calculatePrizeResult.js";
import { generateLottoNumberSets } from "./lotto/generateLottoNumberSets.js";
import { retryUntilValidInput } from "./utils/input.js";
import {
  validationLottoPrice,
  validationWinningNumbers,
  validationBonusNumber,
} from "./validation/index.js";
import {
  readLottoPriceInput,
  readWinningNumbersInput,
  readBonusNumberInput,
} from "./View/input.js";
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

  const bonusNumber = await retryUntilValidInput({
    readUserInput: readBonusNumberInput,
    validator: (bonusNumber) =>
      validationBonusNumber(bonusNumber, winningNumbers),
  });

  const result = calculatePrizeResult(
    lottoNumbers,
    winningNumbers,
    bonusNumber
  );
};

app();
