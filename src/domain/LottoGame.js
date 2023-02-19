import { generateRandomNumber } from "../util/randomNumberMaker";
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
  PLACES,
  PRIZE,
  LOTTO_NUMBER_LENGTH,
  RESPONSE_AFTER_GAME_ENDS,
} from "../constants";
const { PURCHASE_AMOUNT, LOTTO_NUMBER, BONUS_NUMBER, RESTART_OR_QUIT } = INPUT_MESSAGE;
const { RESTART } = RESPONSE_AFTER_GAME_ENDS;
const { FIRST, SECOND, THIRD, FOURTH, FIFTH } = PLACES;
const { FIRST_PRIZE, SECOND_PRIZE, THIRD_PRIZE, FOURTH_PRIZE, FIFTH_PRIZE } = PRIZE;

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
    const purchaseAmount = await inputView.readline(PURCHASE_AMOUNT);

    if (!validatePurchaseAmount(purchaseAmount)) return this.readPurchaseAmount();

    return Number(purchaseAmount);
  }

  async readWinningLottoNumbers() {
    const winningLottoNumbers = (await inputView.readline(LOTTO_NUMBER)).split(COMMA);

    if (!validateWinningLottoNumbers(winningLottoNumbers)) return this.readWinningLottoNumbers();

    this.#winningLotto.winningNumbers = winningLottoNumbers.map(Number);
  }
  async readBonusNumber() {
    const bonusNumber = await inputView.readline(BONUS_NUMBER);

    if (!validateBonusNumber(bonusNumber, this.#winningLotto.winningNumbers)) {
      return this.readBonusNumber(this.#winningLotto.winningNumbers);
    }

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
      case 6:
        return FIRST;
      case 5:
        return lottoTicket.includes(this.#winningLotto.bonusNumber) ? SECOND : THIRD;
      case 4:
        return FOURTH;
      case 3:
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

    return restartOrQuitCommend.toLowerCase();
  }

  shouldRestart(restartOrQuitCommend) {
    return [RESTART].includes(restartOrQuitCommend);
  }

  makeLottoTickets(numberOfTickets) {
    this.#lottoTickets = Array.from({ length: numberOfTickets }, this.makeLottoTicket);
  }

  makeLottoTicket() {
    const lottoTicket = new Set();

    while (LOTTO_NUMBER_LENGTH > lottoTicket.size) {
      lottoTicket.add(generateRandomNumber());
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
