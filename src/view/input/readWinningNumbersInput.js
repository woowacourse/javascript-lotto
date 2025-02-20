import { readLineAsync } from "../../utils/input.js";
import { PROMPT_MESSAGE, LINE_BREAK } from "../../constants/message.js";

const readWinningNumbersInput = async () => {
  const userInput = await readLineAsync(
    `${LINE_BREAK}${PROMPT_MESSAGE.WINNING_NUMBER_INPUT}${LINE_BREAK}`
  );
  return userInput.split(",").map(Number);
};

export default readWinningNumbersInput;
