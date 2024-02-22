import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

import Lotto from "../domain/Lotto.js";
import LottoMoney from "../domain/LottoMoney.js";
import LottoNumber from "../domain/LottoNumber.js";
import lottoGenerator from "../domain/LottoGenerator.js";

import Command from "../utils/Command.js";

import catchReturn from "../utils/catchReturn.js";
import { calculateTotalPrize } from "../domain/calculateTotalPrize.js";
import { calculateProfitRate } from "../utils/calculateProfitRate.js";
import getLottoRank from "../domain/getLottoRank.js";

const lottoController = {
  async game() {
    while (true) {
      const money = await catchReturn(this.getMoney);
      const randomLottos = lottoGenerator.generateRandomLotto(
        money.getLottoCount()
      );
      this.printRandomLottos(randomLottos);
      const winningLotto = await catchReturn(this.getWinningLotto);
      const bonusLottoNumber = await catchReturn(() =>
        this.getBonusLottoNumber(winningLotto)
      );
      const ranks = getLottoRank({
        winningLotto,
        bonusLottoNumber,
        randomLottos,
      });
      this.printRanks({ winningLotto, bonusLottoNumber, randomLottos });
      this.printProfitRate(money.get(), ranks);

      if (!(await catchReturn(this.getRestartGame))) break;
    }
  },

  async getMoney() {
    const money = await InputView.readMoney();
    return new LottoMoney(money);
  },

  printRandomLottos(randomLottos) {
    randomLottos.forEach((lotto) => OutputView.printLotto(lotto.get()));
  },

  async getWinningLotto() {
    const winningLotto = await InputView.readWinningLottoNumbers();
    return new Lotto(winningLotto);
  },

  async getBonusLottoNumber(winningLotto) {
    const bonusLottoNumberInput = await InputView.readBonusLottoNumber();
    const bonusLottoNumber = new LottoNumber(bonusLottoNumberInput);

    winningLotto.checkHaveBonus(bonusLottoNumber);

    return bonusLottoNumber;
  },

  async getRestartGame() {
    const commandInput = await InputView.readRestartGame();
    return Command.isRestart(commandInput);
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
};

export default lottoController;
