import { LOTTO_RULE } from "../../../../constants/lotto.js";
import { setNumberInput } from "../../../../utils/view/templates.js";

const createBonusNumberInput = () => {
  return setNumberInput(
    "bonus-number",
    LOTTO_RULE.MIN_LOTTO_NUMBER,
    LOTTO_RULE.MAX_LOTTO_NUMBER,
  );
};

export default createBonusNumberInput;
