import { LOTTO_PRICE, PLACE, PRIZE_MONEY } from "../domain/constants";
import { randomNumberBetween } from "../utils";
import { Lotto } from "./Lotto";
import { WinningLotto } from "./WinningLotto";

export class LottoGame {
  #winningLotto;
  #lottos = [];

  constructor(view) {
    this.view = view;
  }

  async play() {
    const purchaseAmount = Number(await this.view.readPurchaseAmount());
    this.lottoPurchase(purchaseAmount);
    this.showLottos();

    const winningLottoNumbers = (await this.view.readWinningLottoNumbers()).split(",").map(Number);
    this.setWinningLotto(
      winningLottoNumbers,
      Number(await this.view.readBonusNumber(winningLottoNumbers))
    );
    this.showStatistics(purchaseAmount);

    this.restart(await this.view.readRestartOrQuit());
  }

  lottoPurchase(purchaseAmount) {
    const numberOfPurchasedLottos = purchaseAmount / LOTTO_PRICE;
    this.#setLottos(numberOfPurchasedLottos);
  }

  showLottos() {
    this.view.printNumberOfPurchasedLottos(this.#lottos.length);
    this.view.printLottos(this.#lottos);
  }

  setWinningLotto(winningLottoNumbers, bonusNumber) {
    this.#winningLotto = new WinningLotto(new Lotto(winningLottoNumbers), bonusNumber);
  }

  showStatistics(purchaseAmount) {
    const placesOfLottos = this.#getPlacesOfLottos();
    this.view.printPlacesOfLottos(placesOfLottos);
    this.view.printRateOfReturn(
      this.#getRateOfReturn(this.#getTotalPrize(placesOfLottos), purchaseAmount)
    );
  }

  restart(restartOrQuit) {
    this.#shouldRestart(restartOrQuit) ? this.play() : this.view.close();
  }

  // 로또 생성
  #makeLotto() {
    const lotto = new Set();
    while (6 > lotto.size) {
      lotto.add(randomNumberBetween());
    }
    return new Lotto([...lotto]);
  }

  #setLottos(numberOfTickets) {
    this.#lottos = Array.from({ length: numberOfTickets }, this.#makeLotto);
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

  #shouldRestart(restartOrQuitCommend) {
    return ["y", "Y"].includes(restartOrQuitCommend);
  }
}
