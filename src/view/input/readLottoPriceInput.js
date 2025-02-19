import { readLineAsync } from "../../utils/input.js";
import { PROMPT_MESSAGE, LINE_BREAK } from "../../constants/message.js";

const readLottoPriceInput = async () => {
  const userInput = await readLineAsync(
    `${PROMPT_MESSAGE.PURCHASE_PRICE}${LINE_BREAK}`
  );
  return Number(userInput);
};

export default readLottoPriceInput;
