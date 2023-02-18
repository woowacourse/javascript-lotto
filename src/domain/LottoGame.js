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

export class LottoGame {
  #winningLotto = {
    winningNumbers: [],
    bonusNumber: 0,
  };
  #lottoTickets = [];

  async play() {
    const purchaseAmount = await this.readPurchaseAmount();

    const numberOfPurchasedLottoTickets = purchaseAmount / 1000;
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
    const purchaseAmountString = await inputView.readline("로또 구입 금액을 입력해 주세요.");
    if (!validatePurchaseAmount(purchaseAmountString)) return this.readPurchaseAmount();
    return Number(purchaseAmountString);
  }

  async readWinningLottoNumbers() {
    const winningLottoNumbers = (
      await inputView.readline("\n당첨 번호를 콤마(,)로 구분해서 입력해 주세요.")
    ).split(",");
    if (!validateWinningLottoNumbers(winningLottoNumbers)) return this.readWinningLottoNumbers();
    this.#winningLotto.winningNumbers = winningLottoNumbers.map((number) => Number(number));
  }

  async readBonusNumber() {
    const bonusNumber = await inputView.readline("\n보너스 번호를 입력해 주세요.");
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
      case 6:
        return "FIRST_PLACE";
      case 5:
        return lottoTicket.includes(this.#winningLotto.bonusNumber)
          ? "SECOND_PLACE"
          : "THIRD_PLACE";
      case 4:
        return "FOURTH_PLACE";
      case 3:
        return "FIFTH_PLACE";
    }
  }

  getTotalPrize(placesOfLottoTickets) {
    return (
      placesOfLottoTickets.FIFTH_PLACE * 5000 +
      placesOfLottoTickets.FOURTH_PLACE * 50000 +
      placesOfLottoTickets.THIRD_PLACE * 1500000 +
      placesOfLottoTickets.SECOND_PLACE * 30000000 +
      placesOfLottoTickets.FIRST_PLACE * 2000000000
    );
  }

  getRateOfReturn(totalPrize, purchaseAmount) {
    return Number(((totalPrize / purchaseAmount) * 100).toFixed(1));
  }

  async readRestartOrQuitCommend() {
    const restartOrQuitCommend = await inputView.readline("다시 시작하시겠습니까? (y/n)");
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
