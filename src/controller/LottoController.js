import Input from "../view/Input.js";
import { MESSAGES } from "../constants/index.js";
import {
  purchaseAmountValidator,
  lottoNumberValidator,
} from "../validators/index.js";
import { retryUntilValid } from "../utils/retryUntilValid.js";
import LottoGenerator from "../domain/LottoGenerator.js";
import Output from "../view/Output.js";
class LottoController {
  constructor() {
    this.lottoTickets = [];
  }

  async play() {
    const purchaseAmount = await this.getPurchaseAmount();
    this.lottoTickets = LottoGenerator.generate(purchaseAmount);
    Output.printLottoTickets(this.lottoTickets);
    const lottoNumber = await this.getLottoNumber();
    Output.print(lottoNumber);
  }

  async getPurchaseAmount() {
    const purchaseAmount = await retryUntilValid(
      () => Input.getInput(MESSAGES.input.purchaseAmount),
      (input) => parseInt(input, 10),
      purchaseAmountValidator
    );
    return purchaseAmount;
  }

  async getLottoNumber() {
    const lottoNumber = await retryUntilValid(
      () => Input.getInput(MESSAGES.input.lottoNumber),
      (input) => input.split(",").map(Number),
      lottoNumberValidator
    );
    return lottoNumber;
  }
}

export default LottoController;
