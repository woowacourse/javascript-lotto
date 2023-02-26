import { LOTTO_PRICE_UNIT, MATCHING_COUNT_AND_PLACES, PLACES } from "../constants";
import { makeLottoTickets } from "../domain/lottoMachine";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningLottoNumbers,
} from "../validator";
import { webErrorCatcher } from "../validator/errorCatcher";
import { printLottoTicket } from "../ui/lottoTicketPrinter";
import { printLottoResult } from "../ui/lottoResult";
import {
  convertInputsToNumber,
  getBonusNumber,
  getPurchaseAmount,
  removeLottoTicketSection,
  showLottoTicketSection,
  showModal,
} from "../DOM/controller";
import { querySelector } from "../util/DOMSelector";
const { SECOND } = PLACES;

export class LottoGame {
  #winningNumbers = [];
  #lottoTickets = [];

  play() {
    const purchaseAmountForm = querySelector("#purchase-amount-form");
    purchaseAmountForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#purchaseLottoTicket(getPurchaseAmount());
    });

    const winningNumberForm = querySelector("#winning-lotto");
    winningNumberForm.addEventListener("submit", (event) => {
      if (!this.#isValidWinningNumber(event)) return;
      this.#showLottoResult(getPurchaseAmount());
    });
  }

  #purchaseLottoTicket(purchaseAmount) {
    if (!webErrorCatcher(() => validatePurchaseAmount(purchaseAmount))) {
      return removeLottoTicketSection();
    }

    const purchasedTicketCount = purchaseAmount / LOTTO_PRICE_UNIT;
    this.#lottoTickets = makeLottoTickets(purchasedTicketCount);

    querySelector("#lotto-ticket-count > span").innerHTML = `${purchasedTicketCount}`;

    printLottoTicket(this.#lottoTickets);
    showLottoTicketSection();
  }

  #isValidWinningNumber(event) {
    event.preventDefault();

    const winningNumbers = convertInputsToNumber();

    if (!webErrorCatcher(() => validateWinningLottoNumbers(winningNumbers))) return;
    if (!webErrorCatcher(() => validateBonusNumber(getBonusNumber(), winningNumbers))) return;

    this.#winningNumbers = [winningNumbers, getBonusNumber()];

    return true;
  }

  #showLottoResult(purchaseAmount) {
    showModal();

    const placesOfLottoTickets = this.#getPlacesOfLottoTickets();
    printLottoResult(placesOfLottoTickets, purchaseAmount);
  }

  #getPlacesOfLottoTickets() {
    const placesOfLottoTickets = this.#lottoTickets.map((lottoTicket) => {
      const matchingLottoNumberCount = this.#getMatchingWinningNumberCount(lottoTicket);

      return this.#getPlace(matchingLottoNumberCount, lottoTicket);
    });

    return placesOfLottoTickets.filter(Boolean);
  }

  #getMatchingWinningNumberCount(lottoTicket) {
    return [...lottoTicket].filter((num) => this.#winningNumbers[0].includes(num)).length;
  }

  #getPlace(matchingLottoNumberCount, lottoTicket) {
    const isSecondOrThird = matchingLottoNumberCount === 5;
    const isMatchingBonusNumber = lottoTicket.includes(Number(this.#winningNumbers[1]));

    return isSecondOrThird && isMatchingBonusNumber
      ? SECOND
      : MATCHING_COUNT_AND_PLACES[matchingLottoNumberCount];
  }
}
