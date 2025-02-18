import { PROMPT_MESSAGE } from "../constants/message.js";
import { readLineAsync } from "../utils/input.js";
import { LINE_BREAK } from "../constants/message.js";

export const readLottoPriceInput = async () => {
  const userInput = await readLineAsync(
    `${PROMPT_MESSAGE.PURCHASE_PRICE}${LINE_BREAK}`
  );
  return Number(userInput);
};
