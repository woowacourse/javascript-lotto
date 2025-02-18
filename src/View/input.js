import { PROMPT_MESSAGE } from "../constants/message.js";
import { readLineAsync } from "../utils/input.js";
import { LINE_BREAK } from "../constants/message.js";

export const readLottoPriceInput = async () => {
  const userInput = await readLineAsync(
    `${PROMPT_MESSAGE.PURCHASE_PRICE}${LINE_BREAK}`
  );
  return Number(userInput);
};

export const readWinningNumbersInput = async () => {
  const userInput = await readLineAsync(
    `${LINE_BREAK}${PROMPT_MESSAGE.WINNING_NUMBER_INPUT}${LINE_BREAK}`
  );
  return userInput.split(",").map(Number);
};

export const readBonusNumberInput = async () => {
  const userInput = await readLineAsync(
    `${PROMPT_MESSAGE.BONUS_NUMBER_INPUT}${LINE_BREAK}`
  );
  return Number(userInput);
};
