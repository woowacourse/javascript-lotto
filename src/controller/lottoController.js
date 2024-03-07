import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

import Lotto from "../domain/Lotto.js";
import LottoMoney from "../domain/LottoMoney.js";
import LottoNumber from "../domain/LottoNumber.js";
import lottoGenerator from "../domain/lottoGenerator.js";

import Command from "../utils/Command.js";

import retryCallbackFunctionOnError from "../utils/retryCallbackFunctionOnError.js";
import { calculateTotalPrize } from "../domain/calculateTotalPrize.js";
import { calculateProfitRate } from "../utils/calculateProfitRate.js";
import getLottoRank from "../domain/getLottoRank.js";

const lottoController = {
  async lottoGamePlay() {
    while (true) {
      const money = await retryCallbackFunctionOnError(this.getMoney);
      const randomLottos = this.generateRandomLotto(money.getLottoCount());
      const { winningLotto, bonusLottoNumber } =
        await this.getWinningAndBonusLotto();
      const rank = this.calcRank({
        winningLotto,
        bonusLottoNumber,
        randomLottos,
      });

      this.printProfitRate(money.getLottoMoney(), rank);

      if (await retryCallbackFunctionOnError(this.isExitGame)) break;
    }
  },

  async getMoney() {
    const money = await InputView.readMoney();
    return new LottoMoney(money);
  },

  generateRandomLotto(money) {
    const randomLottos = lottoGenerator.generateRandomLotto(money);

    this.printRandomLottos(randomLottos);

    return randomLottos;
  },

  async getWinningAndBonusLotto() {
    const winningLotto = await retryCallbackFunctionOnError(this.getWinningLotto);
    const bonusLottoNumber = await retryCallbackFunctionOnError(() =>
      this.getBonusLottoNumber(winningLotto)
    );
    return { winningLotto, bonusLottoNumber };
  },

  printRandomLottos(randomLottos) {
    const randomLottosUnpack = randomLottos.map((lotto) => lotto.getLotto());
    OutputView.printLotto(randomLottos.length, randomLottosUnpack);
  },

  async getWinningLotto() {
    const winningLotto = await InputView.readWinningLottoNumbers();
    return new Lotto(winningLotto);
  },

  async getBonusLottoNumber(winningLotto) {
    const bonusLottoNumberInput = await InputView.readBonusLottoNumber();
    const bonusLottoNumber = new LottoNumber(bonusLottoNumberInput);

    winningLotto.checkHaveBonus(bonusLottoNumber.getLottoNumber());

    return bonusLottoNumber;
  },

  async isExitGame() {
    const commandInput = await InputView.readIsExitGame();
    return Command.isExit(commandInput);
  },

  printRanks({ winningLotto, bonusLottoNumber, randomLottos }) {
    const ranks = getLottoRank({
      winningLotto,
      bonusLottoNumber,
      randomLottos,
    });
    OutputView.printMatchCount(ranks);
  },

  printProfitRate(money, ranks) {
    const totalPrize = calculateTotalPrize(ranks);
    const profitRate = calculateProfitRate(totalPrize, money);

    OutputView.printProfitRate(profitRate);
  },

  calcRank({ winningLotto, bonusLottoNumber, randomLottos }) {
    const rank = getLottoRank({ winningLotto, bonusLottoNumber, randomLottos });

    this.printRanks({ winningLotto, bonusLottoNumber, randomLottos });

    return rank;
  },
};

export default lottoController;
