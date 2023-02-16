import { randomNumberBetween } from "../util/randomNumberMaker";
import { inputView } from "../view/inputView";
import { outputView } from "../view/outputView";
import { validatePurchaseAmount } from "./validator";

export class LottoGame {
  async play() {
    const purchaseAmount = await this.readPurchaseAmount();
    const numberOfPurchasedLottoTickets = purchaseAmount / 1000;
    const lottoTickets = this.makeLottoTickets(numberOfPurchasedLottoTickets);
    outputView.printNumberOfPurchasedLottoTickets(numberOfPurchasedLottoTickets);
    outputView.printLottoTickets(lottoTickets);
  }

  async readPurchaseAmount() {
    const purchaseAmountString = await inputView.readline("로또 구입 금액을 입력해 주세요.");
    validatePurchaseAmount(purchaseAmountString);
    return Number(purchaseAmountString);
  }

  makeLottoTickets(numberOfTickets) {
    const lottoTickets = Array.from({ length: numberOfTickets }, this.makeLottoTicket);

    return lottoTickets;
  }

  makeLottoTicket() {
    const lottoTicket = new Set();

    while (6 > lottoTicket.size) {
      lottoTicket.add(randomNumberBetween());
    }

    return [...lottoTicket];
  }
}
