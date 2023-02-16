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
    const placesOfLottoTickets = this.getPlacesOfLottoTickets(
      lottoTickets,
      winningLottoNumbers,
      bonusNumber
    );
    outputView.printPlacesOfLottoTickets(placesOfLottoTickets);
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

  getPlacesOfLottoTickets(lottoTickets, winningLottoNumbers, bonusNumber) {
    const placesOfLottoTickets = {
      FIFTH_PLACE: 0,
      FOURTH_PLACE: 0,
      THIRD_PLACE: 0,
      SECOND_PLACE: 0,
      FIRST_PLACE: 0,
    };

    lottoTickets.forEach((lottoTicket) => {
      const numberOfMatchingLottoNumbers = this.getNumberOfMatchingLottoNumbers(
        lottoTicket,
        winningLottoNumbers
      );

      switch (numberOfMatchingLottoNumbers) {
        case 6:
          placesOfLottoTickets.FIRST_PLACE += 1;
          break;
        case 5:
          lottoTicket.includes(bonusNumber)
            ? (placesOfLottoTickets.SECOND_PLACE += 1)
            : (placesOfLottoTickets.THIRD_PLACE += 1);
          break;
        case 4:
          placesOfLottoTickets.FOURTH_PLACE += 1;
          break;
        case 3:
          placesOfLottoTickets.FOURTH_PLACE += 1;
          break;
      }
    });

    return placesOfLottoTickets;
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

  getNumberOfMatchingLottoNumbers(lottoTicket, winningLottoNumbers) {
    return (
      lottoTicket.length +
      winningLottoNumbers.length -
      new Set([...lottoTicket, ...winningLottoNumbers]).size
    );
  }
}
