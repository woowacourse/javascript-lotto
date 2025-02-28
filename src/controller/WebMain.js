import LottoMachine from "../domain/LottoMachine.js";
import Output from "../view/Output.js";
import Winnings from "../domain/Winnings.js";
import Input from "../view/Input.js";
import Lotto from "../domain/Lotto.js";
import WebOutput from "../view/WebOutput.js";
import { inputFormHandler } from "../util/inputFormHandler.js";
import Parser from "../util/Parser.js";
import Validator from "../domain/Validator.js";
import ERROR from "../constant/Error.js";

const WebMain = {
  lottoMachine: null,
  async play() {
    const lottoMachine = new LottoMachine(Lotto);
    const purchasePrice = await Input.purchasePrice();
    const publishedLottos = lottoMachine.publishLottos(purchasePrice);
    Output.printLottos(publishedLottos);
    this.defineWinningRules(lottoMachine);
    await this.printLottoResult(lottoMachine, purchasePrice);
    const isRestart = await Input.restartLotto();
    if (isRestart) await this.play();
  },

  purchaseLotto(purchasePrice) {
    this.lottoMachine = new LottoMachine(Lotto);
    const publishedLottos = this.lottoMachine.publishLottos(purchasePrice);
    WebOutput.printLottos(publishedLottos);
  },

  defineWinningRules(winningData) {
    const winningNumbers = [...winningData.getAll("winning")];

    const parsedWinningNumbers = inputFormHandler({
      inputValue: winningNumbers,
      parser: Parser.toNumberArray,
      validatorMethod: Validator.webWinningNumbers,
      errorName: ERROR.WEB_WINNING_NUMBERS,
    });
    const bonusNumber = winningData.get("bonus");
    const parsedBonusNumber = inputFormHandler({
      inputValue: bonusNumber,
      parser: Parser.toNumber,
      validatorMethod: Validator.bonusNumber,
      errorName: ERROR.BONUS_NUMBER,
    });

    const winnings = new Winnings(parsedWinningNumbers, parsedBonusNumber);
    this.lottoMachine.defineRule(winnings);
  },

  printLottoResult(purchasePrice) {
    const { countStatistics, winningRate } =
      this.lottoMachine.drawWinning(purchasePrice);

    Object.entries(countStatistics).forEach(([rank, amount]) =>
      WebOutput.matchResult(rank, amount),
    );
    WebOutput.winningRate(winningRate);
  },
};

export default WebMain;
