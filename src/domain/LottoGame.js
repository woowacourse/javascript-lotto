import { randomNumberBetween } from "../util/randomNumberMaker";
import { inputView } from "../view/inputView";
import { outputView } from "../view/outputView";
import { close } from "../util/console";
import { LOTTO_PRICE, PLACE, PRIZE_MONEY } from "../domain/constants";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateRestartOrQuitCommend,
  validateWinningLottoNumbers,
} from "./validator";
import { Lotto } from "./Lotto";
import { WinningLotto } from "./WinningLotto";

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

  // readPurchaseAmount()
  async #readPurchaseAmount() {
    const purchaseAmount = await inputView.readLottoPurchaseAmount();
    if (!validatePurchaseAmount(purchaseAmount)) return this.#readPurchaseAmount();
    return purchaseAmount;
  }

  // setWinningLotto()
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

  #getPlacesOfLottos() {
    return this.#lottos.reduce(
      (acc, lotto) => {
        const numberOfMatchingLottoNumbers = this.#getNumberOfMatchingLottoNumbers(
          lotto.numbers,
          this.#winningLotto.winningNumbers
        );
        acc[this.#getPlace(numberOfMatchingLottoNumbers, lotto)] += 1;
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

  #getPlace(numberOfMatchingLottoNumbers, lotto) {
    switch (numberOfMatchingLottoNumbers) {
      case 6:
        return PLACE.first;
      case 5:
        console.log(lotto.numbers, this.#winningLotto.bonusNumber);
        return lotto.numbers.includes(this.#winningLotto.bonusNumber) ? PLACE.second : PLACE.third;
      case 4:
        return PLACE.fourth;
      case 3:
        return PLACE.fifth;
      default:
        return PLACE.last;
    }
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

  async #readRestartOrQuitCommend() {
    const restartOrQuitCommend = await inputView.readRestartOrQuit();
    if (!validateRestartOrQuitCommend(restartOrQuitCommend))
      return this.#readRestartOrQuitCommend();
    return restartOrQuitCommend;
  }

  #shouldRestart(restartOrQuitCommend) {
    return ["y", "Y"].includes(restartOrQuitCommend);
  }

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

  #getNumberOfMatchingLottoNumbers(lottoNumbers, winningLottoNumbers) {
    return (
      lottoNumbers.length +
      winningLottoNumbers.length -
      new Set([...lottoNumbers, ...winningLottoNumbers]).size
    );
  }
}
