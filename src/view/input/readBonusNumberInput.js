import { readLineAsync } from "../../utils/input.js";
import { PROMPT_MESSAGE, LINE_BREAK } from "../../constants/message.js";

const readBonusNumberInput = async () => {
  const userInput = await readLineAsync(
    `${PROMPT_MESSAGE.BONUS_NUMBER_INPUT}${LINE_BREAK}`
  );
  return Number(userInput);
};

export default readBonusNumberInput;
