import { readLineAsync } from "../../utils/input.js";
import { PROMPT_MESSAGE, LINE_BREAK } from "../../constants/message.js";

const readRestartInput = async () => {
  const userInput = await readLineAsync(
    `${LINE_BREAK}${PROMPT_MESSAGE.RESTART_INPUT}${LINE_BREAK}`
  );
  return userInput.toLowerCase();
};

export default readRestartInput;
