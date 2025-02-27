import { LOTTO_RULE } from "../../../../constants/lotto.js";

const createNumbersInput = () => {
  return Array.from({ length: LOTTO_RULE.LOTTO_LENGTH })
    .map(() => {
      return `<input type="text" className="winning-numbers" />`;
    })
    .join("");
};

export default createNumbersInput;
