import { LOTTO_RULE } from "../../../../constants/lotto.js";
import { setNumberInput } from "../../../../utils/view/templates.js";

const createNumbersInput = () => {
  return Array.from({ length: LOTTO_RULE.LOTTO_LENGTH })
    .map(() => {
      return setNumberInput(
        "winning-numbers",
        LOTTO_RULE.MIN_LOTTO_NUMBER,
        LOTTO_RULE.MAX_LOTTO_NUMBER,
      );
    })
    .join("");
};

export default createNumbersInput;
