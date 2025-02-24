import {
  calculatePrizeResult,
  generateLottoNumberSets,
  getTotalPrizeMoney,
} from "./lotto/index.js";
import { retryUntilValidInput } from "./utils/input.js";
import { getRevenueRate } from "./utils/math.js";
import {
  validateBonusNumber,
  validateLottoPrice,
  validateRestartInput,
  validateWinningNumbers,
} from "./validation/index.js";
import {
  readLottoPriceInput,
  readWinningNumbersInput,
  readBonusNumberInput,
  readRestartInput,
} from "./view/console/input/index.js";
import {
  printLottoNumbers,
  printLottoResult,
} from "./view/console/output/index.js";
import { LOTTO_RESTART_COMMAND } from "./constants/lotto.js";

const app = async () => {
  while (true) {
    const lottoPrice = await retryUntilValidInput({
      readUserInput: readLottoPriceInput,
      validator: validateLottoPrice,
    });

    const lottoNumbers = generateLottoNumberSets(lottoPrice);
    printLottoNumbers(lottoNumbers);

    const winningNumbers = await retryUntilValidInput({
      readUserInput: readWinningNumbersInput,
      validator: validateWinningNumbers,
    });

    const bonusNumber = await retryUntilValidInput({
      readUserInput: readBonusNumberInput,
      validator: (bonusNumber) =>
        validateBonusNumber(bonusNumber, winningNumbers),
    });

    const result = calculatePrizeResult(
      lottoNumbers,
      winningNumbers,
      bonusNumber,
    );

    const totalPrizeMoney = getTotalPrizeMoney(result);
    const revenueRate = getRevenueRate(totalPrizeMoney, lottoPrice);
    printLottoResult(result, revenueRate);

    const restartInput = await retryUntilValidInput({
      readUserInput: readRestartInput,
      validator: validateRestartInput,
    });

    if (restartInput === LOTTO_RESTART_COMMAND.end) {
      break;
    }
  }
};

app();
