import Input from "../view/Input.js";
import { MESSAGES } from "../constants/index.js";
import {
  purchaseAmountValidator,
  lottoNumberValidator,
  bonusNumberValidator,
} from "../validators/index.js";
import { retryUntilValid } from "../utils/retryUntilValid.js";
import LottoGenerator from "../domain/LottoGenerator.js";
import Output from "../view/Output.js";
class LottoController {
  constructor() {
    this.lottoTickets = [];
    this.lottoNumber = [];
  }

  async play() {
    const purchaseAmount = await this.getPurchaseAmount();
    this.lottoTickets = LottoGenerator.generate(purchaseAmount);
    Output.printLottoTickets(this.lottoTickets);
    this.lottoNumber = await this.getLottoNumber();
    Output.print(this.lottoNumber);
    const bonusNumber = await this.getBonusNumber();
    Output.print(bonusNumber);
  }

  async getPurchaseAmount() {
    const purchaseAmount = await retryUntilValid(
      () => Input.getInput(MESSAGES.input.purchaseAmount),
      (input) => Number(input),
      purchaseAmountValidator
    );
    return purchaseAmount;
  }

  async getLottoNumber() {
    const lottoNumber = await retryUntilValid(
      () => Input.getInput(`${"\n" + MESSAGES.input.lottoNumber}`),
      (input) => input.split(",").map(Number),
      lottoNumberValidator
    );
    return lottoNumber;
  }

  async getBonusNumber() {
    const bonusNumber = await retryUntilValid(
      () => Input.getInput(`${"\n" + MESSAGES.input.bonusNumber}`),
      (input) => Number(input),
      (bonusNumber) => bonusNumberValidator(bonusNumber, this.lottoNumber)
    );
    return bonusNumber;
  }
}

export default LottoController;
