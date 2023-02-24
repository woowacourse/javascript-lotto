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

  /*  
    @param {number[], number[]} : 로또 티켓 한장, 로또 당첨 번호
    
    로또 티켓의 길이(6) + 로또 당첨 번호의 길이(6) - 로또 티켓과 로또 당첨번호의 중복 번호가 사라진 배열의 길이(n)
    = 당첨된 번호의 개수
  */
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
    const isFifth = matchingLottoNumberCount === FIFTH;
    const isMatchingBonusNumber = lottoTicket.includes(this.#winningLotto.bonusNumber);

    return isFifth && isMatchingBonusNumber
      ? SECOND
      : MATCHING_COUNT_AND_PLACES[matchingLottoNumberCount];
  }

  #restart(restartOrQuitCommend) {
    RESTART === restartOrQuitCommend ? this.play() : close();
  }
}
