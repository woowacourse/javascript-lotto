import { calculatePrizeResult } from "./lotto/calculatePrizeResult.js";
import { generateLottoNumberSets } from "./lotto/generateLottoNumberSets.js";
import { getTotalPrizeMoney } from "./lotto/getTotalPrizeMoney.js";
import { retryUntilValidInput } from "./utils/input.js";
import {
  validationLottoPrice,
  validationWinningNumbers,
  validationBonusNumber,
  validationRestartInput,
} from "./validation/index.js";
import {
  readLottoPriceInput,
  readWinningNumbersInput,
  readBonusNumberInput,
  readRestartInput,
} from "./View/input.js";
import { printLottoNumbers, printLottoResult } from "./View/output.js";

const app = async () => {
  while (true) {
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
    const totalPrizeMoney = getTotalPrizeMoney(result);
    const revenueRate = (totalPrizeMoney / lottoPrice) * 100;
    printLottoResult(result, revenueRate);

    const restartInput = await retryUntilValidInput({
      readUserInput: readRestartInput,
      validator: validationRestartInput,
    });

    if (restartInput === "N") {
      break;
    }
  }
};

app();
