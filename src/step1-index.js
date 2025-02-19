import {
  calculatePrizeResult,
  generateLottoNumberSets,
  getTotalPrizeMoney,
} from "./lotto/index.js";
import { retryUntilValidInput } from "./utils/input.js";
import { getRevenueRate } from "./utils/math.js";
import {
  validationBonusNumber,
  validationLottoPrice,
  validationRestartInput,
  validationWinningNumbers,
} from "./validation/index.js";
import {
  readLottoPriceInput,
  readWinningNumbersInput,
  readBonusNumberInput,
  readRestartInput,
} from "./view/input/index.js";
import { printLottoNumbers, printLottoResult } from "./view/output/index.js";
import { LOTTO_RESTART_COMMAND } from "./constants/lotto.js";

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
    const revenueRate = getRevenueRate(totalPrizeMoney, lottoPrice);
    printLottoResult(result, revenueRate);

    const restartInput = await retryUntilValidInput({
      readUserInput: readRestartInput,
      validator: validationRestartInput,
    });

    if (restartInput === LOTTO_RESTART_COMMAND.end) {
      break;
    }
  }
};

app();
