import { randomNumberBetween } from "../util/randomNumberMaker";
import { inputView } from "../view/inputView";
import { outputView } from "../view/outputView";
import { close } from "../util/console";

import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateRestartOrQuitCommend,
  validateWinningLottoNumbers,
} from "./validator";
import {
  INPUT_MESSAGE,
  LOTTO_PRICE,
  COMMA,
  RESTART_COMMEND,
  PLACES,
  PRIZE,
  MATCHING_NUMBERS,
} from "../constants";
const { PURCHASE_AMOUNT, LOTTO_NUMBER, BONUS_NUMBER, RESTART_OR_QUIT } = INPUT_MESSAGE;
const { LOWER_CASE, UPPER_CASE } = RESTART_COMMEND;
const { FIRST, SECOND, THIRD, FOURTH, FIFTH } = PLACES;
const { FIRST_PRIZE, SECOND_PRIZE, THIRD_PRIZE, FOURTH_PRIZE, FIFTH_PRIZE } = PRIZE;
const { THREE_NUMBERS, FOUR_NUMBERS, FIVE_NUMBERS, SIX_NUMBERS } = MATCHING_NUMBERS;

export class LottoGame {
  #winningLotto = {
    winningNumbers: [],
    bonusNumber: 0,
  };
  #lottoTickets = [];

  async play() {
    const purchaseAmount = await this.readPurchaseAmount();

    const numberOfPurchasedLottoTickets = purchaseAmount / LOTTO_PRICE;
    this.makeLottoTickets(numberOfPurchasedLottoTickets);
    outputView.printNumberOfPurchasedLottoTickets(numberOfPurchasedLottoTickets);
    outputView.printLottoTickets(this.#lottoTickets);

    await this.readWinningLottoNumbers();
    await this.readBonusNumber();

    const placesOfLottoTickets = this.getPlacesOfLottoTickets();
    outputView.printPlacesOfLottoTickets(placesOfLottoTickets);
    outputView.printRateOfReturn(
      this.getRateOfReturn(this.getTotalPrize(placesOfLottoTickets), purchaseAmount)
    );

    const restartOrQuit = await this.readRestartOrQuitCommend();
    this.shouldRestart(restartOrQuit) ? this.play() : close();
  }

  async readPurchaseAmount() {
    const purchaseAmountString = await inputView.readline(PURCHASE_AMOUNT);
    if (!validatePurchaseAmount(purchaseAmountString)) return this.readPurchaseAmount();
    return Number(purchaseAmountString);
  }

  async readWinningLottoNumbers() {
    const winningLottoNumbers = (await inputView.readline(LOTTO_NUMBER)).split(COMMA);
    if (!validateWinningLottoNumbers(winningLottoNumbers)) return this.readWinningLottoNumbers();
    this.#winningLotto.winningNumbers = winningLottoNumbers.map((number) => Number(number));
  }

  async readBonusNumber() {
    const bonusNumber = await inputView.readline(BONUS_NUMBER);
    if (!validateBonusNumber(bonusNumber, this.#winningLotto.winningNumbers))
      return this.readBonusNumber(this.#winningLotto.winningNumbers);
    this.#winningLotto.bonusNumber = Number(bonusNumber);
  }

  getPlacesOfLottoTickets() {
    const placesOfLottoTickets = {
      FIFTH_PLACE: 0,
      FOURTH_PLACE: 0,
      THIRD_PLACE: 0,
      SECOND_PLACE: 0,
      FIRST_PLACE: 0,
    };

    this.#lottoTickets.forEach((lottoTicket) => {
      const numberOfMatchingLottoNumbers = this.getNumberOfMatchingLottoNumbers(
        lottoTicket,
        this.#winningLotto.winningNumbers
      );

      placesOfLottoTickets[this.getPlace(numberOfMatchingLottoNumbers, lottoTicket)] += 1;
    });

    return placesOfLottoTickets;
  }

  getPlace(numberOfMatchingLottoNumbers, lottoTicket) {
    switch (numberOfMatchingLottoNumbers) {
      case SIX_NUMBERS:
        return FIRST;
      case FIVE_NUMBERS:
        return lottoTicket.includes(this.#winningLotto.bonusNumber) ? SECOND : THIRD;
      case FOUR_NUMBERS:
        return FOURTH;
      case THREE_NUMBERS:
        return FIFTH;
    }
  }

  getTotalPrize(placesOfLottoTickets) {
    return (
      placesOfLottoTickets.FIFTH_PLACE * FIFTH_PRIZE +
      placesOfLottoTickets.FOURTH_PLACE * FOURTH_PRIZE +
      placesOfLottoTickets.THIRD_PLACE * THIRD_PRIZE +
      placesOfLottoTickets.SECOND_PLACE * SECOND_PRIZE +
      placesOfLottoTickets.FIRST_PLACE * FIRST_PRIZE
    );
  }

  getRateOfReturn(totalPrize, purchaseAmount) {
    return Number(((totalPrize / purchaseAmount) * 100).toFixed(1));
  }

  async readRestartOrQuitCommend() {
    const restartOrQuitCommend = await inputView.readline(RESTART_OR_QUIT);
    if (!validateRestartOrQuitCommend(restartOrQuitCommend)) return this.readRestartOrQuitCommend();
    return restartOrQuitCommend;
  }

  shouldRestart(restartOrQuitCommend) {
    return [LOWER_CASE, UPPER_CASE].includes(restartOrQuitCommend) ? true : false;
  }

  makeLottoTickets(numberOfTickets) {
    this.#lottoTickets = Array.from({ length: numberOfTickets }, this.makeLottoTicket);
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
