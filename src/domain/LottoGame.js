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
  PRIZE,
  LOTTO_NUMBER_LENGTH,
  RESPONSE_AFTER_GAME_ENDS,
  DELIMITER,
  MATCHING_COUNT_AND_PLACES,
} from "../constants";
const { PURCHASE_AMOUNT, LOTTO_NUMBER, BONUS_NUMBER, RESTART_OR_QUIT } = INPUT_MESSAGE;
const { RESTART } = RESPONSE_AFTER_GAME_ENDS;

export class LottoGame {
  #winningLotto = {
    winningNumbers: [],
    bonusNumber: 0,
  };
  #lottoTickets = [];

  async play() {
    const purchaseAmount = await this.readPurchaseAmount();

    const purchasedLottoTicketCount = purchaseAmount / LOTTO_PRICE;
    this.makeLottoTickets(purchasedLottoTicketCount);
    outputView.printPurchasedLottoTicketCount(purchasedLottoTicketCount);
    outputView.printLottoTickets(this.#lottoTickets);

    await this.readWinningLottoNumbers();
    await this.readBonusNumber();

    const placesOfLottoTickets = this.getPlacesOfLottoTickets();
    outputView.printWinningLottoCount(placesOfLottoTickets);
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
    const winningLottoNumbers = (await inputView.readline(LOTTO_NUMBER)).split(DELIMITER);

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
    const placesOfLottoTickets = [];

    this.#lottoTickets.forEach((lottoTicket) => {
      const matchingLottoNumbersCount = this.getMatchingWinningNumbersCount(
        lottoTicket,
        this.#winningLotto.winningNumbers
      );
      placesOfLottoTickets.push(this.getPlace(matchingLottoNumbersCount, lottoTicket));
    });

    return placesOfLottoTickets.filter((place) => place !== undefined);
  }

  getPlace(matchingLottoNumbersCount, lottoTicket) {
    if (matchingLottoNumbersCount === 5) {
      return lottoTicket.includes(this.#winningLotto.bonusNumber)
        ? 2
        : MATCHING_COUNT_AND_PLACES[matchingLottoNumbersCount];
    }

    return MATCHING_COUNT_AND_PLACES[matchingLottoNumbersCount];
  }

  getTotalPrize(placesOfLottoTickets) {
    return placesOfLottoTickets.map((place) => PRIZE[place]).reduce((acc, cur) => acc + cur, 0);
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

  makeLottoTickets(ticketCount) {
    this.#lottoTickets = Array.from({ length: ticketCount }, this.makeLottoTicket);
  }

  makeLottoTicket() {
    const lottoTicket = new Set();

    while (LOTTO_NUMBER_LENGTH > lottoTicket.size) {
      lottoTicket.add(generateRandomNumber());
    }

    return [...lottoTicket];
  }

  getMatchingWinningNumbersCount(lottoTicket, winningLottoNumbers) {
    return (
      lottoTicket.length +
      winningLottoNumbers.length -
      new Set([...lottoTicket, ...winningLottoNumbers]).size
    );
  }
}
