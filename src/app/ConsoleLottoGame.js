import {
  readBonusNumber,
  readPurchaseAmount,
  readRestartOrQuitCommend,
  readWinningLottoNumbers,
} from "../view/inputView";
import { outputView } from "../view/outputView";
import { close } from "../util/console";
import {
  LOTTO_PRICE_UNIT,
  RESPONSE_AFTER_GAME_ENDS,
  MATCHING_COUNT_AND_PLACES,
  PLACES,
} from "../constants";
import { getRateOfReturn, getTotalPrize } from "../domain/calculator";
import { makeLottoTickets } from "../domain/lottoMachine";
const { RESTART } = RESPONSE_AFTER_GAME_ENDS;
const { FIFTH, SECOND } = PLACES;

export class LottoGame {
  #winningLotto = {
    winningNumbers: [],
    bonusNumber: 0,
  };
  #lottoTickets = [];

  async play() {
    const purchaseAmount = await readPurchaseAmount();
    this.#getLottoTickets(purchaseAmount);

    this.#winningLotto.winningNumbers = await readWinningLottoNumbers();
    this.#winningLotto.bonusNumber = await readBonusNumber(this.#winningLotto.winningNumbers);

    this.#getGameResult(purchaseAmount);

    const restartOrQuit = await readRestartOrQuitCommend();
    this.#restart(restartOrQuit);
  }

  #getLottoTickets(purchaseAmount) {
    const purchasedLottoTicketCount = purchaseAmount / LOTTO_PRICE_UNIT;
    this.#lottoTickets = makeLottoTickets(purchasedLottoTicketCount);

    outputView.printPurchasedLottoTicketCount(purchasedLottoTicketCount);
    outputView.printLottoTickets(this.#lottoTickets);
  }

  #getGameResult(purchaseAmount) {
    const placesOfLottoTickets = this.#getPlacesOfLottoTickets();

    outputView.printWinningLottoCount(placesOfLottoTickets);
    outputView.printRateOfReturn(
      getRateOfReturn(getTotalPrize(placesOfLottoTickets), purchaseAmount)
    );
  }

  #getMatchingWinningNumberCount(lottoTicket, winningLottoNumbers) {
    return (
      lottoTicket.length +
      winningLottoNumbers.length -
      new Set([...lottoTicket, ...winningLottoNumbers]).size
    );
  }

  #getPlacesOfLottoTickets() {
    const placesOfLottoTickets = this.#lottoTickets.map((lottoTicket) => {
      const matchingLottoNumberCount = this.#getMatchingWinningNumberCount(
        lottoTicket,
        this.#winningLotto.winningNumbers
      );

      return this.#getPlace(matchingLottoNumberCount, lottoTicket);
    });

    return placesOfLottoTickets.filter(Boolean);
  }

  #getPlace(matchingLottoNumberCount, lottoTicket) {
    if (matchingLottoNumberCount === FIFTH) {
      return lottoTicket.includes(this.#winningLotto.bonusNumber)
        ? SECOND
        : MATCHING_COUNT_AND_PLACES[matchingLottoNumberCount];
    }

    return MATCHING_COUNT_AND_PLACES[matchingLottoNumberCount];
  }

  #restart(restartOrQuitCommend) {
    RESTART === restartOrQuitCommend ? this.play() : close();
  }
}
