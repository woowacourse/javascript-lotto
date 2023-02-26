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
const { SECOND } = PLACES;

const lottoTicketCount = document.querySelector("#lotto-ticket-count > span");
const lottoTicketSection = document.querySelector("#lotto-ticket-section");
const modal = document.querySelector(".modal");

const winningNumberForm = document.querySelector("#winning-lotto");
const winningNumberFormButton = document.querySelector("#result-button");
const winningNumberInputs = document.querySelectorAll("input[name=lotto-winning-number]");
const bonusNumber = document.querySelector("#bonus-number");
const purchaseAmountForm = document.querySelector("#purchase-amount-form");

export class LottoGame {
  #winningNumbers = [];
  #lottoTickets = [];

  play() {
    const purchaseAmountInput = document.querySelector("#purchase-amount");

    purchaseAmountForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#purchaseLottoTicket(purchaseAmountInput.value);
    });

    winningNumberForm.addEventListener("submit", (event) => {
      if (!this.#isValidWinningNumber(event)) return;
      this.#showLottoResult(purchaseAmountInput.value);
    });
  }

  #purchaseLottoTicket(purchaseAmount) {
    if (!webErrorCatcher(() => validatePurchaseAmount(purchaseAmount))) {
      return lottoTicketSection.classList.add("none-display");
    }

    const purchasedTicketCount = purchaseAmount / LOTTO_PRICE_UNIT;
    this.#lottoTickets = makeLottoTickets(purchasedTicketCount);

    lottoTicketCount.innerHTML = `${purchasedTicketCount}`;

    printLottoTicket(this.#lottoTickets);
    lottoTicketSection.classList.remove("none-display");
  }

  #isValidWinningNumber(event) {
    event.preventDefault();

    const winningNumbers = [...winningNumberInputs].map((number) => Number(number.value));

    if (!webErrorCatcher(() => validateWinningLottoNumbers(winningNumbers))) return;
    if (!webErrorCatcher(() => validateBonusNumber(bonusNumber.value, winningNumbers))) return;

    this.#winningNumbers = [winningNumbers, bonusNumber.value];

    return true;
  }

  #showLottoResult(purchaseAmount) {
    modal.classList.remove("none-display");
    winningNumberFormButton.disabled = true;

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
