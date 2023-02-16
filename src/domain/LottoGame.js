import { randomNumberBetween } from "../util/randomNumberMaker";
import { inputView } from "../view/inputView";
import { outputView } from "../view/outputView";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningLottoNumbers,
} from "./validator";

export class LottoGame {
  async play() {
    const purchaseAmount = await this.readPurchaseAmount();
    const numberOfPurchasedLottoTickets = purchaseAmount / 1000;
    const lottoTickets = this.makeLottoTickets(numberOfPurchasedLottoTickets);
    outputView.printNumberOfPurchasedLottoTickets(numberOfPurchasedLottoTickets);
    outputView.printLottoTickets(lottoTickets);
    const winningLottoNumbers = await this.readWinningLottoNumbers();
    const bonusNumber = await this.readBonusNumber(winningLottoNumbers);
  }

  async readPurchaseAmount() {
    const purchaseAmountString = await inputView.readline("로또 구입 금액을 입력해 주세요.");
    validatePurchaseAmount(purchaseAmountString);
    return Number(purchaseAmountString);
  }

  async readWinningLottoNumbers() {
    const winningLottoNumbers = (
      await inputView.readline("당첨 번호를 콤마(,)로 구분해서 입력해 주세요.")
    ).split(",");
    validateWinningLottoNumbers(winningLottoNumbers);
    return winningLottoNumbers.map((number) => Number(number));
  }

  async readBonusNumber(winningLottoNumbers) {
    const bonusNumber = await inputView.readline("보너스 번호를 입력해 주세요.");
    validateBonusNumber(bonusNumber, winningLottoNumbers);
    return Number(bonusNumber);
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
