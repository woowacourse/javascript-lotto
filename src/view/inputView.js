import { rl } from "../util/console";
import { consoleErrorCatcher } from "../validator/errorCatcher";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateRestartOrQuitCommend,
  validateWinningLottoNumbers,
} from "../validator";
import { INPUT_MESSAGE } from "../constants";
import { splitAndTrimString } from "../util";
const { PURCHASE_AMOUNT, LOTTO_NUMBER, BONUS_NUMBER, RESTART_OR_QUIT } = INPUT_MESSAGE;

export const inputView = {
  readline(message) {
    return rl.question(message);
  },
};

export const readPurchaseAmount = async () => {
  const purchaseAmount = await inputView.readline(PURCHASE_AMOUNT);

  if (!consoleErrorCatcher(() => validatePurchaseAmount(purchaseAmount)))
    return readPurchaseAmount();

  return Number(purchaseAmount);
};

export const readWinningLottoNumbers = async () => {
  const inputs = await inputView.readline(LOTTO_NUMBER);
  const winningNumbers = splitAndTrimString(inputs).map(Number);

  if (!consoleErrorCatcher(() => validateWinningLottoNumbers(winningNumbers))) {
    return readWinningLottoNumbers();
  }

  return winningNumbers;
};

export const readBonusNumber = async (winningLottoNumbers) => {
  const bonusNum = await inputView.readline(BONUS_NUMBER);

  if (!consoleErrorCatcher(() => !validateBonusNumber(bonusNum, winningLottoNumbers))) {
    return readBonusNumber(winningLottoNumbers);
  }

  return Number(bonusNum);
};

export const readRestartOrQuitCommend = async () => {
  const commend = await inputView.readline(RESTART_OR_QUIT);

  if (!consoleErrorCatcher(() => !validateRestartOrQuitCommend(commend))) {
    return readRestartOrQuitCommend();
  }

  return commend.toLowerCase();
};
