import { inputView } from "../view/inputView";
import { outputView } from "../view/outputView";
import { LOTTO_PRICE, PLACE, PRIZE_MONEY } from "../domain/constants";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateRestartOrQuitCommend,
  validateWinningLottoNumbers,
} from "./validator";
import { Lotto } from "./Lotto";
import { WinningLotto } from "./WinningLotto";
import { close, randomNumberBetween } from "../utils";
export class LottoGame {
  #winningLotto;
  #lottos = [];

  async play() {
    // 구입 금액 입력
    const purchaseAmount = Number(await this.#readPurchaseAmount());
    // 로또 생성
    const numberOfPurchasedLottos = purchaseAmount / LOTTO_PRICE;
    this.#setLottos(numberOfPurchasedLottos);
    // 생성한 로또 출력
    outputView.printNumberOfPurchasedLottos(numberOfPurchasedLottos);
    outputView.printLottos(this.#lottos);
    // 당첨, 보너스 번호 set
    await this.#setWinningLotto();
    // 당첨 통계 출력
    const placesOfLottos = this.#getPlacesOfLottos();
    outputView.printPlacesOfLottos(placesOfLottos);
    outputView.printRateOfReturn(
      this.#getRateOfReturn(this.#getTotalPrize(placesOfLottos), purchaseAmount)
    );
    // 게임 재시작 여부 결정
    const restartOrQuit = await this.#readRestartOrQuitCommend();
    this.#shouldRestart(restartOrQuit) ? this.play() : close();
  }

  // 구입 금액 입력
  async #readPurchaseAmount() {
    const purchaseAmount = await inputView.readLottoPurchaseAmount();
    if (!validatePurchaseAmount(purchaseAmount)) return this.#readPurchaseAmount();
    return purchaseAmount;
  }

  // 로또 생성
  #setLottos(numberOfTickets) {
    this.#lottos = Array.from({ length: numberOfTickets }, this.#makeLottoTicket);
  }

  #makeLottoTicket() {
    const lotto = new Set();
    while (6 > lotto.size) {
      lotto.add(randomNumberBetween());
    }
    return new Lotto([...lotto]);
  }

  // 당첨, 보너스 번호 set
  async #readWinningLottoNumbers() {
    const winningLottoNumbers = await inputView.readWinningLottoNumbers();
    if (!validateWinningLottoNumbers(winningLottoNumbers)) return this.#readWinningLottoNumbers();
    return winningLottoNumbers;
  }

  async #readBonusNumber(winningLottoNumbers) {
    const bonusNumber = await inputView.readBonusNumber();
    if (!validateBonusNumber(bonusNumber, winningLottoNumbers))
      return this.#readBonusNumber(winningLottoNumbers);
    return bonusNumber;
  }

  async #setWinningLotto() {
    const winningLottoNumbers = (await this.#readWinningLottoNumbers()).split(",").map(Number);
    const bonusNumber = Number(await this.#readBonusNumber(winningLottoNumbers));
    this.#winningLotto = new WinningLotto(new Lotto(winningLottoNumbers), bonusNumber);
  }

  // 당첨 통계 출력
  #getPlacesOfLottos() {
    return this.#lottos.reduce(
      (acc, lotto) => {
        acc[lotto.getPlace(this.#winningLotto)] += 1;
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

  #getTotalPrize(placesOfLottos) {
    return (
      placesOfLottos[PLACE.fifth] * PRIZE_MONEY.fifth +
      placesOfLottos[PLACE.fourth] * PRIZE_MONEY.fourth +
      placesOfLottos[PLACE.third] * PRIZE_MONEY.third +
      placesOfLottos[PLACE.second] * PRIZE_MONEY.second +
      placesOfLottos[PLACE.first] * PRIZE_MONEY.first
    );
  }

  #getRateOfReturn(totalPrize, purchaseAmount) {
    return Number(((totalPrize / purchaseAmount) * 100).toFixed(1));
  }

  // 게임 재시작 여부 결정
  async #readRestartOrQuitCommend() {
    const restartOrQuitCommend = await inputView.readRestartOrQuit();
    if (!validateRestartOrQuitCommend(restartOrQuitCommend))
      return this.#readRestartOrQuitCommend();
    return restartOrQuitCommend;
  }

  #shouldRestart(restartOrQuitCommend) {
    return ["y", "Y"].includes(restartOrQuitCommend);
  }
}
