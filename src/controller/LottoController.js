import { MESSAGES } from "../constants/index.js";
import Input from "../view/Input.js";

class LottoController {
  constructor() {
    this.lottoTickets = [];
  }

  async play() {
    const price = await Input.getInput(MESSAGES.input.purchaseAmount);

    const parsePrice = parseInt(price, 10);

    return parsePrice;
  }
}

export default LottoController;
