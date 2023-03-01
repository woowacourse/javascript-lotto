const Benefit = require('../model/Benefit');
const Money = require('../model/Money');
const Winning = require('../model/Winning');
const inputHandler = require('../../view/inputView');
const outputView = require('../../view/outputView');
const Console = require('../../utils/Console');
const { MAGIC_LITERAL, ERROR_MESSAGE } = require('../../constant');
const LottoMachine = require('./LottoMachine');

const errorHandler = (error, afterError) => {
  console.log(error.message);
  afterError();
};

class ConsoleController {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  readMoney() {
    inputHandler('> 구입금액을 입력해 주세요.', this.#afterReadMoney);
  }

  readWinningNumbers() {
    inputHandler(
      '\n> 당첨 번호를 입력해 주세요.',
      this.#afterReadWinningNumbers
    );
  }

  readBonusNumber() {
    inputHandler(
      '\n> 보너스 번호를 입력해 주세요.',
      this.#afterReadBonusNumber
    );
  }

  readRetryOption() {
    inputHandler(
      `\n> 다시 시작하시겠습니까? (${MAGIC_LITERAL.retry}/${MAGIC_LITERAL.quit})`,
      this.#afterReadRetryOption
    );
  }

  #afterReadMoney = (input) => {
    try {
      this.#lottoMachine.setMoney(new Money(Number(input)));
      outputView.printLottoCount(this.#lottoMachine.getLottoCount());
      this.#lottoMachine.generateLottos();
      this.#showLottos();
      this.readWinningNumbers();
    } catch (error) {
      errorHandler(error, () => this.readMoney());
    }
  };

  #afterReadWinningNumbers = (input) => {
    try {
      const winningNumbers = input
        .split(MAGIC_LITERAL.comma)
        .map((winningNumber) => Number(winningNumber));
      this.#lottoMachine.setWinning(new Winning());
      this.#lottoMachine.getWinning().setWinningNumbers(winningNumbers);
      this.readBonusNumber();
    } catch (error) {
      errorHandler(error, this.readWinningNumbers);
    }
  };

  #afterReadBonusNumber = (input) => {
    try {
      this.#lottoMachine.getWinning().setBonusNumber(Number(input));
      const ranks = this.#lottoMachine.getCollectedRanks();
      const benefit = new Benefit();
      const money = this.#lottoMachine.getMoney();
      benefit.calculateRate(money.getAmount(), ranks);
      this.#showResult(benefit, ranks);
      this.readRetryOption();
    } catch (error) {
      errorHandler(error, this.readBonusNumber);
    }
  };

  #afterReadRetryOption = (input) => {
    try {
      this.#checkRetryOrQuit(input);
    } catch (error) {
      errorHandler(error, () => this.readRetryOption());
    }
  };

  #checkRetryOrQuit(input) {
    if (input === MAGIC_LITERAL.retry) return this.#retry();
    if (input === MAGIC_LITERAL.quit) return this.#quit();
    throw new Error(ERROR_MESSAGE.retryOption);
  }

  #showLottos() {
    this.#lottoMachine.getLottos().forEach((lotto) => {
      outputView.printLotto(lotto);
    });
  }

  #showResult(benefit, ranks) {
    outputView.printResultTitle();
    outputView.printResult(ranks);
    outputView.printBenefit(benefit.getRate());
  }

  #retry() {
    const consoleController = new ConsoleController();
    consoleController.readMoney();
  }

  #quit() {
    Console.quit();
  }
}
module.exports = ConsoleController;
