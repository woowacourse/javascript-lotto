import Input from "../view/Input.js";
import { MESSAGES } from "../constants/index.js";
import { purchaseAmountValidator } from "../validators/index.js";
import { retryUntilValid } from "../utils/retryUntilValid.js";

class LottoController {
  constructor() {
    this.lottoTickets = [];
  }

  async play() {
    const parsePrice = await retryUntilValid(
      () => Input.getInput(MESSAGES.input.purchaseAmount),
      purchaseAmountValidator
    );

    return parsePrice;
  }
}

export default LottoController;
