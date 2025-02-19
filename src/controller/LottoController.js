import Input from "../view/Input.js";
import { MESSAGES } from "../constants/index.js";
import { purchaseAmountValidator } from "../validators/index.js";
import { retryUntilValid } from "../utils/retryUntilValid.js";

class LottoController {
  constructor() {
    this.lottoTickets = [];
  }

  async play() {
    const purchaseAmount = await retryUntilValid(
      () => Input.getInput(MESSAGES.input.purchaseAmount),
      (input) => parseInt(input, 10),
      purchaseAmountValidator
    );

    return purchaseAmount;
  }
}

export default LottoController;
