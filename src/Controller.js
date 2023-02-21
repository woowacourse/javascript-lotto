// const InputView = require("./view/InputView");
// const OutputView = require("./view/OutputView");

import LottoGame from "./domain/LottoGame.js";
import Validation from "./Validation.js";
import { COMMAND } from "./constants.js";

class Controller {
  lottoGame;

  constructor() {}

  inputPurchaseAmount(amount) {
    try {
      Validation.purchaseAmount(+amount);
      return this.makeLottoGame(+amount);
    } catch (error) {
      return error.message;
    }
  }

  makeLottoGame(amount) {
    this.lottoGame = new LottoGame(amount);
    return this.lottoGame.getLotteries();
  }

  inputLottoBonus(lotto, bonus) {
    try {
      Validation.lottoNumbers(lotto);
      Validation.bonusNumber(lotto, bonus);
      return this.generateLottoGameResult(lotto, bonus);
    } catch (error) {
      return error.message;
    }
  }

  //lottoResult = [0,0,0,0,0,0] = 5등~1등, 수익률
  generateLottoGameResult(lotto, bonus) {
    return this.lottoGame.getRankResult(lotto, bonus);
  }

  // async inputLottoNumbers() {
  //   const lottoNumbers = await InputView.readLottoNumbers();
  //   try {
  //     this.convertLotto(lottoNumbers);
  //     Validation.lottoNumbers(this.#lottoNumbers);
  //     this.inputBonusNumber();
  //   } catch (error) {
  //     OutputView.printError(error);
  //     this.inputLottoNumbers();
  //   }
  // }

  // async inputBonusNumber() {
  //   const bonusNumber = await InputView.readBonusNumber();
  //   try {
  //     Validation.bonusNumber(this.#lottoNumbers, +bonusNumber);
  //     this.#bonusNumber = +bonusNumber;
  //     this.generateLottoGameResult();
  //   } catch (error) {
  //     OutputView.printError(error);
  //     this.inputBonusNumber();
  //   }
  // }

  // async inputRestartCommand() {
  //   const command = await InputView.readRestartCommand();
  //   try {
  //     Validation.restartCommand(command);
  //     this.checkRestartCommand(command);
  //   } catch (error) {
  //     OutputView.printError(error);
  //     this.inputRestartCommand();
  //   }
  // }

  checkRestartCommand(command) {
    if (command === COMMAND.RESTART) {
      OutputView.printRestart();
      this.inputPurchaseAmount();
    }
    if (command === COMMAND.QUIT) OutputView.printQuit();
  }
}

export default Controller;
