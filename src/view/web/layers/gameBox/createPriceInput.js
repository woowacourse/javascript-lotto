import { LOTTO_RULE } from "../../../../constants/lotto.js";

const createPriceInput = () => {
  return `<input
      type="number"
      id="price"
      placeholder="금액"
      onfocus="this.placeholder = ''"
      onblur="this.placeholder = '금액'"
      min="${LOTTO_RULE.MIN_PRICE}"
      max="${LOTTO_RULE.MAX_PRICE}"
      autocomplete="off"
    />`;
};

export default createPriceInput;
