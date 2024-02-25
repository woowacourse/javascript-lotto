import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

import LottoMoney from "../domain/LottoMoney.js";
import LottoNumber from "../domain/LottoNumber.js";

import Command from "../utils/Command.js";

import catchReturn from "../utils/catchReturn.js";
import { calculateTotalPrize } from "../domain/calculateTotalPrize.js";
import { calculateProfitRate } from "../utils/calculateProfitRate.js";
import getLottoRank from "../domain/getLottoRank.js";
import { generateRandomLottos, generateWinningLotto } from "../domain/lottoGenerator.js";

const lottoController = {
  async game() {
    while (true) {
      const money = await catchReturn(this.getMoney);
      const randomLottos = this.generateRandomLottos(money.getLottoCount());
      const winningLotto = await this.initWinningLotto();
      const rank = this.calcRank({
        winningLotto: winningLotto.get(),
        bonusNumber: winningLotto.getBonusNumber(),
        randomLottos,
      });

      this.printProfitRate(money.get(), rank);

      if (await catchReturn(this.isExitGame)) break;
    }
  },

  async getMoney() {
    const money = await InputView.readMoney();
    return new LottoMoney(money);
  },

  generateRandomLottos(money) {
    const randomLottos = generateRandomLottos(money);

    this.printRandomLottos(randomLottos);

    return randomLottos;
  },

  async initWinningLotto() {
    const winningLotto = await catchReturn(this.getWinningLotto);
    await catchReturn(() => this.setBonusNumber(winningLotto));

    return winningLotto;
  },

  printRandomLottos(randomLottos) {
    const randomLottosUnpack = randomLottos.map((lotto) => lotto.get());
    OutputView.printLotto(randomLottos.length, randomLottosUnpack);
  },

  async getWinningLotto() {
    const winningLotto = await InputView.readWinningLottoNumbers();

    return generateWinningLotto(winningLotto);
  },

  async setBonusNumber(winningLotto) {
    const bonusNumberInput = await InputView.readBonusNumber();
    const bonusNumber = new LottoNumber(bonusNumberInput);

    winningLotto.setBonusNumber(bonusNumber);
  },

  async isExitGame() {
    const commandInput = await InputView.readIsExitGame();
    return Command.isExit(commandInput);
  },

  printProfitRate(money, ranks) {
    const totalPrize = calculateTotalPrize(ranks);
    const profitRate = calculateProfitRate(totalPrize, money);

    OutputView.printProfitRate(profitRate);
  },

  calcRank({ winningLotto, bonusLottoNumber, randomLottos }) {
    const rank = getLottoRank({ winningLotto, bonusLottoNumber, randomLottos });

    OutputView.printRanks(rank);

    return rank;
  },
};

export default lottoController;
