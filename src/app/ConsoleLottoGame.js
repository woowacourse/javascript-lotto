import {
  readBonusNumber,
  readPurchaseAmount,
  readRestartOrQuitCommend,
  readWinningLottoNumbers,
} from "../view/inputView";
import { outputView } from "../view/outputView";
import { close } from "../util/console";
import { LOTTO_PRICE, RESPONSE_AFTER_GAME_ENDS, MATCHING_COUNT_AND_PLACES } from "../constants";
import { getRateOfReturn, getTotalPrize } from "../domain/calculator";
import { makeLottoTickets } from "../domain/lottoMachine";
const { RESTART } = RESPONSE_AFTER_GAME_ENDS;

export class LottoGame {
  #winningLotto = {
    winningNumbers: [],
    bonusNumber: 0,
  };
  #lottoTickets = [];

  async play() {
    const purchaseAmount = await readPurchaseAmount();
    this.printLottoTickets(purchaseAmount);

    this.#winningLotto.winningNumbers = await readWinningLottoNumbers();
    this.#winningLotto.bonusNumber = await readBonusNumber(this.#winningLotto.winningNumbers);

    this.printGameResult(purchaseAmount);

    const restartOrQuit = await readRestartOrQuitCommend();
    this.shouldRestart(restartOrQuit) ? this.play() : close();
  }

  printLottoTickets(purchaseAmount) {
    const purchasedLottoTicketCount = purchaseAmount / LOTTO_PRICE;
    this.#lottoTickets = makeLottoTickets(purchasedLottoTicketCount);

    outputView.printPurchasedLottoTicketCount(purchasedLottoTicketCount);
    outputView.printLottoTickets(this.#lottoTickets);
  }

  printGameResult(purchaseAmount) {
    const placesOfLottoTickets = this.getPlacesOfLottoTickets();

    outputView.printWinningLottoCount(placesOfLottoTickets);
    outputView.printRateOfReturn(
      getRateOfReturn(getTotalPrize(placesOfLottoTickets), purchaseAmount)
    );
  }

  getMatchingWinningNumberCount(lottoTicket, winningLottoNumbers) {
    return (
      lottoTicket.length +
      winningLottoNumbers.length -
      new Set([...lottoTicket, ...winningLottoNumbers]).size
    );
  }

  getPlacesOfLottoTickets() {
    const placesOfLottoTickets = this.#lottoTickets.map((lottoTicket) => {
      const matchingLottoNumberCount = this.getMatchingWinningNumberCount(
        lottoTicket,
        this.#winningLotto.winningNumbers
      );

      return this.getPlace(matchingLottoNumberCount, lottoTicket);
    });

    return placesOfLottoTickets.filter((place) => place !== undefined);
  }

  getPlace(matchingLottoNumberCount, lottoTicket) {
    if (matchingLottoNumberCount === 5) {
      return lottoTicket.includes(this.#winningLotto.bonusNumber)
        ? 2
        : MATCHING_COUNT_AND_PLACES[matchingLottoNumberCount];
    }

    return MATCHING_COUNT_AND_PLACES[matchingLottoNumberCount];
  }

  shouldRestart(restartOrQuitCommend) {
    return [RESTART].includes(restartOrQuitCommend);
  }
}
