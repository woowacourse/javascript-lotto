import { LOTTO_RULE } from "../../../../constants/lotto.js";

const createNumbersInput = () => {
  return Array.from({ length: LOTTO_RULE.LOTTO_LENGTH })
    .map(() => {
      return `<input
        type="number"
        class="winning-numbers"
        min="${LOTTO_RULE.MIN_LOTTO_NUMBER}"
        max="${LOTTO_RULE.MAX_LOTTO_NUMBER}"
        autocomplete="off"
      />`;
    })
    .join("");
};

export default createNumbersInput;
