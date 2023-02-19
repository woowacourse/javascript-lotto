import { randomNumberBetween } from "../util/randomNumberMaker";
import { inputView } from "../view/inputView";
import { outputView } from "../view/outputView";
import { close } from "../util/console";
import { LOTTO_PRICE, PLACE, PRIZE_MONEY } from "../domain/constants";
import { MESSAGE } from "./message";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateRestartOrQuitCommend,
  validateWinningLottoNumbers,
} from "./validator";

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
    const purchaseAmountString = await inputView.readLottoPurchaseAmount();
    if (!validatePurchaseAmount(purchaseAmountString)) return this.readPurchaseAmount();
    return Number(purchaseAmountString);
  }

  async readWinningLottoNumbers() {
    const winningLottoNumbers = (await inputView.readWinningLottoNumbers()).split(",");
    if (!validateWinningLottoNumbers(winningLottoNumbers)) return this.readWinningLottoNumbers();
    this.#winningLotto.winningNumbers = winningLottoNumbers.map(Number);
  }

  async readBonusNumber() {
    const bonusNumber = await inputView.readBonusNumber();
    if (!validateBonusNumber(bonusNumber, this.#winningLotto.winningNumbers))
      return this.readBonusNumber(this.#winningLotto.winningNumbers);
    this.#winningLotto.bonusNumber = Number(bonusNumber);
  }

  getPlacesOfLottoTickets() {
    return this.#lottoTickets.reduce(
      (acc, lottoTicket) => {
        const numberOfMatchingLottoNumbers = this.getNumberOfMatchingLottoNumbers(
          lottoTicket,
          this.#winningLotto.winningNumbers
        );
        acc[this.getPlace(numberOfMatchingLottoNumbers, lottoTicket)] += 1;
        return acc;
      },
      {
        [PLACE.first]: 0,
        [PLACE.second]: 0,
        [PLACE.third]: 0,
        [PLACE.fourth]: 0,
        [PLACE.fifth]: 0,
        [PLACE.last]: 0,
      }
    );
  }

  getPlace(numberOfMatchingLottoNumbers, lottoTicket) {
    switch (numberOfMatchingLottoNumbers) {
      case 6:
        return PLACE.first;
      case 5:
        return lottoTicket.includes(this.#winningLotto.bonusNumber) ? PLACE.second : PLACE.third;
      case 4:
        return PLACE.fourth;
      case 3:
        return PLACE.fifth;
      default:
        return PLACE.last;
    }
  }

  getTotalPrize(placesOfLottoTickets) {
    return (
      placesOfLottoTickets[PLACE.fifth] * PRIZE_MONEY.fifth +
      placesOfLottoTickets[PLACE.fourth] * PRIZE_MONEY.fourth +
      placesOfLottoTickets[PLACE.third] * PRIZE_MONEY.third +
      placesOfLottoTickets[PLACE.second] * PRIZE_MONEY.second +
      placesOfLottoTickets[PLACE.first] * PRIZE_MONEY.first
    );
  }

  getRateOfReturn(totalPrize, purchaseAmount) {
    return Number(((totalPrize / purchaseAmount) * 100).toFixed(1));
  }

  async readRestartOrQuitCommend() {
    const restartOrQuitCommend = await inputView.readRestartOrQuit();
    if (!validateRestartOrQuitCommend(restartOrQuitCommend)) return this.readRestartOrQuitCommend();
    return restartOrQuitCommend;
  }

  shouldRestart(restartOrQuitCommend) {
    return ["y", "Y"].includes(restartOrQuitCommend);
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
