import { LOTTO_PRICE_UNIT, MATCHING_COUNT_AND_PLACES, PLACES } from "../constants";
import { makeLottoTickets } from "../domain/lottoMachine";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningLottoNumbers,
} from "../validator";
import { webErrorCatcher } from "../validator/errorCatcher";
import { closeModalButton, restartLottoGame } from "../ui/modal";
import { printLottoTicket } from "../ui/lottoTicketPrinter";
import { printLottoResult } from "../ui/lottoResult";
const { FIFTH, SECOND } = PLACES;

const lottoTicketCount = document.querySelector("#lotto-ticket-count > span");
const lottoTicketSection = document.querySelector(".lotto-ticket-section");
const modal = document.querySelector(".modal");

const winningNumberForm = document.querySelector("#winning-lotto");
const winningNumberFormButton = document.querySelector("#winning-lotto > button");
const winningNumberInput = document.querySelectorAll("input[name=winning-number]");
const bonusNumber = document.querySelector("input[name=bonus-number]");

export class LottoGame {
  #winningNumbers = [];
  #lottoTickets = [];

  play() {
    const purchaseAmountInput = document.querySelector("#purchase-amount input");

    const purchaseAmountForm = document.querySelector("#purchase-amount");
    purchaseAmountForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#purchaseLottoTicket(purchaseAmountInput.value);
    });

    winningNumberForm.addEventListener("submit", (event) => {
      if (!this.#isValidWinningNumber(event)) return;
      this.#showLottoResult(purchaseAmountInput.value);
    });

    closeModalButton();
    restartLottoGame();
  }

  #purchaseLottoTicket(purchaseAmount) {
    if (!webErrorCatcher(() => validatePurchaseAmount(purchaseAmount))) {
      return lottoTicketSection.classList.add("hidden");
    }

    const purchasedTicketCount = purchaseAmount / LOTTO_PRICE_UNIT;
    this.#lottoTickets = makeLottoTickets(purchasedTicketCount);

    lottoTicketCount.innerHTML = `${purchasedTicketCount}`;

    printLottoTicket(this.#lottoTickets);
    lottoTicketSection.classList.remove("hidden");
  }

  #isValidWinningNumber(event) {
    event.preventDefault();

    const winningNumber = [...winningNumberInput].map((number) => Number(number.value));

    if (!webErrorCatcher(() => validateWinningLottoNumbers(winningNumber))) return;
    if (!webErrorCatcher(() => validateBonusNumber(bonusNumber.value, winningNumber))) return;

    this.#winningNumbers = [winningNumber, bonusNumber.value];

    return true;
  }

  #showLottoResult(purchaseAmount) {
    modal.classList.remove("hidden");
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

  /*  
    @param {number[]} : 로또 티켓 한장
    
    로또 티켓의 길이(6) + 로또 당첨 번호의 길이(6) - 로또 티켓과 로또 당첨번호의 중복 번호가 사라진 배열의 길이(n)
    = 당첨된 번호의 개수
  */
  #getMatchingWinningNumberCount(lottoTicket) {
    return (
      lottoTicket.length +
      this.#winningNumbers[0].length -
      new Set([...lottoTicket, ...this.#winningNumbers[0]]).size
    );
  }

  #getPlace(matchingLottoNumberCount, lottoTicket) {
    const isFifth = matchingLottoNumberCount === FIFTH;
    const isMatchingBonusNumber = lottoTicket.includes(Number(this.#winningNumbers[1]));

    return isFifth && isMatchingBonusNumber
      ? SECOND
      : MATCHING_COUNT_AND_PLACES[matchingLottoNumberCount];
  }
}
